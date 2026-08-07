"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, X, Trash2, Box, Package, Upload, Image as ImageIcon, Layers, GripVertical } from "lucide-react";

// --- CONSTANTS ---
const CATEGORIES = ["Cuidado y salud", "Juguetes", "Ropa y accesorios", "Tecnología"] as const;
const BRANDS = ["One is all", "Cheeky", "Milk & Pepper", "Brottdog", "Paikka", "Dukier", "Enabot"] as const;
const SIZES = ["S", "M", "L"] as const;

// --- UI Components (Simulated) ---
const Input = React.forwardRef<HTMLInputElement, any>(({ className, ...props }, ref) => (
    <input className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:opacity-50 ${className}`} ref={ref} {...props} />
));
Input.displayName = "Input";

const Select = React.forwardRef<HTMLSelectElement, any>(({ className, children, ...props }, ref) => (
    <div className="relative">
        <select className={`flex h-10 w-full appearance-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent ${className}`} ref={ref} {...props}>
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
    </div>
));
Select.displayName = "Select";

const Textarea = React.forwardRef<HTMLTextAreaElement, any>(({ className, ...props }, ref) => (
    <textarea className={`flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent ${className}`} ref={ref} {...props} />
));
Textarea.displayName = "Textarea";

const Label = ({ className, children, ...props }: any) => (
    <label className={`text-sm font-medium leading-none text-slate-700 ${className}`} {...props}>{children}</label>
);

const Button = React.forwardRef<HTMLButtonElement, any>(({ className, variant = "default", ...props }, ref) => {
    const variants = {
        default: "bg-slate-900 text-white hover:bg-wiggle-brand shadow-sm",
        outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 shadow-sm",
        destructive: "bg-white border border-red-200 text-red-500 hover:bg-red-50",
        ghost: "hover:bg-slate-100 text-slate-700",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200"
    };
    return <button ref={ref} className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 ${variants[variant as keyof typeof variants]} ${className}`} {...props} />
});
Button.displayName = "Button";

const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
    <button type="button" role="switch" onClick={() => onCheckedChange(!checked)} className={`peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${checked ? 'bg-slate-900' : 'bg-slate-200'}`}>
        <span className={`pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);

// --- MODAL COMPONENT ---
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                    <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

// --- ZOD SCHEMA ---
const productSchema = z.object({
    name: z.string().min(1, "Nombre obligatorio"),
    brand: z.string().min(1, "Marca obligatoria"),
    category: z.string().min(1, "Categoría obligatoria"),
    description: z.string().optional(),
    has_physical_sample: z.boolean(),

    // Parent Images
    main_image_url: z.string().min(1, "Foto principal requerida"),
    gallery_urls: z.array(z.string()),

    variants: z.array(z.object({
        color: z.string().min(1, "Color requerido"),
        size: z.enum(SIZES),
        price: z.coerce.number().min(0.01, "Precio requerido"),
        sku: z.string().optional(),
        stock_quantity: z.coerce.number().min(0),

        // Variant Images
        variant_main_image_url: z.string().optional(),
        variant_gallery_urls: z.array(z.string())
    })).min(1, "Al menos una variante requerida"),

    // Storytelling & Extras
    story_1_title: z.string().optional(),
    story_1_description: z.string().optional(),
    story_1_image_url: z.string().optional(),
    story_2_title: z.string().optional(),
    story_2_description: z.string().optional(),
    story_2_image_url: z.string().optional(),
    shipping_info: z.string().optional(),
    size_guide_url: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function NewProductPage() {
    // Modal State
    const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
    const [activeVariantIndex, setActiveVariantIndex] = useState<number | null>(null);

    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "", brand: "", category: "", description: "", has_physical_sample: false,
            main_image_url: "", gallery_urls: [],
            variants: [{ color: "", size: "S" as any, price: 0, stock_quantity: 0, sku: "", variant_main_image_url: "", variant_gallery_urls: [] }],
            story_1_title: "", story_1_description: "", story_1_image_url: "",
            story_2_title: "", story_2_description: "", story_2_image_url: "",
            shipping_info: "", size_guide_url: ""
        }
    });

    const { fields, append, remove, update } = useFieldArray({
        control: form.control,
        name: "variants"
    });

    // --- Image Handling Helpers (Simulated) ---
    const handleMainImageUpload = () => {
        const url = prompt("Simulación: Ingresa URL de la imagen principal", "https://via.placeholder.com/600");
        if (url) form.setValue("main_image_url", url, { shouldValidate: true });
    };

    const handleGalleryUpload = () => {
        const url = prompt("Simulación: Ingresa URL para galería", "https://via.placeholder.com/600");
        if (url) {
            const current = form.getValues("gallery_urls") || [];
            form.setValue("gallery_urls", [...current, url]);
        }
    };

    // Generic Image Handler for Stories
    const handleStoryImageUpload = (field: "story_1_image_url" | "story_2_image_url") => {
        const url = prompt("Simulación: URL de imagen para historia", "https://via.placeholder.com/600");
        if (url) form.setValue(field, url);
    };

    // Variant Modal Handlers
    const openVariantManager = (index: number) => {
        setActiveVariantIndex(index);
        setIsVariantModalOpen(true);
    };

    const handleVariantMainImage = () => {
        if (activeVariantIndex === null) return;
        const url = prompt("Simulación: URL Principal de Variante", "https://via.placeholder.com/400");
        if (url) {
            const currentVariant = form.getValues(`variants.${activeVariantIndex}`);
            update(activeVariantIndex, { ...currentVariant, variant_main_image_url: url });
        }
    };

    const handleVariantGallery = () => {
        if (activeVariantIndex === null) return;
        const url = prompt("Simulación: URL para Galería de Variante", "https://via.placeholder.com/400");
        if (url) {
            const currentVariant = form.getValues(`variants.${activeVariantIndex}`);
            const currentGallery = currentVariant.variant_gallery_urls || [];
            update(activeVariantIndex, { ...currentVariant, variant_gallery_urls: [...currentGallery, url] });
        }
    };

    const onSubmit = (data: ProductFormValues) => {
        console.log("FINAL SUBMISSION:", data);
        alert(`Producto creado con éxito\nVariantes: ${data.variants.length}\nImágenes Padre: ${1 + data.gallery_urls.length}`);
    };

    return (
        <div className="max-w-5xl mx-auto pb-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nuevo Producto</h1>
                    <p className="text-slate-500">Gestión avanzada de inventario e imágenes.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancelar</Button>
                    <Button onClick={form.handleSubmit(onSubmit)}>Publicar Producto</Button>
                </div>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* 1. INFO GENERAL */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-slate-800">
                        <div className="p-2 bg-wiggle-brand/10 rounded-md"><Package className="w-5 h-5 text-wiggle-brand" /></div>
                        Datos Principales
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Nombre <span className="text-red-500">*</span></Label>
                            <Input {...form.register("name")} placeholder="Nombre del producto" />
                            {form.formState.errors.name && <p className="text-red-500 text-xs">{form.formState.errors.name?.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Marca <span className="text-red-500">*</span></Label>
                            <Select {...form.register("brand")}>
                                <option value="">Seleccionar...</option>
                                {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Categoría <span className="text-red-500">*</span></Label>
                            <Select {...form.register("category")}>
                                <option value="">Seleccionar...</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </Select>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div><Label>Muestra Física</Label><div className="text-xs text-slate-500">Disponible en showroom</div></div>
                            <Controller control={form.control} name="has_physical_sample" render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
                        </div>
                    </div>
                    <div className="mt-6"><Label>Descripción</Label><Textarea {...form.register("description")} className="mt-2" /></div>
                </div>

                {/* 2. MULTIMEDIA PADRE (Nueva Sección) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-slate-800">
                        <div className="p-2 bg-wiggle-brand/10 rounded-md"><ImageIcon className="w-5 h-5 text-wiggle-brand" /></div>
                        Multimedia del Producto (Global)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Main Image */}
                        <div className="col-span-1 space-y-3">
                            <Label>Foto Principal (Cover)</Label>
                            <div
                                onClick={handleMainImageUpload}
                                className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all ${form.watch("main_image_url") ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300'}`}
                            >
                                {form.watch("main_image_url") ? (
                                    <div className="relative w-full h-full p-2"><img src={form.watch("main_image_url")} alt="Cover" className="w-full h-full object-cover rounded-md" /></div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                        <span className="text-xs text-slate-500 font-medium">Subir Cover</span>
                                    </>
                                )}
                            </div>
                            {form.formState.errors.main_image_url && <p className="text-red-500 text-xs">Requerida</p>}
                        </div>

                        {/* General Gallery */}
                        <div className="col-span-2 space-y-3">
                            <div className="flex justify-between items-center"><Label>Galería General</Label><Button type="button" variant="ghost" size="sm" onClick={handleGalleryUpload} className="h-6 text-xs text-indigo-600"><Plus className="w-3 h-3 mr-1" /> Agregar Foto</Button></div>
                            <div className="min-h-[200px] p-4 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-4 gap-4">
                                {form.watch("gallery_urls")?.map((url, idx) => (
                                    <div key={idx} className="relative aspect-square bg-white rounded-md shadow-sm border border-slate-200 group">
                                        <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover rounded-md" />
                                        <button type="button" onClick={() => {
                                            const newGallery = form.getValues("gallery_urls").filter((_, i) => i !== idx);
                                            form.setValue("gallery_urls", newGallery);
                                        }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                                    </div>
                                ))}
                                <button type="button" onClick={handleGalleryUpload} className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-md aspect-square text-slate-400 hover:border-indigo-400 hover:text-indigo-500 bg-white transition-all">
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. MARKETING & HISTORIA (Nueva Sección) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-slate-800">
                        <div className="p-2 bg-pink-100 rounded-md"><GripVertical className="w-5 h-5 text-pink-600" /></div>
                        Marketing & Historia
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Historia 1 */}
                        <div className="space-y-4 p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">HISTORIA 1</span>
                                <span className="text-xs text-slate-400">Texto a la Izquierda</span>
                            </div>
                            <div>
                                <Label>Título</Label>
                                <Input {...form.register("story_1_title")} placeholder="Ej: Hecho a Mano en Ecuador" className="mt-1" />
                            </div>
                            <div>
                                <Label>Descripción</Label>
                                <Textarea {...form.register("story_1_description")} placeholder="Descripción detallada de la artesanía..." className="mt-1" />
                            </div>
                            <div>
                                <Label>Imagen</Label>
                                <div onClick={() => handleStoryImageUpload("story_1_image_url")} className="mt-1 border-dashed border-2 border-slate-300 rounded-md p-4 text-center cursor-pointer hover:bg-slate-100 transition-colors">
                                    {form.watch("story_1_image_url") ? (
                                        <img src={form.watch("story_1_image_url")} alt="Preview" className="h-32 w-full object-cover rounded" />
                                    ) : (
                                        <div className="text-xs text-slate-500 flex flex-col items-center">
                                            <Upload className="w-4 h-4 mb-1" /> Subir Imagen
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Historia 2 */}
                        <div className="space-y-4 p-4 border border-slate-100 rounded-lg bg-slate-50/50">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-xs bg-slate-200 px-2 py-1 rounded text-slate-600">HISTORIA 2</span>
                                <span className="text-xs text-slate-400">Imagen a la Izquierda</span>
                            </div>
                            <div>
                                <Label>Título</Label>
                                <Input {...form.register("story_2_title")} placeholder="Ej: Materiales Ecuatorianos" className="mt-1" />
                            </div>
                            <div>
                                <Label>Descripción</Label>
                                <Textarea {...form.register("story_2_description")} placeholder="Detalle sobre materiales sostenibles..." className="mt-1" />
                            </div>
                            <div>
                                <Label>Imagen</Label>
                                <div onClick={() => handleStoryImageUpload("story_2_image_url")} className="mt-1 border-dashed border-2 border-slate-300 rounded-md p-4 text-center cursor-pointer hover:bg-slate-100 transition-colors">
                                    {form.watch("story_2_image_url") ? (
                                        <img src={form.watch("story_2_image_url")} alt="Preview" className="h-32 w-full object-cover rounded" />
                                    ) : (
                                        <div className="text-xs text-slate-500 flex flex-col items-center">
                                            <Upload className="w-4 h-4 mb-1" /> Subir Imagen
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Info de Envío (Sobrescribir)</Label>
                            <Textarea {...form.register("shipping_info")} placeholder="Dejar vacío para usar el texto por defecto." className="mt-1" />
                        </div>
                        <div>
                            <Label>Link Guía de Tallas (URL)</Label>
                            <Input {...form.register("size_guide_url")} placeholder="https://..." className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* 3. VARIANTES (Rediseñada con Modal) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                            <div className="p-2 bg-wiggle-brand/10 rounded-md"><Layers className="w-5 h-5 text-wiggle-brand" /></div>
                            Matriz de Variaciones
                        </h2>
                        <Button type="button" variant="outline" onClick={() => append({ color: "", size: "S", price: 0, stock_quantity: 0, sku: "", variant_main_image_url: "", variant_gallery_urls: [] })}>
                            <Plus className="w-4 h-4 mr-2" /> Agregar Fila
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 items-start md:items-center group">
                                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 flex-1 w-full">
                                    <div className="col-span-2 md:col-span-2">
                                        <Label className="text-[10px] text-slate-500 uppercase tracking-wider">Color</Label>
                                        <Input {...form.register(`variants.${index}.color` as const)} placeholder="Ej: Rojo Fuego" className="h-9 mt-1" />
                                    </div>
                                    <div className="col-span-1 md:col-span-1">
                                        <Label className="text-[10px] text-slate-500 uppercase tracking-wider">Talla</Label>
                                        <Select {...form.register(`variants.${index}.size` as const)} className="h-9 mt-1">
                                            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                        </Select>
                                    </div>
                                    <div className="col-span-1 md:col-span-1">
                                        <Label className="text-[10px] text-slate-500 uppercase tracking-wider">SKU</Label>
                                        <Input {...form.register(`variants.${index}.sku` as const)} placeholder="Opcional" className="h-9 mt-1" />
                                    </div>
                                    <div className="col-span-1 md:col-span-1">
                                        <Label className="text-[10px] text-slate-500 uppercase tracking-wider">Precio</Label>
                                        <Input type="number" {...form.register(`variants.${index}.price` as const)} className="h-9 mt-1" />
                                    </div>
                                    <div className="col-span-1 md:col-span-1">
                                        <Label className="text-[10px] text-slate-500 uppercase tracking-wider">Stock</Label>
                                        <Input type="number" {...form.register(`variants.${index}.stock_quantity` as const)} className="h-9 mt-1" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-2 md:mt-0 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                                    {/* IMAGE MANAGER BUTTON */}
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="flex-1 md:flex-none border border-slate-200 text-slate-600 bg-white shadow-sm"
                                        onClick={() => openVariantManager(index)}
                                    >
                                        <ImageIcon className="w-4 h-4 mr-2 text-indigo-500" />
                                        {form.watch(`variants.${index}.variant_main_image_url`) ? "Editar Fotos" : "Subir Fotos"}
                                    </Button>
                                    <Button type="button" variant="destructive" className="w-9 px-0" onClick={() => remove(index)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- VARIANT IMAGE MODAL --- */}
                <Modal
                    isOpen={isVariantModalOpen}
                    onClose={() => setIsVariantModalOpen(false)}
                    title={activeVariantIndex !== null ? `Imágenes para: ${form.watch(`variants.${activeVariantIndex}.color`)} - ${form.watch(`variants.${activeVariantIndex}.size`)}` : "Gestión de Imágenes"}
                >
                    {activeVariantIndex !== null && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Variant Main Image */}
                                <div className="col-span-1 space-y-3">
                                    <Label>Foto Principal de Variante</Label>
                                    <div
                                        onClick={handleVariantMainImage}
                                        className={`aspect-[3/4] rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all ${form.watch(`variants.${activeVariantIndex}.variant_main_image_url`) ? 'border-solid border-indigo-200' : 'border-slate-300'}`}
                                    >
                                        {form.watch(`variants.${activeVariantIndex}.variant_main_image_url`) ? (
                                            <img src={form.watch(`variants.${activeVariantIndex}.variant_main_image_url`)} className="w-full h-full object-cover rounded-md" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                                <p className="text-xs text-slate-500">Click para subir foto principal</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Variant Gallery */}
                                <div className="col-span-2 space-y-3">
                                    <div className="flex justify-between"><Label>Galería Específica</Label><Button type="button" size="sm" variant="outline" onClick={handleVariantGallery} className="h-6 text-xs">Agregar</Button></div>
                                    <div className="min-h-[200px] bg-slate-50 border border-slate-200 rounded-lg p-4 grid grid-cols-3 gap-3">
                                        {form.watch(`variants.${activeVariantIndex}.variant_gallery_urls`)?.map((url, idx) => (
                                            <div key={idx} className="relative aspect-square">
                                                <img src={url} className="w-full h-full object-cover rounded-md border border-slate-200" />
                                                <button type="button" onClick={() => {
                                                    const current = form.getValues(`variants.${activeVariantIndex}.variant_gallery_urls`);
                                                    const updated = current.filter((_, i) => i !== idx);
                                                    update(activeVariantIndex, { ...form.getValues(`variants.${activeVariantIndex}`), variant_gallery_urls: updated });
                                                }} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-50 text-red-500"><X className="w-3 h-3" /></button>
                                            </div>
                                        ))}
                                        {(!form.watch(`variants.${activeVariantIndex}.variant_gallery_urls`)?.length) && (
                                            <div className="col-span-3 text-center py-8 text-slate-400 text-sm italic">Sin imágenes extra</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-slate-100">
                                <Button type="button" onClick={() => setIsVariantModalOpen(false)}>Guardar y Cerrar</Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </form>
        </div>
    );
}

"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Sparkles, Tag, SlidersHorizontal } from "lucide-react";
import ProductFilters from "@/components/ProductFilters";
import { motion, AnimatePresence } from "framer-motion";

interface OfferProduct {
    id: string;
    name: string;
    brand: string;
    category: string;
    petType: "Perro" | "Gato";
    regularPrice: number;
    salePrice: number;
    discountPercentage: number;
    image: string;
    rating: number;
    slug: string;
}

const OFFER_PRODUCTS: OfferProduct[] = [
    {
        id: "ownat-duck-4kg",
        name: "OWNAT CLASSIC DUCK PERRO 4 KG",
        brand: "OWNAT",
        category: "Alimento",
        petType: "Perro",
        regularPrice: 29.22,
        salePrice: 20.45,
        discountPercentage: 30,
        image: "/ownat-duck-4kg.png",
        rating: 5,
        slug: "ownat-classic-duck-perro-4-kg",
    },
    {
        id: "ownat-duck-12kg",
        name: "OWNAT CLASSIC DUCK PERRO 12 KG",
        brand: "OWNAT",
        category: "Alimento",
        petType: "Perro",
        regularPrice: 82.29,
        salePrice: 57.60,
        discountPercentage: 30,
        image: "/ownat-duck-12kg.png",
        rating: 5,
        slug: "ownat-classic-duck-perro-12-kg",
    },
    {
        id: "ownat-complet-12kg",
        name: "OWNAT CLASSIC COMPLET PERRO 12 KG",
        brand: "OWNAT",
        category: "Alimento",
        petType: "Perro",
        regularPrice: 66.51,
        salePrice: 46.56,
        discountPercentage: 30,
        image: "/ownat-complet-12kg.png",
        rating: 5,
        slug: "ownat-classic-complet-perro-12-kg",
    }
];

const CATEGORIES = ["Alimento", "Accesorios", "Ropa", "Juguetes"];
const BRANDS = ["OWNAT", "WIGGLE", "PAIKKA", "CHURU"];
const TAGS = ["30% OFF", "Oferta Especial"];

export default function OffersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPetType, setSelectedPetType] = useState<string | null>(null);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 150 });
    const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleTagChange = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const handleClearAll = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setSelectedPetType(null);
        setSelectedBrands([]);
        setSelectedTags([]);
        setPriceRange({ min: 0, max: 150 });
    };

    // Robust Filter & Sort Logic
    const filteredProducts = useMemo(() => {
        const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

        return OFFER_PRODUCTS.filter((product) => {
            // Search
            if (searchTerm) {
                const term = normalize(searchTerm);
                const name = normalize(product.name);
                const brand = normalize(product.brand);
                if (!name.includes(term) && !brand.includes(term)) return false;
            }

            // Category matching (handles singular/plural and case-insensitivity)
            if (selectedCategory && selectedCategory !== "Todas") {
                const target = normalize(selectedCategory);
                const targetStem = target.endsWith('s') ? target.slice(0, -1) : target;
                
                const cat = normalize(product.category);
                const catStem = cat.endsWith('s') ? cat.slice(0, -1) : cat;
                const name = normalize(product.name);

                const matchesCat = catStem === targetStem || cat.includes(targetStem) || name.includes(targetStem);
                if (!matchesCat) return false;
            }

            // Pet Type matching
            if (selectedPetType) {
                const targetPet = normalize(selectedPetType);
                const prodPet = normalize(product.petType);
                if (targetPet !== prodPet) return false;
            }

            // Brand
            if (selectedBrands.length > 0) {
                const normBrands = selectedBrands.map(normalize);
                if (!normBrands.includes(normalize(product.brand))) return false;
            }

            // Price Range
            if (product.salePrice < priceRange.min || product.salePrice > priceRange.max) {
                return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.salePrice - b.salePrice;
            if (sortBy === "price-high") return b.salePrice - a.salePrice;
            return 0;
        });
    }, [searchTerm, selectedCategory, selectedPetType, selectedBrands, priceRange, sortBy]);

    return (
        <div className="bg-white min-h-screen text-slate-800 font-sans pb-24">
            
            {/* HERO BANNER - LUXURY EDITORIAL */}
            <section className="relative w-full py-16 md:py-24 bg-[#FAF8F5] border-b border-gray-100 overflow-hidden select-none">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url('/about-main.jpg')` }}
                />
                <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#3D6A66] mb-3 bg-[#3D6A66]/10 px-4 py-1.5 rounded-full border border-[#3D6A66]/20">
                        <Sparkles className="w-3.5 h-3.5" />
                        SELECCIÓN EXCLUSIVA DE TEMPORADA
                    </span>
                    <h1
                        className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight"
                        style={{ fontFamily: 'var(--font-domine)' }}
                    >
                        Ofertas Especiales Wiggle
                    </h1>
                    <div className="w-20 h-[3px] bg-salmon mx-auto rounded-full mb-4"></div>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Nutrición y accesorios de alta gama con un <span className="font-bold text-salmon">30% OFF</span> por tiempo limitado.
                    </p>
                </div>
            </section>

            {/* CONTENEDOR TIENDA - 2 COLUMNAS (FILTROS IZQUIERDA + PRODUCTOS DERECHA) */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12">
                
                {/* Mobile Filter Toggle Button */}
                <div className="lg:hidden flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span>Filtros</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase text-slate-400">Ordenar:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold uppercase text-slate-700"
                        >
                            <option value="featured">Destacados</option>
                            <option value="price-low">Menor precio</option>
                            <option value="price-high">Mayor precio</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    
                    {/* LEFT SIDEBAR FILTERS - CLEAN WHITE BACKGROUND */}
                    <div className="hidden lg:block w-full lg:w-1/4 shrink-0 sticky top-28">
                        <ProductFilters
                            searchTerm={searchTerm}
                            onSearch={setSearchTerm}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            selectedPetType={selectedPetType}
                            onPetTypeChange={setSelectedPetType}
                            selectedBrands={selectedBrands}
                            onBrandChange={handleBrandChange}
                            selectedTags={selectedTags}
                            onTagChange={handleTagChange}
                            priceRange={priceRange}
                            onPriceChange={(min, max) => setPriceRange({ min, max })}
                            onClearAll={handleClearAll}
                            categories={CATEGORIES}
                            brands={BRANDS}
                            tags={TAGS}
                            maxPriceLimit={150}
                            totalResults={filteredProducts.length}
                        />
                    </div>

                    {/* RIGHT COLUMN: PRODUCT GRID */}
                    <div className="w-full lg:w-3/4">
                        
                        {/* Desktop Header Bar (Result Count & Sort) */}
                        <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Mostrando {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} en oferta
                            </span>

                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Ordenar por:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 focus:outline-none focus:border-salmon transition-colors shadow-sm cursor-pointer"
                                >
                                    <option value="featured">Destacados</option>
                                    <option value="price-low">Menor precio</option>
                                    <option value="price-high">Mayor precio</option>
                                </select>
                            </div>
                        </div>

                        {/* PRODUCT GRID */}
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-[#FAF8F5] rounded-[24px] border border-dashed border-gray-300">
                                <Tag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="font-serif text-xl font-bold text-slate-700 mb-2">No se encontraron productos</h3>
                                <p className="text-slate-500 text-sm font-light mb-6">Prueba ajustar los filtros de la izquierda.</p>
                                <button
                                    onClick={handleClearAll}
                                    className="px-6 py-2.5 bg-salmon text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md hover:bg-salmon-dark transition-all"
                                >
                                    Limpiar Filtros
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group block relative bg-white border border-gray-100 rounded-[24px] p-5 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                                    >
                                        {/* IMAGE CANVAS WITH TRANSPARENT PNG */}
                                        <div className="relative w-full aspect-[4/3] bg-[#F8FAFC] rounded-[20px] overflow-hidden mb-5 flex items-center justify-center">
                                            
                                            {/* Left Category Badge */}
                                            <div className="absolute top-3 left-0 z-20 bg-[#3D6A66] text-white text-[9px] font-extrabold tracking-[0.15em] px-3 py-1.5 uppercase rounded-r shadow-sm">
                                                {product.category}
                                            </div>

                                            {/* Right Discount Badge */}
                                            <div className="absolute top-3 right-0 z-20 bg-salmon text-white text-[9px] font-extrabold tracking-[0.15em] px-3 py-1.5 uppercase rounded-l shadow-sm">
                                                {product.discountPercentage}% OFF
                                            </div>

                                            {/* Floating Transparent Image */}
                                            <div className="relative w-full h-full p-4 transition-transform duration-700 ease-out group-hover:scale-105">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-contain p-2 filter drop-shadow-md"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        </div>

                                        {/* CONTENT INFO */}
                                        <div className="space-y-3 px-1">
                                            
                                            {/* Brand & Stars */}
                                            <div className="flex items-center justify-between">
                                                <span className="font-sans text-[10px] font-bold text-salmon uppercase tracking-widest">
                                                    {product.brand}
                                                </span>
                                                <div className="flex items-center gap-0.5 text-[#3D6A66]">
                                                    {[...Array(product.rating)].map((_, i) => (
                                                        <Star key={i} className="w-3.5 h-3.5 fill-[#3D6A66] stroke-none" />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <Link href={`/product/${product.slug}`}>
                                                <h3
                                                    className="font-serif text-base font-bold text-slate-900 leading-snug group-hover:text-salmon transition-colors line-clamp-2 min-h-[48px]"
                                                    style={{ fontFamily: 'var(--font-domine)' }}
                                                >
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            {/* Price Box & Full-Width Action Button Below */}
                                            <div className="pt-3 border-t border-gray-100 space-y-3">
                                                <div className="text-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <span className="text-slate-400 line-through text-sm font-medium">
                                                            ${product.regularPrice.toFixed(2).replace('.', ',')}
                                                        </span>
                                                        <span className="text-slate-900 text-xl font-extrabold">
                                                            ${product.salePrice.toFixed(2).replace('.', ',')}
                                                        </span>
                                                    </div>
                                                    <span className="text-[11px] text-slate-400 font-medium tracking-wide block mt-0.5">
                                                        (Incluye IVA)
                                                    </span>
                                                </div>

                                                {/* Full-Width Action CTA Button Below */}
                                                <Link
                                                    href={`/product/${product.slug}`}
                                                    className="block w-full py-3.5 bg-salmon hover:bg-[#e09788] text-white text-xs font-extrabold uppercase tracking-[0.2em] rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-98 text-center"
                                                >
                                                    VER PRODUCTO
                                                </Link>
                                            </div>

                                        </div>

                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            </div>

            {/* MOBILE FILTER MODAL */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFilterOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-xs bg-white z-[70] p-6 overflow-y-auto shadow-2xl lg:hidden"
                        >
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                <h3 className="font-serif text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-domine)' }}>
                                    Filtros de Ofertas
                                </h3>
                                <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-400 hover:text-black">
                                    ✕
                                </button>
                            </div>

                            <ProductFilters
                                searchTerm={searchTerm}
                                onSearch={setSearchTerm}
                                selectedCategory={selectedCategory}
                                onCategoryChange={(cat) => { setSelectedCategory(cat); setIsMobileFilterOpen(false); }}
                                selectedPetType={selectedPetType}
                                onPetTypeChange={(type) => { setSelectedPetType(type); setIsMobileFilterOpen(false); }}
                                selectedBrands={selectedBrands}
                                onBrandChange={handleBrandChange}
                                selectedTags={selectedTags}
                                onTagChange={handleTagChange}
                                priceRange={priceRange}
                                onPriceChange={(min, max) => setPriceRange({ min, max })}
                                onClearAll={handleClearAll}
                                categories={CATEGORIES}
                                brands={BRANDS}
                                tags={TAGS}
                                maxPriceLimit={150}
                                totalResults={filteredProducts.length}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}

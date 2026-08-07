"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Truck, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

// --- TYPES ---
interface Product {
    id: string;
    brand: string;
    category: string;
    sku: string;
    name: string;
    price: string;
    regularPrice?: number;
    salePrice?: number;
    discountPercentage?: number;
    isOffer?: boolean;
    description: string;
    stockStatus?: string;
    stockQuantity?: number;
    images: string[];
    variants: any[];
}

export default function ProductClient({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [selectedImage, setSelectedImage] = useState(0);

    // Extract all unique attributes from variants
    const allAttributes: Record<string, Set<string>> = {};
    product.variants.forEach(variant => {
        variant.attributes.forEach((attr: any) => {
            if (!allAttributes[attr.name]) allAttributes[attr.name] = new Set();
            allAttributes[attr.name].add(attr.value);
        });
    });

    const attributeNames = Object.keys(allAttributes);

    // Filter variants based on selected attributes
    const findMatchingVariant = () => {
        if (Object.keys(selectedAttributes).length === 0) return null;
        return product.variants.find(v =>
            v.attributes.every((attr: any) => selectedAttributes[attr.name] === attr.value)
        );
    };

    const matchedVariant = findMatchingVariant();
    const displayPrice = matchedVariant ? matchedVariant.price : product.price;
    const displayStockStatus = matchedVariant ? matchedVariant.stockStatus : product.stockStatus;
    const displayStockQuantity = matchedVariant ? matchedVariant.stockQuantity : product.stockQuantity;
    const displaySku = matchedVariant?.sku || product.sku;

    return (
        <div className="bg-[#FAFAFA] min-h-screen pb-20 font-sans">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-8">
                
                {/* --- BREADCRUMBS --- */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-8 font-sans">
                    <Link href="/" className="hover:text-salmon transition-colors">Inicio</Link>
                    <span>/</span>
                    <Link href="/shop" className="text-salmon font-medium hover:underline">{product.category}</Link>
                    <span>/</span>
                    <span className="text-slate-600 font-semibold line-clamp-1">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* --- LEFT COLUMN: PRODUCT GALLERY --- */}
                    <div className="col-span-1 lg:col-span-7 bg-white p-4 md:p-8 rounded-3xl border border-gray-100 shadow-sm relative">
                        
                        {/* Discount Badge if Product is in Offer */}
                        {product.isOffer && product.discountPercentage && (
                            <div className="absolute top-6 left-6 z-20 bg-salmon text-white text-xs font-extrabold tracking-widest px-4 py-2 uppercase rounded-full shadow-md animate-pulse">
                                {product.discountPercentage}% OFF EXCLUSIVO
                            </div>
                        )}

                        <div className="flex flex-col lg:flex-row-reverse gap-4 md:gap-6">
                            
                            {/* Main Image Viewer */}
                            <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden bg-[#FDFCF8] rounded-2xl group flex-grow">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={product.images[selectedImage]}
                                            alt={`${product.name} main view`}
                                            fill
                                            className="object-contain p-6 md:p-10 transition-transform duration-700 group-hover:scale-105 filter drop-shadow-md"
                                            priority
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Thumbnails Sidebar */}
                            {product.images.length > 1 && (
                                <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto scrollbar-hide lg:w-24 flex-shrink-0">
                                    {product.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(idx)}
                                            className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl flex-shrink-0 bg-[#FDFCF8] border-2 transition-all duration-300 overflow-hidden ${
                                                selectedImage === idx 
                                                    ? 'border-salmon ring-2 ring-salmon/30' 
                                                    : 'border-transparent hover:border-slate-200'
                                            }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${product.name} thumbnail ${idx + 1}`}
                                                fill
                                                className="object-contain p-2"
                                                sizes="80px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: DETAILS & BUYING CARDS --- */}
                    <div className="col-span-1 lg:col-span-5 space-y-6">
                        
                        {/* MAIN INFO HEADER */}
                        <div>
                            <span className="text-xs font-bold tracking-[0.2em] text-[#3D6A66] uppercase block mb-1">
                                {product.category}
                            </span>
                            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block mb-3">
                                SKU: {displaySku}
                            </span>
                            
                            <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold mb-3 leading-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                                {product.name}
                            </h1>
                            
                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-6 text-[#3D6A66]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current stroke-none" />
                                ))}
                            </div>

                            {/* Description HTML */}
                            <div 
                                className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-normal prose prose-slate"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        {/* VARIANT SELECTORS */}
                        {attributeNames.length > 0 && (
                            <div className="space-y-4 pt-2 pb-4 border-t border-gray-100">
                                {attributeNames.map(attrName => (
                                    <div key={attrName}>
                                        <label className="block text-xs font-bold tracking-widest text-slate-800 uppercase mb-2">
                                            {attrName}: <span className="text-salmon font-normal">{selectedAttributes[attrName] || "Seleccionar"}</span>
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {Array.from(allAttributes[attrName]).sort().map(val => (
                                                <button
                                                    key={val}
                                                    onClick={() => setSelectedAttributes(prev => ({ ...prev, [attrName]: val }))}
                                                    className={`px-4 py-2 border rounded-xl text-xs font-bold transition-all duration-200 
                                                        ${selectedAttributes[attrName] === val
                                                            ? 'bg-[#3D6A66] text-white border-[#3D6A66] shadow-sm'
                                                            : 'bg-white text-slate-700 border-slate-200 hover:border-[#3D6A66]'}`}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* --- BUYING ACTION CARD (CARD 1) --- */}
                        <div className="bg-white rounded-2xl border-2 border-[#EFA899]/40 p-6 shadow-sm transition-all hover:border-salmon/60">
                            <div className="flex items-baseline justify-between mb-2">
                                
                                {product.isOffer && product.regularPrice && product.salePrice ? (
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-slate-400 line-through text-base font-medium">
                                                ${product.regularPrice.toFixed(2).replace('.', ',')}
                                            </span>
                                            <span
                                                className="font-serif text-3xl md:text-4xl text-slate-900 font-extrabold tracking-tight"
                                                style={{ fontFamily: 'var(--font-domine)' }}
                                            >
                                                ${product.salePrice.toFixed(2).replace('.', ',')}
                                            </span>
                                            <span className="bg-salmon text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                                                {product.discountPercentage}% OFF
                                            </span>
                                        </div>
                                        <span className="font-sans text-xs text-slate-400 font-medium tracking-wide mt-1">
                                            (Incluye IVA - Precio especial de oferta)
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <div 
                                            className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight"
                                            style={{ fontFamily: 'var(--font-domine)' }}
                                            dangerouslySetInnerHTML={{ __html: displayPrice }} 
                                        />
                                        <span className="font-sans text-xs text-slate-400 font-medium tracking-wide">
                                            (Incluye IVA)
                                        </span>
                                    </div>
                                )}

                                <div className="text-right">
                                    <span className="text-xs font-bold text-salmon tracking-wider block">
                                        {displayStockQuantity && displayStockQuantity > 0 
                                            ? `${displayStockQuantity} disponibles` 
                                            : (displayStockStatus === 'IN_STOCK' ? 'Disponible' : 'Agotado')}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={addToCart}
                                className="w-full mt-6 bg-black text-white h-13 py-3.5 rounded-xl text-xs md:text-sm font-bold tracking-[0.15em] uppercase hover:bg-salmon transition-colors duration-300 shadow-md active:scale-[0.99]"
                            >
                                AÑADIR AL CARRITO
                            </button>
                        </div>

                        {/* --- SHIPPING & RETURNS CARD (CARD 2) --- */}
                        <div className="bg-white rounded-2xl border-2 border-[#EFA899]/40 p-5 shadow-sm flex items-center gap-4 transition-all hover:border-salmon/60">
                            <div className="p-3 bg-salmon/10 text-salmon rounded-2xl flex-shrink-0">
                                <Truck className="w-7 h-7 stroke-[1.8]" />
                            </div>
                            <div>
                                <h4 className="font-serif text-sm font-bold text-slate-900 tracking-wider uppercase" style={{ fontFamily: 'var(--font-domine)' }}>
                                    ENVÍO Y DEVOLUCIONES
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                                    Envío de pedidos con cobertura a nivel nacional
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

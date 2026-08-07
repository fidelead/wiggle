"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryItem {
    id: string;
    name: string;
    targetCategory: string;
    image: string;
}

const CATEGORIES_CONFIG: CategoryItem[] = [
    {
        id: "ropa",
        name: "ROPA",
        targetCategory: "Ropa",
        image: "https://wiggle.shop/wp-content/uploads/2026/06/perseo_279_img_4.png"
    },
    {
        id: "juguetes",
        name: "JUGUETES",
        targetCategory: "Juguetes",
        image: "https://wiggle.shop/wp-content/uploads/2026/05/perseo_487_img_1.png"
    },
    {
        id: "alimentos",
        name: "ALIMENTOS",
        targetCategory: "Alimentos",
        image: "https://wiggle.shop/wp-content/uploads/2026/05/perseo_137_img_1.png"
    },
    {
        id: "accesorios",
        name: "ACCESORIOS",
        targetCategory: "Accesorios",
        image: "https://wiggle.shop/wp-content/uploads/2026/06/perseo_42_img_2.png"
    },
    {
        id: "general",
        name: "GENERAL",
        targetCategory: "General",
        image: "/perseo_296_img_4.png"
    },
    {
        id: "snack",
        name: "SNACK",
        targetCategory: "Snack",
        image: "https://wiggle.shop/wp-content/uploads/2026/05/perseo_163_img_1.png"
    },
    {
        id: "farmacos",
        name: "FÁRMACOS",
        targetCategory: "Fármacos",
        image: "https://wiggle.shop/wp-content/uploads/2026/05/perseo_124_img_1.png"
    },
    {
        id: "suplementos",
        name: "SUPLEMENTOS",
        targetCategory: "Suplementos",
        image: "https://wiggle.shop/wp-content/uploads/2026/05/perseo_239_img_1.png"
    }
];

export default function CategorySection() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-white pt-20 pb-20 select-none overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D6A66] mb-3 block">
                        NUESTRAS CATEGORÍAS
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                        Compra online y descubre una Nueva forma de vivir el paseo
                    </h2>
                    <div className="w-16 h-[3px] bg-salmon rounded-full mx-auto"></div>
                </div>

                {/* Slider Container */}
                <div className="relative group/slider">
                    
                    {/* Left Scroll Arrow */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 p-3.5 bg-white border border-gray-100 rounded-full shadow-xl text-gray-700 hover:text-salmon hover:border-salmon hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 hidden sm:flex items-center justify-center"
                        aria-label="Desplazar a la izquierda"
                    >
                        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                    </button>

                    {/* Scrollable Track */}
                    <div
                        ref={sliderRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {CATEGORIES_CONFIG.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/shop?category=${encodeURIComponent(cat.targetCategory)}`}
                                className="group flex-shrink-0 w-[240px] sm:w-[280px] md:w-[310px] block cursor-pointer"
                            >
                                {/* Soft Light Canvas Container with Seamless Multiply Blend */}
                                <div className="relative aspect-[4/3] rounded-[24px] bg-[#F8FAFC] border border-slate-100 p-6 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:border-salmon/30 group-hover:-translate-y-1">
                                    <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-multiply">
                                        <Image
                                            src={cat.image}
                                            alt={cat.name}
                                            fill
                                            className="object-contain"
                                            sizes="310px"
                                        />
                                    </div>
                                </div>

                                {/* Title & Underline Below Card */}
                                <div className="mt-4 flex flex-col items-center">
                                    <h3 className="font-serif font-bold text-base md:text-lg tracking-widest text-slate-900 group-hover:text-salmon transition-colors uppercase text-center" style={{ fontFamily: 'var(--font-domine)' }}>
                                        {cat.name}
                                    </h3>
                                    <div className="w-8 group-hover:w-16 h-[2px] bg-salmon rounded-full transition-all duration-300 mt-1"></div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Right Scroll Arrow */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 p-3.5 bg-white border border-gray-100 rounded-full shadow-xl text-gray-700 hover:text-salmon hover:border-salmon hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 hidden sm:flex items-center justify-center"
                        aria-label="Desplazar a la derecha"
                    >
                        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                    </button>

                </div>

            </div>
        </section>
    );
}

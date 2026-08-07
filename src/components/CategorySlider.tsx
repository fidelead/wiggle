"use client";

import React from "react";

interface CategorySliderProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const CATEGORY_ITEMS = [
    {
        name: "Accesorios",
        value: "Accesorios",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-20 md:h-20">
                <path d="M12 28 C12 16, 52 16, 52 28 C52 38, 44 42, 32 42 C20 42, 12 38, 12 28 Z" />
                <circle cx="32" cy="46" r="3" />
                <path d="M28 54 C26 52, 26 48, 29 48 C30 48, 31 49, 32 50 C33 49, 34 48, 35 48 C38 48, 38 60, 35 60 C34 60, 33 59, 32 58 C31 59, 30 60, 29 60 C26 60, 26 56, 28 54 Z" fill="currentColor" />
            </svg>
        )
    },
    {
        name: "Alimentos",
        value: "Alimentos",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-20 md:h-20">
                <path d="M10 46 L54 46 C50 32, 14 32, 10 46 Z" />
                <path d="M22 20 C20 18, 20 14, 23 14 C25 14, 26 15, 27 16 C28 15, 29 14, 31 14 C34 14, 34 18, 32 20 L32 20 C34 22, 34 26, 31 26 C30 26, 29 25, 28 24 C27 25, 26 26, 23 26 C20 26, 20 22, 22 20 Z" fill="currentColor" />
            </svg>
        )
    },
    {
        name: "Fármacos",
        value: "Fármacos",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-20 md:h-20">
                <rect x="14" y="24" width="16" height="24" rx="2" />
                <rect x="17" y="18" width="10" height="6" rx="1" />
                <rect x="36" y="16" width="18" height="32" rx="2" />
                <circle cx="41" cy="22" r="1.5" fill="currentColor" />
                <circle cx="49" cy="22" r="1.5" fill="currentColor" />
                <circle cx="41" cy="32" r="1.5" fill="currentColor" />
                <circle cx="49" cy="32" r="1.5" fill="currentColor" />
                <circle cx="41" cy="42" r="1.5" fill="currentColor" />
                <circle cx="49" cy="42" r="1.5" fill="currentColor" />
            </svg>
        )
    },
    {
        name: "General",
        value: "General",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-20 md:h-20">
                <path d="M12 44 C20 44, 18 20, 32 20 C42 20, 48 28, 42 38 C38 44, 28 44, 24 38" />
                <rect x="10" y="42" width="6" height="8" rx="1" />
            </svg>
        )
    },
    {
        name: "Ropa",
        value: "Ropa",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-20 md:h-20">
                <path d="M20 14 L44 14 L50 24 L42 28 L42 50 L22 50 L22 28 L14 24 Z" />
                <path d="M27 32 C26 31, 26 29, 28 29 C29 29, 30 30, 32 31 C34 30, 35 29, 36 29 C38 29, 38 31, 37 32 L37 32 C38 33, 38 35, 36 35 C35 35, 34 34, 32 33 C30 34, 29 35, 28 35 C26 35, 26 33, 27 32 Z" fill="currentColor" />
            </svg>
        )
    },
    {
        name: "Snack",
        value: "Snack",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-20 md:h-20">
                <path d="M18 14 L46 14 L42 50 L22 50 Z" />
                <circle cx="32" cy="34" r="4" fill="currentColor" />
                <circle cx="26" cy="27" r="2" fill="currentColor" />
                <circle cx="32" cy="24" r="2" fill="currentColor" />
                <circle cx="38" cy="27" r="2" fill="currentColor" />
            </svg>
        )
    },
    {
        name: "Suplementos",
        value: "Suplementos",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-20 md:h-20">
                <rect x="20" y="20" width="24" height="30" rx="3" />
                <rect x="25" y="14" width="14" height="6" rx="1" fill="currentColor" />
                <rect x="28" y="30" width="8" height="10" rx="4" />
            </svg>
        )
    },
    {
        name: "Juguetes",
        value: "Juguetes",
        icon: (
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 md:w-20 md:h-20">
                <path d="M22 26 C18 22, 12 28, 16 32 C12 36, 18 42, 22 38 L42 38 C46 42, 52 36, 48 32 C52 28, 46 22, 42 26 Z" />
            </svg>
        )
    }
];

function isSameCategory(cat1: string, cat2: string) {
    if (!cat1 || !cat2) return false;
    const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const c1 = norm(cat1);
    const c2 = norm(cat2);
    if (c1 === c2) return true;
    const s1 = c1.endsWith('s') ? c1.slice(0, -1) : c1;
    const s2 = c2.endsWith('s') ? c2.slice(0, -1) : c2;
    return s1 === s2;
}

function CategoryCard({ 
    item, 
    isActive, 
    onClick 
}: { 
    item: typeof CATEGORY_ITEMS[0]; 
    isActive: boolean; 
    onClick: () => void; 
}) {
    const [imgError, setImgError] = React.useState(false);
    const normalized = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

    return (
        <div
            onClick={onClick}
            className={`group w-full aspect-square rounded-xl sm:rounded-[20px] cursor-pointer flex flex-col items-center justify-center p-1.5 sm:p-2.5 md:p-3 transition-all duration-300 ${
                isActive
                    ? "bg-[#3D6A66] text-white shadow-lg shadow-[#3D6A66]/30 scale-105 border-2 sm:border-[3px] border-white ring-2 ring-[#3D6A66]/40"
                    : "bg-[#EFA899]/85 text-white/90 hover:bg-[#3D6A66] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#3D6A66]/30"
            }`}
        >
            <div className="mb-1 sm:mb-2 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16">
                {!imgError ? (
                    <img 
                        src={`/icon/${normalized}.svg`} 
                        className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain transition-all duration-300 brightness-0 invert"
                        onError={() => setImgError(true)}
                        alt={item.name}
                    />
                ) : (
                    item.icon
                )}
            </div>
            <span className="font-sans text-[10px] sm:text-xs md:text-sm font-bold tracking-tight sm:tracking-wide text-center leading-tight">
                {item.name}
            </span>
        </div>
    );
}

export default function CategorySlider({ activeCategory, onCategoryChange }: CategorySliderProps) {
    return (
        <div className="w-full grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 select-none">
            {CATEGORY_ITEMS.map((item) => {
                const isActive = isSameCategory(activeCategory, item.value);
                return (
                    <CategoryCard
                        key={item.name}
                        item={item}
                        isActive={isActive}
                        onClick={() => onCategoryChange(isActive ? "" : item.value)}
                    />
                );
            })}
        </div>
    );
}

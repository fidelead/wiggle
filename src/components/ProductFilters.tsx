"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductFiltersProps {
    searchTerm: string;
    onSearch: (term: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    selectedPetType: string | null;
    onPetTypeChange: (type: string | null) => void;
    selectedBrands: string[];
    onBrandChange: (brand: string) => void;
    selectedTags: string[];
    onTagChange: (tag: string) => void;
    priceRange: { min: number; max: number };
    onPriceChange: (min: number, max: number) => void;
    onClearAll: () => void;
    
    categories: string[];
    brands: string[];
    tags: string[];
    maxPriceLimit: number;
    totalResults?: number;
}

const PET_TYPES = ["PERRO", "GATO"];

export default function ProductFilters({
    searchTerm,
    onSearch,
    selectedCategory,
    onCategoryChange,
    selectedPetType,
    onPetTypeChange,
    selectedBrands,
    onBrandChange,
    selectedTags,
    onTagChange,
    priceRange,
    onPriceChange,
    onClearAll,
    categories,
    brands,
    tags,
    maxPriceLimit,
    totalResults
}: ProductFiltersProps) {
    const [localSearch, setLocalSearch] = useState(searchTerm);
    const [openSections, setOpenSections] = useState({
        petType: true,
        categories: true,
        productTypes: true,
        brands: true,
        price: true
    });

    useEffect(() => {
        setLocalSearch(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(localSearch);
        }, 300);
        return () => clearTimeout(timeout);
    }, [localSearch, onSearch]);

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const Checkbox = ({ checked }: { checked: boolean }) => (
        <div className={`w-3.5 h-3.5 border rounded-[3px] flex items-center justify-center transition-colors ${checked ? 'bg-salmon border-salmon' : 'border-gray-300 bg-white'}`}>
            {checked && <Check className="w-3 h-3 text-white stroke-[3px]" />}
        </div>
    );

    const RadioButton = ({ checked }: { checked: boolean }) => (
        <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? 'border-salmon bg-white' : 'border-gray-300 bg-white'}`}>
            {checked && <div className="w-2 h-2 rounded-full bg-salmon" />}
        </div>
    );

    return (
        <div className="space-y-3.5 text-slate-800 font-sans">
            
            {/* Counter Text at the top */}
            {typeof totalResults === 'number' && (
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Mostrando {totalResults} resultado{totalResults !== 1 ? 's' : ''}
                </div>
            )}

            {/* Compact Search Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:border-salmon transition-colors shadow-none"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Section: Mascota (Compact) */}
            <div className="border-b border-gray-100 pb-3">
                <button onClick={() => toggleSection('petType')} className="flex items-center justify-between w-full mb-2 group">
                    <h3 className="font-serif text-base font-bold text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>Mascota</h3>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openSections.petType ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {openSections.petType && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {PET_TYPES.map(type => {
                                    const isSelected = (selectedPetType || "").toUpperCase() === type;
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => onPetTypeChange(isSelected ? null : type.charAt(0) + type.slice(1).toLowerCase())}
                                            className={`py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg border transition-all duration-200 ${
                                                isSelected
                                                    ? 'bg-salmon text-white border-salmon shadow-sm'
                                                    : 'bg-[#F8FAFC] text-slate-700 border-gray-200/80 hover:border-salmon hover:text-salmon'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Section: Categorías (Compact Radio list) */}
            <div className="border-b border-gray-100 pb-3">
                <button onClick={() => toggleSection('categories')} className="flex items-center justify-between w-full mb-2 group">
                    <h3 className="font-serif text-base font-bold text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>Categorías</h3>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openSections.categories ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {openSections.categories && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            {/* Back arrow button if a category is selected */}
                            {selectedCategory !== "" && (
                                <button
                                    onClick={() => onCategoryChange("")}
                                    className="mb-2 flex items-center gap-1.5 text-salmon font-bold text-[11px] tracking-wider uppercase hover:text-slate-900 transition-colors py-1 px-2.5 bg-salmon/10 rounded-full border border-salmon/20"
                                >
                                    ← Atrás
                                </button>
                            )}

                            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                                {/* Todas Option (Radio) */}
                                <label className="flex items-center gap-2.5 cursor-pointer group py-1" onClick={() => onCategoryChange("")}>
                                    <RadioButton checked={selectedCategory === ""} />
                                    <span className={`text-xs ${selectedCategory === "" ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-salmon'} transition-colors`}>
                                        Todas
                                    </span>
                                </label>
                                
                                {categories.map(cat => (
                                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer group py-1" onClick={() => onCategoryChange(cat)}>
                                        <RadioButton checked={selectedCategory.toLowerCase() === cat.toLowerCase()} />
                                        <span className={`text-xs ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-salmon'} transition-colors`}>
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Section: Tipo de productos (Compact Tags) */}
            <div className="border-b border-gray-100 pb-3">
                <button onClick={() => toggleSection('productTypes')} className="flex items-center justify-between w-full mb-2 group">
                    <h3 className="font-serif text-base font-bold text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>Tipo de productos</h3>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openSections.productTypes ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {openSections.productTypes && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                                {tags.map(tag => (
                                    <label key={tag} className="flex items-center gap-2.5 cursor-pointer group py-1" onClick={() => onTagChange(tag)}>
                                        <Checkbox checked={selectedTags.includes(tag)} />
                                        <span className={`text-xs ${selectedTags.includes(tag) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-salmon'} transition-colors`}>
                                            {tag}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Section: Marcas (Compact) */}
            <div className="border-b border-gray-100 pb-3">
                <button onClick={() => toggleSection('brands')} className="flex items-center justify-between w-full mb-2 group">
                    <h3 className="font-serif text-base font-bold text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>Marcas</h3>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openSections.brands ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {openSections.brands && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                                {brands.map(brand => (
                                    <label key={brand} className="flex items-center gap-2.5 cursor-pointer group py-1" onClick={() => onBrandChange(brand)}>
                                        <Checkbox checked={selectedBrands.includes(brand)} />
                                        <span className={`text-xs ${selectedBrands.includes(brand) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-salmon'} transition-colors`}>
                                            {brand}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Section: Rango de Precios (No Cutoffs, Generous Padding) */}
            <div className="border-b border-gray-100 pb-4">
                <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full mb-2 group">
                    <h3 className="font-serif text-base font-bold text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>Rango de Precios</h3>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${openSections.price ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {openSections.price && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-visible"
                        >
                            <div className="pt-3 pb-1 px-2">
                                <div className="relative h-2 bg-gray-200 rounded-full mb-4 mx-1">
                                    <div
                                        className="absolute h-full bg-salmon rounded-full"
                                        style={{
                                            left: `${(priceRange.min / maxPriceLimit) * 100}%`,
                                            right: `${100 - (priceRange.max / maxPriceLimit) * 100}%`
                                        }}
                                    />
                                    <input
                                        type="range"
                                        min="0" max={maxPriceLimit}
                                        value={priceRange.min}
                                        onChange={(e) => {
                                            const val = Math.min(Number(e.target.value), priceRange.max - 1);
                                            onPriceChange(val, priceRange.max);
                                        }}
                                        className="absolute w-full h-2 opacity-0 cursor-pointer z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
                                    />
                                    <div
                                        className="absolute w-4 h-4 bg-white border-2 border-salmon rounded-full shadow top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10"
                                        style={{ left: `${(priceRange.min / maxPriceLimit) * 100}%` }}
                                    />

                                    <input
                                        type="range"
                                        min="0" max={maxPriceLimit}
                                        value={priceRange.max}
                                        onChange={(e) => {
                                            const val = Math.max(Number(e.target.value), priceRange.min + 1);
                                            onPriceChange(priceRange.min, val);
                                        }}
                                        className="absolute w-full h-2 opacity-0 cursor-pointer z-20 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
                                    />
                                    <div
                                        className="absolute w-4 h-4 bg-white border-2 border-salmon rounded-full shadow top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10"
                                        style={{ left: `${(priceRange.max / maxPriceLimit) * 100}%` }}
                                    />
                                </div>

                                <div className="flex items-center justify-between text-xs font-bold text-slate-600 tracking-wider">
                                    <span>${priceRange.min}</span>
                                    <span>${priceRange.max}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Clear All Button (Compact) */}
            <button
                onClick={onClearAll}
                className="w-full py-2.5 bg-slate-900 text-white font-bold tracking-widest text-[11px] uppercase rounded-lg transition-all duration-300 hover:bg-salmon shadow-none"
            >
                Limpiar Filtros
            </button>
        </div>
    );
}

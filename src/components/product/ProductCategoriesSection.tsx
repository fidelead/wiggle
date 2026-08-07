"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CategorySlider from "@/components/CategorySlider";

export default function ProductCategoriesSection() {
    const router = useRouter();

    const handleCategoryClick = (category: string) => {
        if (category) {
            router.push(`/shop?category=${encodeURIComponent(category)}`);
        } else {
            router.push("/shop");
        }
    };

    return (
        <section className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-domine)' }}>
                        Descubre todas nuestras categorías disponibles
                    </h2>
                    <div className="w-16 h-[3px] bg-salmon mx-auto rounded-full"></div>
                </div>

                <CategorySlider
                    activeCategory=""
                    onCategoryChange={handleCategoryClick}
                />
            </div>
        </section>
    );
}

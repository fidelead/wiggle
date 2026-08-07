"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

interface ShopProduct {
    id: string;
    name: string;
    price: string;
    slug: string;
    image: string;
    brand?: string;
    category?: string;
}

export default function ShopProductCard({ product }: { product: ShopProduct }) {
    // Determine image src - support both local and remote URLs
    const imageSrc = product.image || "/placeholder-product.png";

    return (
        <Link href={`/product/${product.slug}`} className="group block cursor-pointer">
            {/* Image Container - Vertical/Portrait Aspect Ratio for Luxury Feel */}
            <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden mb-4">
                
                {/* Category Badge Overlay */}
                {product.category && (
                    <div className="absolute top-3 left-0 z-20 bg-[#3D6A66] text-white text-[9px] font-bold tracking-[0.15em] px-3 py-1.5 uppercase rounded-r shadow-md">
                        {product.category}
                    </div>
                )}

                {/* Image with Zoom Effect */}
                <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-multiply">
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                </div>

                {/* Quick Add Overlay (Optional Luxury Touch) */}
                <div className="absolute bottom-0 left-0 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
                    <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm hover:bg-salmon hover:text-white transition-colors">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-1">
                {product.brand && (
                    <span className="font-sans text-[10px] font-bold text-salmon uppercase tracking-widest block">
                        {product.brand}
                    </span>
                )}
                <h3 className="font-serif text-base text-gray-900 leading-tight group-hover:text-salmon transition-colors line-clamp-1" style={{ fontFamily: 'var(--font-domine)' }}>
                    {product.name}
                </h3>
                <div className="flex flex-col mt-0.5">
                    <div
                        className="font-sans text-sm md:text-base font-bold text-slate-800 tracking-wide"
                        dangerouslySetInnerHTML={{ __html: product.price }}
                    />
                    <span className="font-sans text-[10px] text-gray-400 font-medium tracking-wide">
                        (Incluye IVA)
                    </span>
                </div>
            </div>
        </Link>
    );
}

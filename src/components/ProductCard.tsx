"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <div className="group flex flex-col items-center">
            {/* Image Container */}
            <div className="relative w-full aspect-square bg-[#F5F5F5] rounded-xl overflow-hidden mb-4 cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-500 group-hover:scale-105">
                    {/* Placeholder for Product if image fails, otherwise use img tag */}
                    <div className="w-full h-full bg-contain bg-center bg-no-repeat mix-blend-multiply opacity-80"
                        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop")` }}>
                    </div>
                </div>

                {/* Quick Add Button */}
                <button
                    onClick={addToCart}
                    className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full shadow-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-salmon hover:text-white"
                >
                    <Plus size={20} />
                </button>

                {/* Tag */}
                <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-sm">
                    {product.category}
                </span>
            </div>

            {/* Info */}
            <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-salmon transition-colors text-center cursor-pointer line-clamp-1 px-2">
                {product.name}
            </h3>
            <span className="text-sm font-bold text-gray-500 mt-1">${product.price}.00</span>

            <button className="mt-3 text-xs font-bold uppercase tracking-wider text-black border-b border-black hover:border-salmon hover:text-salmon transition-colors pb-0.5">
                Ver Detalles
            </button>
        </div>
    );
}

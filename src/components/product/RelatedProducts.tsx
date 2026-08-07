"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchGraphQL } from "@/lib/graphql";

const GET_RELATED_PRODUCTS = `
query GetRelatedProducts {
  products(first: 10, where: { orderby: [{ field: DATE, order: DESC }] }) {
    nodes {
      id
      databaseId
      name
      slug
      ... on SimpleProduct {
        price
        productBrands {
          nodes {
            name
          }
        }
      }
      ... on VariableProduct {
        price
        productBrands {
          nodes {
            name
          }
        }
      }
      ... on GroupProduct {
        productBrands {
          nodes {
            name
          }
        }
      }
      ... on ExternalProduct {
        price
        productBrands {
          nodes {
            name
          }
        }
      }
      image {
        sourceUrl
      }
    }
  }
}
`;

export default function RelatedProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function loadRelated() {
            try {
                const data = await fetchGraphQL(GET_RELATED_PRODUCTS);
                if (data?.products?.nodes) {
                    setProducts(data.products.nodes);
                }
            } catch (err) {
                console.error("Error loading related products:", err);
            }
        }
        loadRelated();
    }, []);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -340, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 340, behavior: "smooth" });
        }
    };

    if (products.length === 0) return null;

    return (
        <section className="bg-white py-16 border-t border-slate-100 relative select-none">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col items-center mb-10 text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6A66] mb-2">
                        LO ÚLTIMO EN TIENDA
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-slate-900 font-bold mb-3" style={{ fontFamily: 'var(--font-domine)' }}>
                        Productos Destacados
                    </h2>
                    <div className="w-16 h-[3px] bg-salmon rounded-full"></div>
                </div>

                {/* Slider Container with Arrows */}
                <div className="relative group/slider">
                    
                    {/* Left Scroll Arrow */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 p-3 bg-white border border-gray-100 rounded-full shadow-lg text-gray-700 hover:text-salmon hover:border-salmon hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 hidden sm:flex items-center justify-center"
                        aria-label="Desplazar a la izquierda"
                    >
                        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                    </button>

                    {/* Scrollable Track - Hidden Scrollbars */}
                    <div
                        ref={sliderRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {products.map((product) => {
                            const brandName = product.productBrands?.nodes?.[0]?.name || "WIGGLE";

                            return (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.slug}`}
                                    className="group flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] cursor-pointer"
                                >
                                    {/* Image Card Container */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 rounded-2xl mb-4 border border-gray-100">
                                        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 mix-blend-multiply">
                                            <Image
                                                src={product.image?.sourceUrl || "/placeholder-product.png"}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-4"
                                                sizes="300px"
                                            />
                                        </div>
                                    </div>

                                    {/* Info Block */}
                                    <div className="space-y-1">
                                        <span className="font-sans text-[10px] font-bold text-salmon uppercase tracking-widest block">
                                            {brandName}
                                        </span>
                                        <h3 className="font-serif text-base text-gray-900 leading-tight group-hover:text-salmon transition-colors line-clamp-1" style={{ fontFamily: 'var(--font-domine)' }}>
                                            {product.name}
                                        </h3>
                                        <div className="flex flex-col mt-0.5">
                                            <div
                                                className="font-sans text-sm md:text-base font-bold text-slate-800 tracking-wide"
                                                dangerouslySetInnerHTML={{ __html: product.price || "" }}
                                            />
                                            <span className="font-sans text-[10px] text-gray-400 font-medium tracking-wide">
                                                (Incluye IVA)
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Scroll Arrow */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 p-3 bg-white border border-gray-100 rounded-full shadow-lg text-gray-700 hover:text-salmon hover:border-salmon hover:scale-110 active:scale-95 transition-all opacity-0 group-hover/slider:opacity-100 hidden sm:flex items-center justify-center"
                        aria-label="Desplazar a la derecha"
                    >
                        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                    </button>

                </div>

            </div>
        </section>
    );
}

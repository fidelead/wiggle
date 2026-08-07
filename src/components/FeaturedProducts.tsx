"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchGraphQL } from "@/lib/graphql";

const GET_FEATURED_PRODUCTS = `
query GetFeaturedProducts {
  products(first: 4) {
    nodes {
      id
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

interface FeaturedProduct {
    id: string;
    name: string;
    slug: string;
    price: string;
    image?: {
        sourceUrl: string;
    } | null;
    productBrands?: {
        nodes: { name: string }[];
    } | null;
}

export default function FeaturedProducts() {
    const [products, setProducts] = useState<FeaturedProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadFeatured() {
            try {
                const data = await fetchGraphQL(GET_FEATURED_PRODUCTS);
                if (data?.products?.nodes) {
                    setProducts(data.products.nodes);
                }
            } catch (err) {
                console.error("Failed to load featured products:", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadFeatured();
    }, []);

    if (isLoading) {
        return (
            <div className="py-24 bg-white min-h-[400px] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-salmon border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!products.length) return null;

    return (
        <section className="py-24 bg-white overflow-visible">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                <div className="text-center mb-24 md:mb-32">
                    <span className="block font-sans text-xs md:text-sm font-bold text-salmon tracking-[0.25em] uppercase mb-4 animate-fade-in">
                        PRODUCTOS DESTACADOS
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl text-dark tracking-wide leading-tight animate-slide-up" style={{ fontFamily: 'var(--font-domine)' }}>
                        Compra online y descubre una <span className="italic font-light">Nueva forma</span> de vivir el paseo.
                    </h2>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {products.map((product) => {
                        const brandName = product.productBrands?.nodes?.[0]?.name || "";
                        const imageSrc = product.image?.sourceUrl || "/placeholder-product.png";

                        return (
                            <div key={product.id} className="group h-full">
                                <Link href={`/product/${product.slug}`} className="block h-full">
                                    <div className="bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col relative overflow-hidden">
                                        {/* Image Container */}
                                        <div className="relative w-full aspect-square bg-gray-50 flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={imageSrc}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex flex-col flex-grow justify-between text-center p-6 bg-white z-10">
                                            <div className="space-y-3">
                                                {brandName && (
                                                    <span className="font-sans text-[10px] font-bold text-salmon uppercase tracking-widest block">
                                                        {brandName}
                                                    </span>
                                                )}
                                                <h3 className="font-sans text-[11px] md:text-xs font-bold tracking-[0.15em] text-slate-800 uppercase line-clamp-2 leading-relaxed h-10">
                                                    {product.name}
                                                </h3>
                                                <div className="flex flex-col items-center mt-1">
                                                    <div
                                                        className="font-serif text-xl text-slate-900 font-semibold tracking-wide"
                                                        dangerouslySetInnerHTML={{ __html: product.price }}
                                                    />
                                                    <span className="font-sans text-[10px] text-gray-400 font-medium tracking-wide mt-0.5">
                                                        (Incluye IVA)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Hover Action Bar */}
                                        <div className="absolute bottom-0 left-0 w-full bg-slate-900 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out text-center z-20">
                                            VER PRODUCTO
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Heart, Share2 } from "lucide-react";
import { fetchGraphQL } from "@/lib/graphql";

interface Product {
    id: string;
    name: string;
    slug: string;
    price: string;
    image: {
        sourceUrl: string;
    } | null;
}

const GET_PRODUCTS = `
query GetOurProducts {
  products(first: 8) {
    nodes {
      id
      name
      slug
      ... on SimpleProduct {
        price
      }
      ... on VariableProduct {
        price
        variations {
          nodes {
            id
            name
            price
            attributes {
              nodes {
                name
                value
              }
            }
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

export default function OurProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await fetchGraphQL(GET_PRODUCTS);
                setProducts(data.products.nodes);
            } catch (err) {
                console.error("Error loading our products:", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadProducts();
    }, []);

    if (isLoading) {
        return <div className="py-24 bg-white min-h-[600px]" />;
    }

    return (
        <section className="py-24 bg-white overflow-visible">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-20 md:mb-28"
                >
                    <h2 className="font-serif text-3xl md:text-5xl text-dark tracking-wide leading-tight mb-4" style={{ fontFamily: 'var(--font-domine)' }}>
                        NUESTROS PRODUCTOS
                    </h2>
                    <p className="font-sans text-sm md:text-base text-salmon font-medium tracking-wide max-w-2xl mx-auto uppercase">
                        De collares icónicos a prendas técnicas y accesorios de visibilidad. Diseño con propósito.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 gap-y-24">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                            className="group relative select-none"
                        >
                            <Link href={`/product/${product.slug}`} className="block">
                                <div className="bg-[#e4e4e4] pt-0 pb-6 px-6 mt-24 text-center transition-all duration-500 ease-out group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:bg-[#e8e8e8] relative">

                                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                        <button className="p-2 bg-white rounded-full shadow-sm hover:bg-salmon hover:text-white transition-colors group/btn">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 bg-white rounded-full shadow-sm hover:bg-salmon hover:text-white transition-colors group/btn">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="relative -mt-24 mb-4 h-56 md:h-64 w-full flex items-end justify-center pointer-events-none">
                                        <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105">
                                            <Image
                                                src={product.image?.sourceUrl || "/placeholder-product.png"}
                                                alt={product.name}
                                                fill
                                                className="object-contain object-bottom drop-shadow-xl"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-3 h-3 text-salmon fill-salmon" />
                                            ))}
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="font-sans text-xs md:text-sm font-bold tracking-[0.2em] text-dark/80 uppercase">
                                                {product.name}
                                            </h3>
                                            <div
                                                className="font-serif text-lg md:text-xl text-dark font-medium tracking-wider"
                                                dangerouslySetInnerHTML={{ __html: product.price }}
                                            />
                                        </div>

                                        <div className="pt-2 w-full flex justify-center opacity-100">
                                            <button className="px-6 py-3 border border-dark/40 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-dark bg-transparent hover:bg-dark hover:text-white hover:border-dark transition-all duration-300">
                                                Seleccionar Opciones
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

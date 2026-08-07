"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchGraphQL } from "@/lib/graphql";

const GET_ACCESORIO = `
query GetAccesorio {
  products(first: 1) {
    nodes {
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

export default function AccessoriesSection() {
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadAccesorio() {
            try {
                const data = await fetchGraphQL(GET_ACCESORIO);
                if (data.products.nodes.length > 0) {
                    setProduct(data.products.nodes[0]);
                }
            } catch (err) {
                console.error("Error loading accessory:", err);
            } finally {
                setIsLoading(false);
            }
        }
        loadAccesorio();
    }, []);

    if (isLoading || !product) {
        return <div className="py-24 bg-white min-h-[400px]" />; // Skeleton or empty space
    }

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">

                {/* Left Side: Image with Circular Background */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full md:w-[40%] flex justify-center items-center"
                >
                    {/* Navigation Arrows (Decorative) */}
                    <button className="absolute left-0 md:left-2 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft className="w-8 h-8 text-black" />
                    </button>
                    <button className="absolute right-0 md:right-2 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronRight className="w-8 h-8 text-black" />
                    </button>

                    {/* Circular Background */}
                    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#EFA899] absolute z-0 opacity-90 transition-transform duration-500 hover:scale-105"></div>

                    {/* Product Image */}
                    <Link href={`/product/${product.slug}`} className="relative z-10 w-[240px] md:w-[320px] h-[240px] md:h-[320px] cursor-pointer block">
                        <Image
                            src={product.image?.sourceUrl || "/placeholder-product.png"}
                            alt={product.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </Link>
                </motion.div>

                {/* Right Side: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-[60%] text-center md:text-left space-y-8"
                >
                    <div className="space-y-4">
                        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-dark leading-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                            ACCESORIOS QUE TAMBIÉN COMBINAN <br />CONTIGO.
                        </h2>
                        <p className="font-sans text-xs md:text-sm font-bold text-[#EFA899] tracking-[0.3em] uppercase">
                            ESTILO QUE SE COMPARTE.
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-200"></div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="font-sans text-lg md:text-xl font-medium tracking-widest text-dark uppercase mb-2">
                                {product.name}
                            </h3>
                            <div className="flex flex-col mt-1">
                                <div
                                    className="font-serif text-2xl md:text-3xl font-bold text-dark"
                                    dangerouslySetInnerHTML={{ __html: product.price }}
                                />
                                <span className="font-sans text-xs text-gray-400 font-medium tracking-wide mt-1">
                                    (Incluye IVA)
                                </span>
                            </div>
                        </div>

                        <Link href={`/product/${product.slug}`}>
                            <button className="px-10 py-4 bg-[#EFA899] text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                VER DETALLE
                            </button>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

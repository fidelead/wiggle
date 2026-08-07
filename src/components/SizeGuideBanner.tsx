"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SizeGuideBanner() {
    return (
        <section className="relative w-full h-[420px] md:h-[480px] border-t-[6px] border-salmon overflow-hidden flex items-center justify-center select-none">
            
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                style={{ backgroundImage: `url('/about-main.jpg')` }}
            />

            {/* Dark Overlay for Ultra-Legibility */}
            <div className="absolute inset-0 bg-black/55 md:bg-black/50 backdrop-blur-[1px]" />

            {/* Content Container */}
            <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center text-white flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    {/* Main Title */}
                    <h2
                        className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-wide drop-shadow-md"
                        style={{ fontFamily: 'var(--font-domine)' }}
                    >
                        La talla ideal empieza con una buena medida
                    </h2>

                    {/* Description Paragraph */}
                    <p className="text-sm md:text-base text-white/90 max-w-2xl font-light leading-relaxed mb-8 tracking-wide">
                        Descubre cómo medir a tu mascota en casa y encuentra accesorios que se adapten a su cuerpo, su movimiento y su personalidad.
                    </p>

                    {/* CTA Pill Button linking to Internal Size Guide Page */}
                    <Link
                        href="/guia-tallas"
                        className="inline-flex items-center justify-center px-9 py-4 bg-salmon hover:bg-[#e09788] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
                    >
                        DESCUBRIR GUÍA
                    </Link>
                </motion.div>
            </div>

        </section>
    );
}

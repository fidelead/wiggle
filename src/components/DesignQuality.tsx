"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DesignQuality() {
    return (
        <section className="relative w-full h-[500px] md:h-[650px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/design-quality-bg.png"
                    alt="Paseo con estilo"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Gradient Overlay for Text Readability - Stronger fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center">
                <div className="max-w-3xl text-white pt-10 md:pt-0">

                    {/* Animated Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-10 drop-shadow-lg tracking-wide"
                        style={{ fontFamily: 'var(--font-domine)' }}
                    >
                        DISEÑO QUE SE NOTA.<br />
                        CALIDAD QUE SE SIENTE.
                    </motion.h2>

                    {/* Animated List */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="space-y-5 mb-12"
                    >
                        {[
                            "Selección premium curada.",
                            "Diseño funcional y estética de alta gama.",
                            "Tecnología, materiales innovadores y detalles.",
                            "Pensado para mascotas y humanos con criterio."
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                                className="flex items-center gap-3 group"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-salmon group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(239,168,153,0.5)]" />
                                <p className="text-base md:text-lg font-light tracking-wide text-white/90">
                                    {item}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Animated Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="inline-block"
                    >
                        <Link 
                            href="/about"
                            className="inline-block px-10 py-4 border border-white rounded-full text-sm font-bold tracking-[0.25em] relative overflow-hidden group hover:text-dark transition-colors duration-300"
                        >
                            <span className="relative z-10">LEER MÁS</span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

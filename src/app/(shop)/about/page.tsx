"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Star, Heart, Sparkles } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen font-sans">

            {/* HERO SECTION - ESENCIA (Refactored to Dior Style) */}
            <section className="relative py-24 lg:py-32 px-6 overflow-hidden flex flex-col items-center text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Top Small Title */}
                        <h2 className="font-serif text-2xl lg:text-3xl text-gray-500 mb-8" style={{ fontFamily: 'var(--font-domine)' }}>
                            Nuestra Esencia
                        </h2>

                        {/* Large Logotype - Responsive Font Sizing to Prevent Clipping */}
                        <h1 className="font-serif text-[13vw] sm:text-[6rem] lg:text-[10rem] leading-[0.85] text-slate-900 tracking-tighter mb-4 max-w-full px-2 mx-auto text-center" style={{ fontFamily: 'var(--font-domine)' }}>
                            WIGGLE
                        </h1>

                        {/* Subtitle Tracking */}
                        <span className="block text-sm lg:text-base tracking-[0.5em] uppercase text-gray-400 mb-16 font-bold">
                            PET LIFESTYLE
                        </span>

                        {/* Paragraphs */}
                        <div className="max-w-2xl mx-auto space-y-8">
                            <p className="text-gray-600 text-lg leading-relaxed font-light">
                                Creemos en los vínculos que se viven en lo cotidiano: en la compañía constante, en los rituales compartidos y en ese lenguaje silencioso que conecta a un humano con su compañero de vida. Wiggle nace desde esa conexión, entendiendo el cuidado, la estética y la sensibilidad como parte de un mismo estilo de vida.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed font-light">
                                Seleccionamos piezas que acompañan ese vínculo —prendas, accesorios, cuidado, snacks y soluciones inteligentes— con una mirada curada que dialoga con la moda, el bienestar y el lifestyle contemporáneo. Cada elección expresa intención, diseño y calidad.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* DEFINITION & VISION - DUAL BLOCK */}
            <section className="bg-gray-50 py-24 px-6">
                <div className="max-w-5xl mx-auto space-y-20">

                    {/* Block 1: Qué es */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
                    >
                        <div className="md:w-1/3">
                            <h2 className="font-serif text-3xl text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>Qué es Wiggle</h2>
                            <div className="h-1 w-12 bg-salmon mt-4"></div>
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Wiggle es una marca premium de productos para mascotas, pensada para quienes viven este vínculo con criterio, gusto y atención al detalle. Nuestro portafolio reúne prendas, accesorios, productos de cuidado, snacks y soluciones inteligentes cuidadosamente seleccionados de marcas destacadas del mundo pet, priorizando propuestas únicas y de alto estándar.
                            </p>
                        </div>
                    </motion.div>

                    {/* Block 2: Visión */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
                    >
                        <div className="md:w-1/3">
                            <h2 className="font-serif text-3xl text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>Nuestra Visión</h2>
                            <div className="h-1 w-12 bg-salmon mt-4"></div>
                        </div>
                        <div className="md:w-2/3">
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Wiggle nace para representar eso que sucede entre un humano y su compañero de cuatro patitas: un lenguaje silencioso hecho de cuidado, presencia y pequeños rituales cotidianos. Creemos que compartir la vida con ellos transforma la forma en que habitamos el mundo.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* DIFFERENTIATORS GRID */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-[1400px] mx-auto text-center">
                    <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                        Nuestra Filosofía
                    </span>
                    <h2 className="font-serif text-4xl text-slate-900 mb-16" style={{ fontFamily: 'var(--font-domine)' }}>
                        Qué nos hace diferentes
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Sparkles,
                                title: "Sensibilidad Premium",
                                desc: "Materiales, texturas y detalles que elevan lo cotidiano con naturalidad."
                            },
                            {
                                icon: Heart,
                                title: "Enfoque en el Lifestyle",
                                desc: "Hablamos a quienes ven a su mascota como parte esencial de su identidad."
                            },
                            {
                                icon: Star,
                                title: "Experiencia Curada",
                                desc: "Más que ofrecer productos, proponemos momentos, rutinas y sensaciones compartidas."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="group p-8 border border-gray-100 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
                            >
                                <div className="w-16 h-16 mx-auto bg-salmon/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-salmon transition-colors duration-300">
                                    <item.icon className="w-8 h-8 text-salmon group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="font-serif text-xl text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MANIFESTO SECTION (Refactored to Graphic Split Style) */}
            <section className="min-h-[700px] grid md:grid-cols-2">
                {/* Left Content - Cream Background */}
                <div className="bg-[#F9F5F0] p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Decorative Element */}
                    <div className="absolute top-12 right-12 w-24 h-24 bg-salmon/10 rounded-full blur-2xl pointer-events-none"></div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10"
                    >
                        <h2 className="font-serif text-5xl lg:text-7xl leading-[0.9] text-slate-900 mb-12 uppercase tracking-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                            Wiggle <br />
                            <span className="text-salmon">es para ti</span> <br />
                            si buscas...
                        </h2>

                        <div className="space-y-6">
                            {[
                                "Una extensión de tu propia identidad.",
                                "Diseño que no sacrifica funcionalidad.",
                                "Marcas con estética y propósito real.",
                                "Ver el cuidado como una forma de amar."
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (idx * 0.1) }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-8 h-8 rounded-full border border-slate-900/10 flex items-center justify-center bg-white group-hover:bg-salmon group-hover:border-salmon transition-colors duration-300">
                                        <Check className="w-4 h-4 text-slate-900 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-lg lg:text-xl font-light text-slate-700 group-hover:text-slate-900 transition-colors">{item}</span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-16 pt-8 border-t border-slate-900/10">
                            <p className="font-serif italic text-2xl text-slate-900/80">
                                "El lujo no es ostentación, es la libertad de elegir lo mejor para quien más quieres."
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Image */}
                <div className="relative h-[500px] md:h-auto overflow-hidden">
                    <Image
                        src="/about-manifesto-2.jpg"
                        alt="Wiggle Lifestyle Woman with Dog"
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-105"
                    />
                </div>
            </section>

            {/* CIERRE PARA REGISTRO */}
            <section className="py-24 px-6 bg-salmon text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-domine)' }}>
                        ¿Quieres formar parte de nuestra comunidad?
                    </h2>
                    <p className="text-white/90 text-lg md:text-xl mb-10 tracking-wide font-light">
                        Registrate y conoce mas de nosotros
                    </p>
                    <Link href="/contact" className="bg-white text-salmon px-10 py-4 rounded-full font-bold text-sm tracking-[0.2em] uppercase hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-block">
                        REGISTRO
                    </Link>
                </div>
            </section>

        </div>
    );
}

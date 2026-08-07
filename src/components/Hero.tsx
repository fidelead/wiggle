"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Heart, Lock, ChevronRight, ChevronLeft, Award } from "lucide-react";
import Link from "next/link";

interface Slide {
    id: number;
    type?: 'image' | 'video';
    video?: string;
    mobileVideo?: string;
    image: string;
    pretitle: string;
    title: string;
    subtitle: string;
    description: string;
    disclaimer?: string;
    pills?: { label: string; link: string }[];
    align?: 'left' | 'right';
}

const slides: Slide[] = [
    {
        id: 1,
        type: "video",
        video: "https://wiggle.shop/wp-content/uploads/2026/07/test02_wiggle.mp4",
        image: "/hero-slide-2.jpg",
        pretitle: "NO TODOS LOS ALIMENTOS",
        title: "CUIDAN IGUAL",
        subtitle: "LAS MEJORES DECISIONES TAMBIÉN EMPIEZAN EN SU PLATO.",
        description: "Conoce la línea Ownat Classic y encuentra la opción ideal para tu perro.",
        disclaimer: "Ingredientes naturales, carne fresca y nutrición equilibrada para quienes entienden que cuidar también es elegir.",
        pills: [
            { label: "Ownat Classic Duck", link: "/shop?search=Ownat+Classic+Duck" },
            { label: "Ownat Classic Complet", link: "/shop?search=Ownat+Classic+Complet" }
        ],
        align: "left"
    },
    {
        id: 2,
        type: "video",
        video: "/hero-video.mp4",
        mobileVideo: "/hero-video-mobile.mp4",
        image: "/hero-final.png",
        pretitle: "WIGGLE PET SHOP",
        title: "EL LUJO TAMBIÉN SE PASEA",
        subtitle: "DISEÑO, TECNOLOGÍA Y ESTILO PARA TU MASCOTA.",
        description: "Accesorios premium cuidadosamente seleccionados para quienes no compran lo común.",
        disclaimer: "Materiales nobles y tecnología exclusiva de alta durabilidad.",
        pills: [
            { label: "Ver Accesorios", link: "/shop?category=Accesorios" },
            { label: "Ver Ropa", link: "/shop?category=Ropa" }
        ],
        align: "left"
    },
    {
        id: 3,
        type: "video",
        video: "https://wiggle.shop/wp-content/uploads/2026/06/WIGGLEDESCUENTOBG.mp4",
        image: "/hero-slide-2.jpg",
        pretitle: "OFERTA EXCLUSIVA",
        title: "25% DE DESCUENTO",
        subtitle: "EN TU PRIMERA COMPRA EN LÍNEA.",
        description: "Aplica en todas las prendas de ropa y accesorios de colección.",
        disclaimer: "Válido una sola vez por cliente al pagar en el carrito.",
        pills: [
            { label: "Ir a la Tienda", link: "/shop" }
        ],
        align: "right"
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance every 8 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const current = slides[currentSlide];

    return (
        <section className="relative w-full bg-[#FAFAFA]">
            
            {/* HERO BANNER - SLIM / CONTROLLED HEIGHT */}
            <div className="relative w-full h-[520px] md:h-[580px] lg:h-[620px] overflow-hidden bg-black select-none">
                
                {/* Background Media with Fade Transition */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {current.type === 'video' && current.video ? (
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                key={current.video}
                                className="absolute inset-0 w-full h-full object-cover"
                                poster={current.image}
                            >
                                <source src={current.video} type="video/mp4" />
                            </video>
                        ) : (
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url("${current.image}")` }}
                            />
                        )}

                        {/* Subtle Dark Overlay */}
                        <div className="absolute inset-0 bg-black/35 md:bg-black/30"></div>
                    </motion.div>
                </AnimatePresence>

                {/* Content Overlay */}
                <div className={`relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 h-full flex flex-col justify-center pb-20 md:pb-24 ${
                    current.align === 'right' ? 'items-end text-right' : 'items-start text-left'
                }`}>
                    <div className={`max-w-xl text-white flex flex-col ${
                        current.align === 'right' ? 'items-end text-right' : 'items-start text-left'
                    }`}>
                        <AnimatePresence mode="wait">
                            <motion.div key={currentSlide} className={`w-full flex flex-col ${
                                current.align === 'right' ? 'items-end text-right' : 'items-start text-left'
                            }`}>
                                
                                {/* Pretitle */}
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 0.9, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="block text-xs font-bold tracking-[0.25em] text-white/90 uppercase mb-2"
                                >
                                    {current.pretitle}
                                </motion.span>

                                {/* Main Title */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight tracking-wider"
                                    style={{ fontFamily: 'var(--font-domine)' }}
                                >
                                    {current.title}
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.h3
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-xs md:text-sm font-bold tracking-widest text-white/90 uppercase mb-3 leading-relaxed"
                                >
                                    {current.subtitle}
                                </motion.h3>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-xs md:text-sm text-white/85 mb-5 max-w-md font-light leading-relaxed"
                                >
                                    {current.description}
                                </motion.p>

                                {/* Pill Buttons */}
                                {current.pills && current.pills.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        className={`flex flex-wrap gap-3 mb-4 ${
                                            current.align === 'right' ? 'justify-end' : 'justify-start'
                                        }`}
                                    >
                                        {current.pills.map((pill) => (
                                            <Link key={pill.label} href={pill.link}>
                                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm">
                                                    <Award className="w-4 h-4 text-salmon" />
                                                    <span>{pill.label}</span>
                                                </button>
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}

                                {/* Disclaimer */}
                                {current.disclaimer && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.8 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                        className="text-[11px] md:text-xs italic text-white/75 max-w-md font-light leading-snug"
                                    >
                                        {current.disclaimer}
                                    </motion.p>
                                )}

                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Slider Controls */}
                <div className="absolute right-6 md:right-12 bottom-24 md:bottom-28 z-20 flex gap-3">
                    <button
                        onClick={prevSlide}
                        className="p-2.5 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md bg-white/10 active:scale-95"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-2.5 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md bg-white/10 active:scale-95"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

            </div>

            {/* --- FLOATING OVERLAPPING VALUE PROPOSITION BAR --- */}
            <div className="relative max-w-[1240px] mx-auto px-6 z-30 -mt-16 md:-mt-20">
                <div className="bg-[#EFA899] rounded-[24px] md:rounded-[28px] shadow-xl p-6 md:py-8 md:px-12 text-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
                        
                        {/* ITEM 1 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
                                <Award className="w-8 h-8 text-white stroke-[1.8]" />
                            </div>
                            <h4 className="font-serif text-sm md:text-base font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-domine)' }}>
                                CALIDAD PREMIUM
                            </h4>
                            <p className="text-white/90 text-xs font-light leading-snug">
                                Materiales nobles y diseños exclusivos
                            </p>
                        </div>

                        {/* ITEM 2 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
                                <Heart className="w-8 h-8 text-white stroke-[1.8]" />
                            </div>
                            <h4 className="font-serif text-sm md:text-base font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-domine)' }}>
                                VALOR GARANTIZADO
                            </h4>
                            <p className="text-white/90 text-xs font-light leading-snug">
                                La mejor relación precio-calidad
                            </p>
                        </div>

                        {/* ITEM 3 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
                                <Lock className="w-8 h-8 text-white stroke-[1.8]" />
                            </div>
                            <h4 className="font-serif text-sm md:text-base font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-domine)' }}>
                                COMPRA BLINDADA
                            </h4>
                            <p className="text-white/90 text-xs font-light leading-snug">
                                Transacciones 100% seguras
                            </p>
                        </div>

                        {/* ITEM 4 */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
                                <ShieldCheck className="w-8 h-8 text-white stroke-[1.8]" />
                            </div>
                            <h4 className="font-serif text-sm md:text-base font-bold tracking-wider mb-1" style={{ fontFamily: 'var(--font-domine)' }}>
                                ENVÍOS
                            </h4>
                            <p className="text-white/90 text-xs font-light leading-snug">
                                Llevamos el estilo a tu puerta
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
}

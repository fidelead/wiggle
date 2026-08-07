"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DualBanner() {
    return (
        <section className="py-24 bg-[#45746d] overflow-hidden"> {/* Dark Sage Background */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="text-center text-white mb-20">
                    <h2 className="font-serif text-3xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-domine)' }}>
                        DOS FORMAS DE VIVIR EL ESTILO.
                    </h2>
                    <p className="uppercase tracking-[0.2em] text-sm md:text-base opacity-90">
                        EXPLORA LA SELECCIÓN <span className="font-bold">PARA PERROS</span> Y <span className="font-bold">PARA GATOS</span>.
                    </p>
                </div>

                {/* Banners Container */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-20">


                    {/* Dog Banner */}
                    <div className="group relative h-[500px] md:h-[600px] cursor-pointer overflow-hidden rounded-[24px] md:rounded-none">

                        {/* 1. Large Typography Background */}
                        <div className="absolute inset-x-0 top-[10%] text-center pointer-events-none z-0">
                            <span className="font-serif text-[18vw] md:text-[130px] lg:text-[150px] leading-none text-[#8FD6BD] opacity-90 select-none tracking-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                                PERROS
                            </span>
                        </div>

                        {/* 2. Bottom Card */}
                        <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-[#8FD6BD] rounded-[24px] md:rounded-[40px] transition-colors duration-500 group-hover:bg-[#7BC5AC] z-10"></div>

                        {/* 3. Image Container with Swap Logic */}
                        <div className="absolute bottom-0 inset-x-0 flex items-end justify-center z-20 pointer-events-none">
                            <div className="relative w-[85%] max-w-[340px] h-[480px] md:w-[420px] md:h-[580px] transition-transform duration-500 ease-out origin-bottom group-hover:scale-105">
                                {/* Default Image (Fades Out) */}
                                <Image
                                    src="/dual-banner-dog.png"
                                    alt="Perros"
                                    fill
                                    className="object-contain object-bottom transition-opacity duration-500 group-hover:opacity-0"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Hover Image (Fades In) */}
                                <Image
                                    src="/dual-banner-dog-hover.png"
                                    alt="Perros Hover"
                                    fill
                                    className="object-contain object-bottom absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* Arrow Action */}
                        <div className="absolute bottom-8 right-8 z-30">
                            <ArrowRight className="w-8 h-8 text-[#3E5C54] group-hover:translate-x-2 transition-transform duration-300" />
                        </div>

                        <Link href="/shop?category=perros" className="absolute inset-0 z-40" aria-label="Ver Perros"></Link>
                    </div>

                    {/* Cat Banner */}
                    <div className="group relative h-[500px] md:h-[600px] cursor-pointer overflow-hidden rounded-[24px] md:rounded-none">

                        {/* 1. Large Typography Background */}
                        <div className="absolute inset-x-0 top-[10%] text-center pointer-events-none z-0">
                            <span className="font-serif text-[18vw] md:text-[130px] lg:text-[150px] leading-none text-[#8FD6BD] opacity-90 select-none tracking-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                                GATOS
                            </span>
                        </div>

                        {/* 2. Bottom Card */}
                        <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-[#8FD6BD] rounded-[24px] md:rounded-[40px] transition-colors duration-500 group-hover:bg-[#7BC5AC] z-10"></div>

                        {/* 3. Image Container with Swap Logic */}
                        <div className="absolute bottom-0 inset-x-0 flex items-end justify-center z-20 pointer-events-none">
                            <div className="relative w-[85%] max-w-[300px] h-[420px] md:w-[350px] md:h-[520px] transition-transform duration-500 ease-out origin-bottom group-hover:scale-105">
                                {/* Default Image */}
                                <Image
                                    src="/dual-banner-cat.png"
                                    alt="Gatos"
                                    fill
                                    className="object-contain object-bottom transition-opacity duration-500 group-hover:opacity-0"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Hover Image */}
                                <Image
                                    src="/dual-banner-cat-hover.png"
                                    alt="Gatos Hover"
                                    fill
                                    className="object-contain object-bottom absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* Arrow Action */}
                        <div className="absolute bottom-8 right-8 z-30">
                            <ArrowRight className="w-8 h-8 text-[#3E5C54] group-hover:translate-x-2 transition-transform duration-300" />
                        </div>

                        <Link href="/shop?category=gatos" className="absolute inset-0 z-40" aria-label="Ver Gatos"></Link>
                    </div>

                </div>
            </div>
        </section>
    );
}

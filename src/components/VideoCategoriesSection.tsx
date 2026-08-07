"use client";

import React from "react";
import Link from "next/link";

interface VideoCategory {
    id: string;
    name: string;
    targetCategory: string;
    video: string;
    poster: string;
}

const VIDEO_CATEGORIES: VideoCategory[] = [
    {
        id: "accesorios",
        name: "ACCESORIOS",
        targetCategory: "Accesorios",
        video: "/LOOK&WOOF.mp4",
        poster: "/poster-techtail.png"
    },
    {
        id: "juguetes",
        name: "JUGUETES",
        targetCategory: "Juguetes",
        video: "/PLAYMOOD.mp4",
        poster: "/poster-playmood.png"
    },
    {
        id: "ropa",
        name: "ROPA",
        targetCategory: "Ropa",
        video: "/ropabulldog.mp4",
        poster: "/poster-lookwoof.png"
    }
];

export default function VideoCategoriesSection() {
    return (
        <section className="bg-salmon py-20 select-none overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                
                {/* 3 Column Grid Centered */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 justify-items-center">
                    {VIDEO_CATEGORIES.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/shop?category=${encodeURIComponent(cat.targetCategory)}`}
                            className="group w-full max-w-[340px] md:max-w-[360px] aspect-[3/4] rounded-[20px] md:rounded-[24px] overflow-hidden relative cursor-pointer shadow-xl bg-black/20 block transform transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Autoplay Video Background */}
                            <div className="absolute inset-0 w-full h-full">
                                <video
                                    ref={(el) => {
                                        if (el) {
                                            el.muted = true;
                                            el.play().catch(() => {});
                                        }
                                    }}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    poster={cat.poster}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                >
                                    <source src={cat.video} type="video/mp4" />
                                </video>
                            </div>

                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>

                            {/* Title & Accent Bar */}
                            <div className="absolute bottom-6 md:bottom-8 inset-x-0 flex flex-col items-center justify-end z-10 px-4">
                                <h3 className="text-white font-serif font-bold text-xl md:text-2xl tracking-widest uppercase text-center drop-shadow-md mb-2" style={{ fontFamily: 'var(--font-domine)' }}>
                                    {cat.name}
                                </h3>
                                <div className="w-12 group-hover:w-20 h-[3px] bg-white rounded-full transition-all duration-300"></div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}

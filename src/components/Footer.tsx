"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#121212] text-white py-20 px-6 md:px-12 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-32 mb-24">

                    {/* Left: Brand Statement */}
                    <div className="max-w-xl">
                        <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-6" style={{ fontFamily: 'var(--font-domine)' }}>
                            Wiggle es un pet shop premium diseñado para quienes entienden el detalle, el diseño y la funcionalidad.
                        </h2>
                        <p className="text-salmon text-sm md:text-base font-medium tracking-wide">
                            No seguimos tendencias. Las reinterpretamos.
                        </p>
                    </div>

                    {/* Right: Newsletter */}
                    <div className="w-full md:flex-1">
                        <label className="block text-sm md:text-base font-bold uppercase tracking-[0.15em] mb-6 text-white leading-relaxed">
                            Regístrate y forma parte de<br className="hidden md:block" /> nuestra comunidad exclusiva
                        </label>
                        <div className="flex gap-0">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="w-full bg-white text-dark px-6 py-4 focus:outline-none placeholder:text-dark/40 font-sans min-w-[200px]"
                            />
                            <button className="bg-salmon text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-salmon/90 transition-colors whitespace-nowrap">
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex gap-4 items-center">
                        <p className="text-xs text-white/40 tracking-wider">
                            &copy; 2026 Wiggle. Todos los derechos reservados.
                        </p>
                        <span className="text-white/20">|</span>
                        <Link href="/privacy" className="text-xs text-white/40 hover:text-white transition-colors tracking-wider">
                            Política de Privacidad
                        </Link>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-6">
                        <Link href="https://www.facebook.com/profile.php?id=61584279111796" target="_blank" className="text-white/60 hover:text-salmon transition-colors">
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link href="https://www.instagram.com/wigglepet.shop/" target="_blank" className="text-white/60 hover:text-salmon transition-colors">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="https://www.linkedin.com/company/wiggle-shop/" target="_blank" className="text-white/60 hover:text-salmon transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                        <Link href="https://www.tiktok.com/@wiggle_shop" target="_blank" className="text-white/60 hover:text-salmon transition-colors">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="none"
                            >
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.62-1.12v8.76c-.52 4.03-3.79 6.84-7.69 6.6-4.1-.3-7.14-3.78-6.79-7.85.35-4.12 4-7.19 8.11-6.79.61.05 1.19.19 1.75.39v4.3c-2.35-1.1-5.18.06-5.83 2.45-.63 2.37.99 4.8 3.4 5.27 2.46.46 4.77-1.14 5.39-3.48.06-.23.1-.47.13-.71v-12.8z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

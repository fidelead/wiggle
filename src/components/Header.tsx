"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const { count } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar - Hides on Scroll */}
            <motion.div
                animate={{ height: isScrolled ? 0 : "auto", opacity: isScrolled ? 0 : 1 }}
                className="bg-[#121212] text-white text-[10px] md:text-xs font-bold tracking-[0.2em] text-center overflow-hidden z-50 relative"
            >
                <div className="py-2.5 flex items-center justify-center gap-2">
                    <Truck className="w-3 h-3 md:w-4 md:h-4 text-salmon" />
                    <span>ENVÍOS A TODO EL PAÍS</span>
                </div>
            </motion.div>

            {/* Main Header - Sticky */}
            <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-4'}`}>
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative flex items-center justify-center">


                    {/* Absolute Left: Search */}
                    <div className="absolute left-6 md:left-12 flex items-center h-full">
                        <button className="p-3 hover:bg-gray-100 rounded-full transition-colors group">
                            <Search className="w-5 h-5 text-gray-600 group-hover:text-black" />
                        </button>
                    </div>

                    {/* Centered Cluster: Nav - Logo - Nav */}
                    <div className="flex items-center gap-8 md:gap-12">

                        {/* Left Navigation */}
                        <nav className="hidden md:flex items-center gap-6 md:gap-8">
                            {[
                                { label: 'INICIO', href: '/' },
                                { label: 'TIENDA', href: '/shop' },
                                { label: 'OFERTAS', href: '/ofertas', isOffer: true }
                            ].map((item) => (
                                <Link key={item.label} href={item.href} className="relative group py-2 flex items-center gap-1.5">
                                    <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${item.isOffer ? 'text-salmon hover:text-salmon-dark' : 'text-gray-600 hover:text-black'}`}>
                                        {item.label}
                                    </span>
                                    {item.isOffer && (
                                        <span className="bg-salmon text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-sm animate-pulse">
                                            30% OFF
                                        </span>
                                    )}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-salmon transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>

                        {/* Logo */}
                        <Link href="/" className="relative block shrink-0 mx-4">
                            <motion.div
                                animate={{ scale: isScrolled ? 0.8 : 1 }}
                                className="w-28 md:w-36"
                            >
                                <img src="/logo.png" alt="Wiggle Logo" className="w-full h-auto object-contain" />
                            </motion.div>
                        </Link>

                        {/* Right Navigation */}
                        <nav className="hidden md:flex items-center gap-6 md:gap-8">
                            {[
                                { label: 'NOSOTROS', href: '/about' },
                                { label: 'CONTACTO', href: '/contact' }
                            ].map((item) => (
                                <Link key={item.label} href={item.href} className="relative group py-2">
                                    <span className="text-sm font-bold text-gray-600 hover:text-black uppercase tracking-widest transition-colors">
                                        {item.label}
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-salmon transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Absolute Right: Actions */}
                    <div className="absolute right-6 md:right-12 flex items-center gap-3 h-full">
                        <div className="flex items-center gap-3">
                            <button className="p-3 hover:bg-gray-100 rounded-full transition-colors hidden md:block">
                                <User className="w-5 h-5 text-gray-600 hover:text-black" />
                            </button>

                            <Link href="/cart" className="relative p-3 hover:bg-gray-100 rounded-full group flex items-center gap-1">
                                <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-black" />
                                {count > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-salmon text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                        {count}
                                    </span>
                                )}
                            </Link>
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-3 hover:bg-gray-100 rounded-full"
                        >
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm md:hidden"
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[70] shadow-2xl md:hidden overflow-y-auto"
                    >
                        <div className="flex flex-col h-full p-6">
                            {/* Header with Wiggle Logo */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                <Link href="/" onClick={onClose} className="block w-28">
                                    <img src="/logo.png" alt="Wiggle Logo" className="w-full h-auto object-contain" />
                                </Link>
                                <button onClick={onClose} className="p-2 -mr-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-5">
                                {[
                                    { label: 'INICIO', href: '/' },
                                    { label: 'TIENDA', href: '/shop' },
                                    { label: 'OFERTAS', href: '/ofertas', isOffer: true },
                                    { label: 'NOSOTROS', href: '/about' },
                                    { label: 'CONTACTO', href: '/contact' }
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={onClose}
                                        className="flex items-center justify-between text-base font-bold tracking-widest transition-colors border-b border-gray-100 pb-3 py-1 group"
                                    >
                                        <span className={item.isOffer ? 'text-salmon font-extrabold' : 'text-gray-700 group-hover:text-black'}>
                                            {item.label}
                                        </span>
                                        {item.isOffer && (
                                            <span className="bg-salmon text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                                                30% OFF
                                            </span>
                                        )}
                                    </Link>
                                ))}
                            </nav>

                            {/* Footer / Extra Actions */}
                            <div className="mt-auto pt-8 flex flex-col gap-4">
                                <Link href="/account" onClick={onClose} className="flex items-center gap-3 text-gray-600 hover:text-black">
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">Mi Cuenta</span>
                                </Link>
                                <div className="text-xs text-gray-400 mt-4 text-center">
                                    © 2026 Wiggle
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

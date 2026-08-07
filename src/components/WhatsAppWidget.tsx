"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export default function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);

    const whatsappNumber = "593999999999"; // Reemplazar con el número oficial de WhatsApp
    const defaultMessage = encodeURIComponent("¡Hola Wiggle! 🐾 Me gustaría consultar sobre un producto.");

    const handleOpenWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}?text=${defaultMessage}`, "_blank");
    };

    return (
        <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 flex flex-col items-end pointer-events-none">
            
            {/* TOOLTIP ON HOVER OR INITIAL SHOW */}
            <AnimatePresence>
                {showTooltip && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="pointer-events-auto mb-3 bg-white text-slate-800 p-3.5 rounded-2xl shadow-xl border border-gray-100 max-w-[240px] text-xs font-sans relative"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowTooltip(false);
                            }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-200 hover:bg-slate-800 hover:text-white text-gray-600 rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                        
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="font-bold text-[11px] text-emerald-600 uppercase tracking-wider">En línea</span>
                        </div>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            ¿Tienes dudas sobre la talla o un producto? ¡Escríbenos por WhatsApp! 🐾
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EXPANDABLE CHAT POPUP */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="pointer-events-auto mb-4 w-[90vw] max-w-[320px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden font-sans"
                    >
                        {/* Popup Header */}
                        <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg border border-white/20">
                                    🐾
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-sm leading-snug">Wiggle Atención al Cliente</h4>
                                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        <span>Responde habitualmente en minutos</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Popup Body */}
                        <div className="p-4 bg-[#E5DDD5]/30 space-y-3">
                            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm max-w-[85%] border border-gray-100/80">
                                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                                    ¡Hola! 👋 Bienvenido a Wiggle. ¿En qué podemos ayudarte hoy con tu mascota?
                                </p>
                                <span className="text-[9px] text-slate-400 block text-right mt-1 font-medium">Ahora</span>
                            </div>
                        </div>

                        {/* Popup Action Button */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <button
                                onClick={handleOpenWhatsApp}
                                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                                <span>Iniciar Chat por WhatsApp</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOATING BUTTON */}
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowTooltip(false);
                }}
                className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl shadow-emerald-600/40 flex items-center justify-center transition-colors relative group focus:outline-none"
                aria-label="Contactar por WhatsApp"
            >
                {/* Pulse Ring */}
                <span className="animate-ping absolute inset-0 rounded-full bg-[#25D366] opacity-30"></span>

                {/* SVG WhatsApp Logo */}
                {isOpen ? (
                    <X className="w-7 h-7 relative z-10 stroke-[2.5]" />
                ) : (
                    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9 fill-current relative z-10">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                )}
            </motion.button>

        </div>
    );
}

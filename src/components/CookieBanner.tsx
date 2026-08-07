"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("wiggle_cookie_consent");
        if (!consent) {
            // Small delay for better UX on entry
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        if (!acceptedPrivacy) return; // Enforce checkbox
        localStorage.setItem("wiggle_cookie_consent", "accepted");
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem("wiggle_cookie_consent", "rejected");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center relative">

                        {/* Close generic (Reject shortcut or minimize) */}
                        <button
                            onClick={handleReject}
                            className="absolute top-4 right-4 text-gray-300 hover:text-black transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex-1 space-y-4">
                            <h3 className="font-serif text-lg font-bold text-slate-900">Configuración de Cookies</h3>
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                                En Wiggle utilizamos cookies propias y de terceros para garantizar el correcto funcionamiento del sitio, analizar la navegación y, con tu consentimiento, ofrecerte contenidos y experiencias personalizadas.
                                <br /><br />
                                Puedes aceptar todas las cookies, rechazarlas o configurarlas según tus preferencias.
                                <br />
                                <a href="/privacy" className="underline hover:text-salmon transition-colors">Consulta nuestra Política de Privacidad y Cookies para más información.</a>
                            </p>

                            {/* Mandatory Checkbox */}
                            <label className="flex items-start gap-3 cursor-pointer group mt-4">
                                <div className={`w-5 h-5 border rounded-md flex-shrink-0 flex items-center justify-center transition-all duration-300 ${acceptedPrivacy ? 'bg-salmon border-salmon' : 'border-gray-300 bg-white group-hover:border-salmon'}`}>
                                    {acceptedPrivacy && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={acceptedPrivacy}
                                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                                />
                                <span className={`text-[10px] md:text-xs leading-tight transition-colors ${acceptedPrivacy ? 'text-gray-900' : 'text-gray-400'}`}>
                                    He leído y acepto la Política de Privacidad y el tratamiento de mis datos personales, conforme a lo establecido por Wiggle, para las finalidades descritas en dicho documento.
                                </span>
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 w-full md:w-auto min-w-[200px]">
                            <button
                                onClick={handleAccept}
                                disabled={!acceptedPrivacy}
                                className={`w-full py-3 px-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg 
                                    ${acceptedPrivacy
                                        ? 'bg-salmon text-white hover:bg-slate-900 hover:shadow-xl hover:-translate-y-0.5'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                    }`}
                            >
                                Aceptar Todas
                            </button>

                            <button
                                onClick={handleReject}
                                className="w-full py-3 px-6 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-slate-900 transition-colors bg-transparent hover:bg-gray-50 border border-transparent hover:border-gray-200"
                            >
                                Rechazar
                            </button>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

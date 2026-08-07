"use client";

import React from "react";
import { Mail, MessageCircle, ArrowRight, Instagram, Facebook, Linkedin, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            
            {/* Top Grid Section: Info & Form */}
            <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                
                {/* Left Column: Info & Editorial */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    {/* Title - Clean Playfair Solid */}
                    <h1 className="font-serif text-5xl lg:text-6xl text-slate-900 font-semibold tracking-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                        Ponte en Contacto
                    </h1>

                    {/* Subtitle - Sans */}
                    <p className="font-sans text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
                        Estamos aquí para ayudarte a encontrar el accesorio perfecto. Tu experiencia Wiggle debe ser tan excepcional como nuestros productos.
                    </p>

                    {/* Contact Details List */}
                    <div className="space-y-6 pt-4">
                        
                        {/* Address */}
                        <a href="https://maps.google.com/?q=Checoslovaquia+y+Austria,+Edificio+lombardia.+Local+%233" target="_blank" className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 border border-salmon/20 rounded-full flex items-center justify-center bg-salmon/5 group-hover:bg-salmon group-hover:text-white transition-all duration-300 shadow-sm text-salmon flex-shrink-0 mt-1">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-sans text-sm font-bold text-slate-800 tracking-wide">Dirección</h3>
                                <p className="text-gray-500 text-sm group-hover:text-salmon transition-colors mt-0.5">Checoslovaquia y Austria, Edificio lombardia. Local #3</p>
                            </div>
                        </a>

                        {/* Email */}
                        <a href="mailto:info@wiggle.shop" className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 border border-salmon/20 rounded-full flex items-center justify-center bg-salmon/5 group-hover:bg-salmon group-hover:text-white transition-all duration-300 shadow-sm text-salmon flex-shrink-0 mt-1">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-sans text-sm font-bold text-slate-800 tracking-wide">Email</h3>
                                <p className="text-gray-500 text-sm group-hover:text-salmon transition-colors mt-0.5">info@wiggle.shop</p>
                            </div>
                        </a>

                        {/* WhatsApp */}
                        <a href="https://wa.me/593984598487" target="_blank" className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 border border-salmon/20 rounded-full flex items-center justify-center bg-salmon/5 group-hover:bg-salmon group-hover:text-white transition-all duration-300 shadow-sm text-salmon flex-shrink-0 mt-1">
                                <MessageCircle className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-sans text-sm font-bold text-slate-800 tracking-wide">WhatsApp</h3>
                                <p className="text-gray-500 text-sm group-hover:text-salmon transition-colors mt-0.5">+593 98 459 8487</p>
                            </div>
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/wigglepet.shop/" target="_blank" className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 border border-salmon/20 rounded-full flex items-center justify-center bg-salmon/5 group-hover:bg-salmon group-hover:text-white transition-all duration-300 shadow-sm text-salmon flex-shrink-0 mt-1">
                                <Instagram className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-sans text-sm font-bold text-slate-800 tracking-wide">Instagram</h3>
                                <p className="text-gray-500 text-sm group-hover:text-salmon transition-colors mt-0.5">@wigglepet.shop</p>
                            </div>
                        </a>

                        {/* Facebook */}
                        <a href="https://www.facebook.com/profile.php?id=61584279111796" target="_blank" className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 border border-salmon/20 rounded-full flex items-center justify-center bg-salmon/5 group-hover:bg-salmon group-hover:text-white transition-all duration-300 shadow-sm text-salmon flex-shrink-0 mt-1">
                                <Facebook className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-sans text-sm font-bold text-slate-800 tracking-wide">Facebook</h3>
                                <p className="text-gray-500 text-sm group-hover:text-salmon transition-colors mt-0.5">Wiggle Pet Shop</p>
                            </div>
                        </a>

                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/company/wiggle-shop/" target="_blank" className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 border border-salmon/20 rounded-full flex items-center justify-center bg-salmon/5 group-hover:bg-salmon group-hover:text-white transition-all duration-300 shadow-sm text-salmon flex-shrink-0 mt-1">
                                <Linkedin className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-sans text-sm font-bold text-slate-800 tracking-wide">LinkedIn</h3>
                                <p className="text-gray-500 text-sm group-hover:text-salmon transition-colors mt-0.5">Wiggle Shop</p>
                            </div>
                        </a>

                        {/* TikTok */}
                        <a href="https://www.tiktok.com/@wiggle_shop" target="_blank" className="flex items-start gap-4 group cursor-pointer">
                            <div className="w-10 h-10 border border-salmon/20 rounded-full flex items-center justify-center bg-salmon/5 group-hover:bg-salmon group-hover:text-white transition-all duration-300 shadow-sm text-salmon flex-shrink-0 mt-1">
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="none"
                                >
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.62-1.12v8.76c-.52 4.03-3.79 6.84-7.69 6.6-4.1-.3-7.14-3.78-6.79-7.85.35-4.12 4-7.19 8.11-6.79.61.05 1.19.19 1.75.39v4.3c-2.35-1.1-5.18.06-5.83 2.45-.63 2.37.99 4.8 3.4 5.27 2.46.46 4.77-1.14 5.39-3.48.06-.23.1-.47.13-.71v-12.8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-sans text-sm font-bold text-slate-800 tracking-wide">TikTok</h3>
                                <p className="text-gray-500 text-sm group-hover:text-salmon transition-colors mt-0.5">@wiggle_shop</p>
                            </div>
                        </a>
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white w-full"
                >
                    <form className="space-y-8">
                        {/* Nombre */}
                        <div className="group relative">
                            <label className="block font-sans text-xs font-bold text-slate-800 mb-1 uppercase tracking-wide">
                                Nombre <span className="text-salmon">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Tu Nombre"
                                required
                                className="w-full border-b border-gray-200 py-2.5 text-slate-900 placeholder:text-gray-300 focus:outline-none focus:border-salmon transition-colors font-sans text-base bg-transparent"
                            />
                        </div>

                        {/* Correo electrónico */}
                        <div className="group relative">
                            <label className="block font-sans text-xs font-bold text-slate-800 mb-1 uppercase tracking-wide">
                                Correo electrónico <span className="text-salmon">*</span>
                            </label>
                            <input
                                type="email"
                                placeholder="hola@ejemplo.com"
                                required
                                className="w-full border-b border-gray-200 py-2.5 text-slate-900 placeholder:text-gray-300 focus:outline-none focus:border-salmon transition-colors font-sans text-base bg-transparent"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="group relative">
                            <label className="block font-sans text-xs font-bold text-slate-800 mb-1 uppercase tracking-wide">
                                Teléfono <span className="text-salmon">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="099 999 9999"
                                required
                                className="w-full border-b border-gray-200 py-2.5 text-slate-900 placeholder:text-gray-300 focus:outline-none focus:border-salmon transition-colors font-sans text-base bg-transparent"
                            />
                        </div>

                        {/* Asunto */}
                        <div className="group relative">
                            <label className="block font-sans text-xs font-bold text-slate-800 mb-1 uppercase tracking-wide">
                                Asunto <span className="text-salmon">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    required
                                    className="w-full border-b border-gray-200 py-2.5 text-slate-500 focus:outline-none focus:border-salmon transition-colors font-sans text-base bg-transparent appearance-none cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-gray-300">Selecciona un motivo</option>
                                    <option value="consulta">Consulta sobre productos</option>
                                    <option value="proveedor">Oferta de Proveedor</option>
                                    <option value="reclamos">Reclamos de productos</option>
                                    <option value="otros">Otros</option>
                                </select>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Mensaje */}
                        <div className="group relative">
                            <label className="block font-sans text-xs font-bold text-slate-800 mb-1 uppercase tracking-wide">
                                Mensaje <span className="text-salmon">*</span>
                            </label>
                            <textarea
                                required
                                rows={3}
                                placeholder="Escribe tu mensaje..."
                                className="w-full border-b border-gray-200 py-2.5 text-slate-900 placeholder:text-gray-300 focus:outline-none focus:border-salmon transition-colors font-sans text-base bg-transparent resize-none"
                            />
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-3 pt-2">
                            {/* Data Protection Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="data-protection"
                                    required
                                    className="mt-1 w-4 h-4 text-salmon border-gray-300 rounded focus:ring-salmon accent-salmon cursor-pointer"
                                />
                                <label htmlFor="data-protection" className="text-sm text-gray-500 leading-normal font-sans cursor-pointer select-none">
                                    Consentimiento de protección de datos personales
                                </label>
                            </div>

                            {/* Privacy Policy Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="privacy-policy"
                                    required
                                    className="mt-1 w-4 h-4 text-salmon border-gray-300 rounded focus:ring-salmon accent-salmon cursor-pointer"
                                />
                                <label htmlFor="privacy-policy" className="text-sm text-gray-500 leading-normal font-sans cursor-pointer select-none">
                                    Estoy de acuerdo con la <a href="/privacy" className="text-salmon underline underline-offset-2 hover:text-black transition-colors">Política de Privacidad</a> de Wiggle Shop.
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-[#EFA899] text-white py-4 rounded font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-300 hover:bg-neutral-900 active:scale-95 shadow-md hover:shadow-lg"
                            >
                                Enviar
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Bottom Section: Full Width Google Map */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full h-[450px] relative border-t border-gray-100 mt-8"
            >
                <iframe
                    title="Ubicación Wiggle Pet Shop"
                    src="https://maps.google.com/maps?q=Checoslovaquia%20y%20Austria%2C%20Edificio%20lombardia.%20Local%20%233&t=m&z=15&output=embed&iwloc=near"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full grayscale-[15%] contrast-[110%]"
                />
            </motion.div>
            
        </div>
    );
}

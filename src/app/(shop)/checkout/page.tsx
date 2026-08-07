"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, ShieldCheck, Truck, CreditCard, Building2, CheckCircle2, Copy, FileText, ChevronRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const PROVINCES = [
    "Pichincha",
    "Guayas",
    "Azuay",
    "Manabí",
    "El Oro",
    "Loja",
    "Tungurahua",
    "Imbabura",
    "Santo Domingo de los Tsáchilas",
    "Los Ríos",
    "Chimborazo",
    "Cotopaxi",
    "Esmeraldas",
    "Santa Elena",
    "Otra provincia"
];

export default function CheckoutPage() {
    const { items, subtotal, shipping, discount, total, clearCart } = useCart();

    // Form state
    const [companyType, setCompanyType] = useState("Persona Natural");
    const [docType, setDocType] = useState("Cédula");
    const [identification, setIdentification] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [country] = useState("Ecuador");
    const [streetAddress, setStreetAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [province, setProvince] = useState("Pichincha");
    const [city, setCity] = useState("Quito");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [orderNotes, setOrderNotes] = useState("");
    
    const [createAccount, setCreateAccount] = useState(false);
    const [shipToDifferent, setShipToDifferent] = useState(false);
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [formError, setFormError] = useState("");

    // Payment Gateway Selection
    const [paymentMethod, setPaymentMethod] = useState<"pagomedios" | "transfer">("pagomedios");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState<any>(null);
    const [copiedBank, setCopiedBank] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");

        if (!firstName || !lastName || !identification || !streetAddress || !phone || !email) {
            setFormError("Por favor completa los campos obligatorios (*) para continuar.");
            return;
        }

        if (!termsAgreed) {
            setFormError("Debes aceptar los términos y la política de privacidad.");
            return;
        }

        setIsSubmitting(true);

        const orderId = `WIG-${Math.floor(100000 + Math.random() * 900000)}`;

        setTimeout(() => {
            setIsSubmitting(false);
            const orderData = {
                orderId,
                date: new Date().toLocaleDateString("es-EC", { day: "numeric", month: "long", year: "numeric" }),
                customer: { firstName, lastName, email, phone, identification, streetAddress, province, city },
                items: [...items],
                subtotal,
                shipping,
                discount,
                total,
                paymentMethod
            };
            setOrderPlaced(orderData);
            clearCart();
        }, 1500);
    };

    const copyBankDetails = () => {
        navigator.clipboard.writeText("Banco Pichincha - Cta Cte: 2100298374 - RUC: 1793148520001 - Wiggle Pet Lifestyle");
        setCopiedBank(true);
        setTimeout(() => setCopiedBank(false), 3000);
    };

    // ORDER CONFIRMED SCREEN
    if (orderPlaced) {
        return (
            <div className="bg-[#FAFAFA] min-h-screen py-16 px-6 font-sans">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-lg text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>

                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-600 block mb-2">
                        ¡PEDIDO RECIBIDO CON ÉXITO!
                    </span>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'var(--font-domine)' }}>
                        Gracias por tu compra, {orderPlaced.customer.firstName}
                    </h1>
                    <p className="text-slate-500 text-sm mb-8">
                        Número de Pedido: <span className="font-mono font-bold text-slate-900">{orderPlaced.orderId}</span>
                    </p>

                    {/* PAYMENT SPECIFIC DETAILS */}
                    {orderPlaced.paymentMethod === 'pagomedios' ? (
                        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl mb-8 text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                                    Pago Procesado por Pagomedios (Abitmedia)
                                </h3>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Tu transacción ha sido autorizada de forma segura. En breve recibirás un correo de confirmación a <span className="font-bold text-slate-900">{orderPlaced.customer.email}</span> con la factura electrónica y el número de rastreo.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-amber-50/80 border border-amber-200 p-6 rounded-2xl mb-8 text-left">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                                🏦 Instrucciones para Transferencia Bancaria
                            </h3>
                            <p className="text-xs text-slate-600 mb-4">
                                Por favor realiza la transferencia bancaria por el total de <span className="font-bold text-slate-900 text-sm">${orderPlaced.total.toFixed(2).replace('.', ',')}</span> usando estos datos:
                            </p>
                            
                            <div className="bg-white p-4 rounded-xl border border-amber-200 text-xs space-y-1.5 font-mono text-slate-800">
                                <div><span className="text-slate-400 font-sans">Banco:</span> <strong>Banco Pichincha</strong></div>
                                <div><span className="text-slate-400 font-sans">Tipo de Cuenta:</span> <strong>Cuenta Corriente</strong></div>
                                <div><span className="text-slate-400 font-sans">Nº de Cuenta:</span> <strong>2100298374</strong></div>
                                <div><span className="text-slate-400 font-sans">Titular:</span> <strong>Wiggle Pet Lifestyle S.A.S.</strong></div>
                                <div><span className="text-slate-400 font-sans">RUC:</span> <strong>1793148520001</strong></div>
                                <div><span className="text-slate-400 font-sans">Enviar comprobante a:</span> <strong>pagos@wiggle.shop</strong></div>
                            </div>

                            <button
                                onClick={copyBankDetails}
                                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#3D6A66] hover:underline"
                            >
                                <Copy className="w-4 h-4" />
                                {copiedBank ? "¡Datos copiados al portapapeles!" : "Copiar datos bancarios"}
                            </button>
                        </div>
                    )}

                    {/* ORDER ITEMS SUMMARY */}
                    <div className="border-t border-b border-gray-100 py-6 mb-8 text-left space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Resumen de Items</h4>
                        {orderPlaced.items.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center text-xs text-slate-700">
                                <span>{item.name} x{item.quantity}</span>
                                <span className="font-bold text-slate-900">${(item.numericPrice * item.quantity).toFixed(2).replace('.', ',')}</span>
                            </div>
                        ))}
                        <div className="pt-2 flex justify-between items-center text-sm font-bold text-slate-900">
                            <span>Total Pagado:</span>
                            <span className="text-base font-serif" style={{ fontFamily: 'var(--font-domine)' }}>
                                ${orderPlaced.total.toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="inline-block px-10 py-4 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-salmon transition-colors shadow-md"
                    >
                        VOLVER A LA TIENDA
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAFAFA] min-h-screen pb-24 font-sans">
            
            {/* TOP HEADER & BREADCRUMBS */}
            <div className="bg-[#3D6A66] text-white py-12 px-6 text-center relative">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/80 block mb-2">
                        PROCESO DE CHECKOUT
                    </span>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                        DETALLES DE FACTURACIÓN Y PAGO
                    </h1>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
                
                <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-salmon tracking-wider uppercase mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Volver al Carrito
                </Link>

                {formError && (
                    <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-red-600 text-xs font-bold mb-8 flex items-center gap-2">
                        ⚠️ {formError}
                    </div>
                )}

                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        
                        {/* LEFT COLUMN: BILLING & SHIPPING FORM */}
                        <div className="col-span-1 lg:col-span-7 bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                            
                            <h2 className="font-serif text-2xl font-bold text-slate-900 pb-4 border-b border-gray-100 tracking-wide" style={{ fontFamily: 'var(--font-domine)' }}>
                                Detalles de Facturación
                            </h2>

                            <div className="space-y-5">
                                
                                {/* 1. Tipo de Empresa */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                        Tipo de empresa <span className="text-salmon">*</span>
                                    </label>
                                    <select
                                        value={companyType}
                                        onChange={(e) => setCompanyType(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 font-medium outline-none focus:border-salmon focus:bg-white transition-all cursor-pointer"
                                    >
                                        <option value="Persona Natural">Persona Natural</option>
                                        <option value="Sociedad / Empresa">Sociedad / Empresa</option>
                                    </select>
                                </div>

                                {/* 2. Tipo de documento & Identificación */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                            Tipo de documento <span className="text-salmon">*</span>
                                        </label>
                                        <select
                                            value={docType}
                                            onChange={(e) => setDocType(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 font-medium outline-none focus:border-salmon focus:bg-white transition-all cursor-pointer"
                                        >
                                            <option value="Cédula">Cédula de Ciudadanía</option>
                                            <option value="RUC">RUC</option>
                                            <option value="Pasaporte">Pasaporte</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                            Identificación <span className="text-salmon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={identification}
                                            onChange={(e) => setIdentification(e.target.value)}
                                            placeholder="Ingresa Cédula o RUC"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* 3. Nombre & Apellidos */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                            Nombre <span className="text-salmon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Nombre"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                            Apellidos <span className="text-salmon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Apellidos"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* 4. Nombre de la empresa (opcional) */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                        Nombre de la empresa (opcional)
                                    </label>
                                    <input
                                        type="text"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="Nombre de la empresa"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all"
                                    />
                                </div>

                                {/* 5. País / Región */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                        País / Región <span className="text-salmon">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        value="Ecuador 🇪🇨"
                                        className="w-full bg-gray-100 border border-gray-200 rounded-xl p-3.5 text-xs font-bold text-slate-700 outline-none cursor-not-allowed"
                                    />
                                </div>

                                {/* 6. Dirección de la calle */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                        Dirección de la calle <span className="text-salmon">*</span>
                                    </label>
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            required
                                            value={streetAddress}
                                            onChange={(e) => setStreetAddress(e.target.value)}
                                            placeholder="Nombre de la calle y número de la casa"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all"
                                        />
                                        <input
                                            type="text"
                                            value={apartment}
                                            onChange={(e) => setApartment(e.target.value)}
                                            placeholder="Apartamento, habitación, suite, etc. (opcional)"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* 7. Provincia & Ciudad */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                            Provincia <span className="text-salmon">*</span>
                                        </label>
                                        <select
                                            value={province}
                                            onChange={(e) => setProvince(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 font-medium outline-none focus:border-salmon focus:bg-white transition-all cursor-pointer"
                                        >
                                            {PROVINCES.map((prov) => (
                                                <option key={prov} value={prov}>{prov}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                            Ciudad / Cantón <span className="text-salmon">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Ciudad"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* 8. Teléfono & Correo electrónico */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                            Teléfono <span className="text-salmon">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Ej: 0991234567"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                            Dirección de correo electrónico <span className="text-salmon">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="correo@ejemplo.com"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Checkboxes */}
                                <div className="pt-2 space-y-3 border-t border-gray-100">
                                    <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={createAccount}
                                            onChange={(e) => setCreateAccount(e.target.checked)}
                                            className="w-4 h-4 accent-salmon rounded"
                                        />
                                        <span>¿Crear una cuenta en Wiggle?</span>
                                    </label>
                                    <label className="flex items-center gap-3 text-xs text-slate-700 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={shipToDifferent}
                                            onChange={(e) => setShipToDifferent(e.target.checked)}
                                            className="w-4 h-4 accent-salmon rounded"
                                        />
                                        <span>¿Enviar a otra dirección?</span>
                                    </label>
                                </div>

                                {/* Notas del pedido */}
                                <div className="pt-2">
                                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                                        Notas del pedido (opcional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={orderNotes}
                                        onChange={(e) => setOrderNotes(e.target.value)}
                                        placeholder="Notas sobre tu pedido, por ejemplo, indicaciones especiales para la entrega o casa de referencia."
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs text-slate-800 outline-none focus:border-salmon focus:bg-white transition-all resize-none"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* RIGHT COLUMN: ORDER SUMMARY & PAGOMEDIOS PAYMENT */}
                        <div className="col-span-1 lg:col-span-5 space-y-6 sticky top-24">
                            
                            {/* TU PEDIDO SUMMARY CARD */}
                            <div className="bg-white rounded-3xl border-2 border-[#EFA899]/40 p-6 md:p-8 shadow-sm">
                                <h3 className="font-serif text-xl font-bold text-slate-900 pb-4 border-b border-gray-100 tracking-wide" style={{ fontFamily: 'var(--font-domine)' }}>
                                    Tu Pedido
                                </h3>

                                <div className="divide-y divide-gray-100 my-4 text-xs md:text-sm">
                                    {items.map((item) => (
                                        <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <span className="font-bold text-slate-900 block truncate">{item.name}</span>
                                                <span className="text-slate-400 text-xs">Cantidad: {item.quantity}</span>
                                            </div>
                                            <span className="font-serif font-bold text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>
                                                ${(item.numericPrice * item.quantity).toFixed(2).replace('.', ',')}
                                            </span>
                                        </div>
                                    ))}

                                    <div className="py-3 flex justify-between items-center text-slate-600">
                                        <span>Subtotal</span>
                                        <span className="font-bold text-slate-900">${subtotal.toFixed(2).replace('.', ',')}</span>
                                    </div>

                                    <div className="py-3 flex justify-between items-center text-slate-600">
                                        <span>Envío</span>
                                        <span className="font-bold text-slate-900">
                                            {shipping === 0 ? "Flexible Shipping: GRATIS" : `Flexible Shipping: $${shipping.toFixed(2).replace('.', ',')}`}
                                        </span>
                                    </div>

                                    {discount > 0 && (
                                        <div className="py-3 flex justify-between items-center text-salmon font-semibold">
                                            <span>Descuento</span>
                                            <span>-${discount.toFixed(2).replace('.', ',')}</span>
                                        </div>
                                    )}

                                    <div className="py-4 flex justify-between items-baseline pt-4">
                                        <div>
                                            <span className="font-serif text-lg font-bold text-slate-900 block" style={{ fontFamily: 'var(--font-domine)' }}>
                                                Total
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                (incluye ${(total * 0.15).toFixed(2).replace('.', ',')} IVA 15%)
                                            </span>
                                        </div>
                                        <span className="font-serif text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>
                                            ${total.toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                </div>

                                {/* PAYMENT METHODS SELECTOR */}
                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    
                                    {/* METHOD 1: PAGOMEDIOS */}
                                    <div
                                        onClick={() => setPaymentMethod("pagomedios")}
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                            paymentMethod === "pagomedios"
                                                ? "border-[#1D4ED8] bg-blue-50/40 shadow-sm"
                                                : "border-gray-100 hover:border-gray-200 bg-white"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                checked={paymentMethod === "pagomedios"}
                                                onChange={() => setPaymentMethod("pagomedios")}
                                                className="w-4 h-4 accent-blue-600 cursor-pointer"
                                            />
                                            <span className="font-bold text-sm text-slate-900">Pagomedios</span>
                                        </div>

                                        {/* PAGOMEDIOS BRANDING CARD */}
                                        <div className="pl-7 space-y-3">
                                            <div className="bg-white p-3 rounded-xl border border-blue-100 flex flex-col items-center justify-center text-center shadow-xs">
                                                <div className="flex items-center justify-center gap-2 mb-1">
                                                    <div className="bg-[#0A2540] text-white font-extrabold text-xs px-2 py-0.5 rounded tracking-tighter flex items-center gap-1">
                                                        <span>$</span>
                                                        <span className="tracking-widest">PAGOMEDIOS</span>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                                                    powered by Abitmedia / Datafast
                                                </span>
                                            </div>

                                            {/* CREDIT CARD LOGOS */}
                                            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center justify-center gap-2">
                                                <span className="text-[10px] font-bold text-slate-700 border border-slate-300 px-1.5 py-0.5 rounded bg-white">VISA</span>
                                                <span className="text-[10px] font-bold text-slate-700 border border-slate-300 px-1.5 py-0.5 rounded bg-white">Mastercard</span>
                                                <span className="text-[10px] font-bold text-slate-700 border border-slate-300 px-1.5 py-0.5 rounded bg-white">Diners</span>
                                                <span className="text-[10px] font-bold text-slate-700 border border-slate-300 px-1.5 py-0.5 rounded bg-white">AMEX</span>
                                            </div>

                                            <p className="text-xs text-slate-600 leading-relaxed font-light">
                                                Pagomedios es una solución completa para pagos en línea. Seguro, fácil y rápido.
                                            </p>
                                        </div>
                                    </div>

                                    {/* METHOD 2: TRANSFERENCIA BANCARIA */}
                                    <div
                                        onClick={() => setPaymentMethod("transfer")}
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                            paymentMethod === "transfer"
                                                ? "border-[#3D6A66] bg-[#3D6A66]/5 shadow-sm"
                                                : "border-gray-100 hover:border-gray-200 bg-white"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                checked={paymentMethod === "transfer"}
                                                onChange={() => setPaymentMethod("transfer")}
                                                className="w-4 h-4 accent-[#3D6A66] cursor-pointer"
                                            />
                                            <span className="font-bold text-sm text-slate-900">Transferencia bancaria directa</span>
                                        </div>

                                        {paymentMethod === "transfer" && (
                                            <div className="pl-7 pt-3">
                                                <p className="text-xs text-slate-600 leading-relaxed">
                                                    Realiza tu pago directamente en nuestra cuenta bancaria. Usa el ID de tu pedido como referencia de pago.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                </div>

                                {/* PRIVACY POLICY AGREEMENT */}
                                <div className="pt-4 border-t border-gray-100 space-y-3">
                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                        Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web y otros propósitos descritos en nuestra <Link href="/privacy" className="text-salmon underline font-medium">política de privacidad</Link>.
                                    </p>

                                    <label className="flex items-start gap-3 text-xs text-slate-800 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={termsAgreed}
                                            onChange={(e) => setTermsAgreed(e.target.checked)}
                                            className="w-4 h-4 accent-salmon rounded mt-0.5"
                                        />
                                        <span className="font-medium">
                                            Estoy de acuerdo con la política de privacidad de Wiggle Shop <span className="text-salmon">*</span>
                                        </span>
                                    </label>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-6 bg-black hover:bg-salmon text-white h-14 rounded-2xl text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-300 shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-[#3D6A66] border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4 text-salmon" />
                                            <span>REALIZAR EL PEDIDO</span>
                                        </>
                                    )}
                                </button>

                            </div>

                            {/* TRUST BADGES */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 shadow-sm text-xs text-slate-600">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                                    <span>Pagos seguros y encriptación de datos SSL de 256 bits</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Truck className="w-5 h-5 text-[#3D6A66] shrink-0" />
                                    <span>Facturación electrónica enviada a tu correo</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </form>

            </div>
        </div>
    );
}

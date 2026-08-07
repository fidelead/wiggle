"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck, Truck, RotateCcw, Lock, Tag, Check, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const PROVINCES = [
    "Pichincha (Quito)",
    "Guayas (Guayaquil)",
    "Azuay (Cuenca)",
    "Manabí",
    "El Oro",
    "Loja",
    "Tungurahua",
    "Imbabura",
    "Santo Domingo",
    "Los Ríos",
    "Otra provincia"
];

export default function CartPage() {
    const {
        items,
        subtotal,
        shipping,
        discount,
        couponCode,
        total,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart
    } = useCart();

    const [inputCoupon, setInputCoupon] = useState("");
    const [couponError, setCouponError] = useState("");
    const [couponSuccess, setCouponSuccess] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("Pichincha (Quito)");

    const FREE_SHIPPING_THRESHOLD = 50.00;
    const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
    const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

    const handleCouponSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCouponError("");
        setCouponSuccess("");
        if (!inputCoupon.trim()) return;

        const success = applyCoupon(inputCoupon);
        if (success) {
            setCouponSuccess(`¡Cupón "${inputCoupon.toUpperCase()}" aplicado con éxito!`);
            setInputCoupon("");
        } else {
            setCouponError("Código de cupón inválido. Prueba con WIGGLE10 u OFERTA30.");
        }
    };

    const handleWhatsAppOrder = () => {
        const orderText = items.map(item => `- ${item.name} (${item.quantity}x): ${item.price}`).join('%0A');
        const message = `¡Hola Wiggle! 🐾 Quisiera proceder con mi pedido:%0A%0A${orderText}%0A%0A*Subtotal:* $${subtotal.toFixed(2).replace('.', ',')}%0A*Envío (${selectedProvince}):* ${shipping === 0 ? 'GRATIS' : '$' + shipping.toFixed(2).replace('.', ',')}%0A${discount > 0 ? '*Descuento:* -$' + discount.toFixed(2).replace('.', ',') + '%0A' : ''}*Total a pagar:* $${total.toFixed(2).replace('.', ',')}`;
        window.open(`https://wa.me/593999999999?text=${message}`, '_blank');
    };

    if (items.length === 0) {
        return (
            <div className="bg-[#FAFAFA] min-h-screen py-24 px-6 flex flex-col items-center justify-center text-center font-sans">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center"
                >
                    <div className="w-20 h-20 bg-salmon/10 text-salmon rounded-full flex items-center justify-center mb-6">
                        <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-domine)' }}>
                        Tu carrito está vacío
                    </h1>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                        Explora nuestra curaduría exclusiva de alimentos, ropa y accesorios de alta gama para tu mascota.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#3D6A66] hover:bg-[#2D524E] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md hover:scale-105"
                    >
                        <span>IR A LA TIENDA</span>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-[#FAFAFA] min-h-screen pb-24 font-sans">
            
            {/* HERO HEADER */}
            <div className="bg-[#3D6A66] text-white py-14 px-6 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/80 block mb-2">
                        COMPRA SEGURA
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold mb-3 tracking-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                        TU CARRITO DE COMPRAS
                    </h1>
                    <p className="text-xs md:text-sm text-white/85 tracking-widest uppercase font-light max-w-lg mx-auto">
                        Cuidado, nutrición y estética luxury para tu compañero de vida.
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
                
                {/* BREADCRUMB */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-salmon tracking-wider uppercase transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Seguir Comprando
                    </Link>
                    <button
                        onClick={clearCart}
                        className="text-xs font-semibold text-slate-400 hover:text-red-500 underline transition-colors"
                    >
                        Vaciar Carrito
                    </button>
                </div>

                {/* FREE SHIPPING PROGRESS BAR */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8 shadow-sm">
                    <div className="flex items-center justify-between text-xs md:text-sm font-bold text-slate-800 mb-2">
                        <span className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-salmon" />
                            {amountNeededForFreeShipping > 0 ? (
                                <>Agrega <span className="text-salmon">${amountNeededForFreeShipping.toFixed(2).replace('.', ',')}</span> más para obtener <span className="uppercase text-salmon">ENVÍO GRATIS</span></>
                            ) : (
                                <span className="text-[#3D6A66] font-extrabold uppercase">¡Felicidades! Tienes ENVÍO GRATIS a todo el país 🎉</span>
                            )}
                        </span>
                        <span className="text-slate-400 font-medium">{Math.round(progressToFreeShipping)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressToFreeShipping}%` }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-salmon to-[#3D6A66] rounded-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* LEFT COLUMN: ITEM LIST & COUPONS */}
                    <div className="col-span-1 lg:col-span-8 space-y-6">
                        
                        {/* ITEM LIST TABLE CONTAINER */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/80 border-b border-gray-100 text-xs font-bold tracking-widest text-slate-500 uppercase">
                                <div className="col-span-6">Producto</div>
                                <div className="col-span-2 text-center">Precio</div>
                                <div className="col-span-2 text-center">Cantidad</div>
                                <div className="col-span-2 text-right">Subtotal</div>
                            </div>

                            <div className="divide-y divide-gray-100">
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group"
                                        >
                                            {/* Product Info */}
                                            <div className="md:col-span-6 flex items-center gap-4">
                                                <div className="relative w-20 h-20 rounded-2xl bg-[#FDFCF8] border border-gray-100 flex-shrink-0 overflow-hidden">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-contain p-2"
                                                        sizes="80px"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    {item.category && (
                                                        <span className="text-[10px] font-extrabold tracking-widest text-salmon uppercase block mb-0.5">
                                                            {item.category}
                                                        </span>
                                                    )}
                                                    <h3 className="font-serif text-sm md:text-base text-slate-900 font-bold leading-snug line-clamp-2" style={{ fontFamily: 'var(--font-domine)' }}>
                                                        {item.name}
                                                    </h3>
                                                    {item.sku && (
                                                        <span className="text-[11px] text-slate-400 font-mono block mt-1">
                                                            SKU: {item.sku}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="md:col-span-2 flex md:justify-center items-center justify-between text-xs md:text-sm font-semibold text-slate-700">
                                                <span className="md:hidden text-slate-400">Precio:</span>
                                                <span>${item.numericPrice.toFixed(2).replace('.', ',')}</span>
                                            </div>

                                            {/* Quantity Control */}
                                            <div className="md:col-span-2 flex md:justify-center items-center justify-between">
                                                <span className="md:hidden text-xs text-slate-400 font-semibold">Cantidad:</span>
                                                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-black hover:bg-white rounded-lg transition-colors"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold text-slate-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-black hover:bg-white rounded-lg transition-colors"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Line Subtotal & Delete */}
                                            <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3">
                                                <span className="font-serif text-sm md:text-base font-bold text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>
                                                    ${(item.numericPrice * item.quantity).toFixed(2).replace('.', ',')}
                                                </span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                                    title="Eliminar producto"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* COUPON CARD */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                            <form onSubmit={handleCouponSubmit} className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={inputCoupon}
                                        onChange={(e) => setInputCoupon(e.target.value)}
                                        placeholder="Código de cupón (ej: WIGGLE10, OFERTA30)..."
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-salmon outline-none transition-all uppercase tracking-wider"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#3D6A66] hover:bg-[#2D524E] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-95 shrink-0"
                                >
                                    Aplicar Cupón
                                </button>
                            </form>

                            {couponError && (
                                <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                                    ⚠️ {couponError}
                                </p>
                            )}

                            {couponCode && (
                                <div className="mt-3 flex items-center justify-between bg-salmon/10 border border-salmon/30 p-3 rounded-xl">
                                    <span className="text-xs font-bold text-salmon flex items-center gap-1.5">
                                        <Check className="w-4 h-4" /> Cupón "{couponCode}" activo
                                    </span>
                                    <button
                                        onClick={removeCoupon}
                                        className="text-xs font-bold text-slate-500 hover:text-red-500 underline"
                                    >
                                        Quitar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TOTALS SUMMARY & CHECKOUT */}
                    <div className="col-span-1 lg:col-span-4 space-y-6 sticky top-28">
                        
                        <div className="bg-white rounded-3xl border-2 border-[#EFA899]/40 p-6 md:p-8 shadow-sm transition-all hover:border-salmon/60">
                            <h2 className="font-serif text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-gray-100 tracking-wide" style={{ fontFamily: 'var(--font-domine)' }}>
                                Totales del Carrito
                            </h2>

                            <div className="space-y-4 text-xs md:text-sm">
                                {/* Subtotal */}
                                <div className="flex justify-between items-center text-slate-600">
                                    <span>Subtotal:</span>
                                    <span className="font-serif font-bold text-slate-900 text-base" style={{ fontFamily: 'var(--font-domine)' }}>
                                        ${subtotal.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>

                                {/* Destination Selector */}
                                <div className="pt-2">
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                        Provincia de Envío:
                                    </label>
                                    <select
                                        value={selectedProvince}
                                        onChange={(e) => setSelectedProvince(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-slate-800 font-medium outline-none focus:border-salmon transition-colors cursor-pointer"
                                    >
                                        {PROVINCES.map((prov) => (
                                            <option key={prov} value={prov}>{prov}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Shipping Cost */}
                                <div className="flex justify-between items-center text-slate-600 pt-1">
                                    <span>Envío estimado:</span>
                                    {shipping === 0 ? (
                                        <span className="font-bold text-[#3D6A66] uppercase text-xs">GRATIS</span>
                                    ) : (
                                        <span className="font-bold text-slate-900">${shipping.toFixed(2).replace('.', ',')}</span>
                                    )}
                                </div>

                                {/* Discount Line */}
                                {discount > 0 && (
                                    <div className="flex justify-between items-center text-salmon font-semibold pt-1">
                                        <span>Descuento aplicado:</span>
                                        <span>-${discount.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                )}

                                {/* Total Divider */}
                                <div className="pt-4 border-t border-gray-100 flex items-baseline justify-between">
                                    <div>
                                        <span className="font-serif text-lg font-bold text-slate-900 block" style={{ fontFamily: 'var(--font-domine)' }}>
                                            Total
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-medium block">
                                            (Incluye IVA 15%)
                                        </span>
                                    </div>
                                    <span className="font-serif text-3xl font-extrabold text-slate-900" style={{ fontFamily: 'var(--font-domine)' }}>
                                        ${total.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                            </div>

                            {/* CHECKOUT BUTTON 1: NATIVE CHECKOUT */}
                            <Link href="/checkout" className="block w-full mt-6">
                                <button className="w-full bg-black hover:bg-salmon text-white h-14 rounded-2xl text-xs md:text-sm font-bold tracking-[0.15em] uppercase transition-colors duration-300 shadow-md active:scale-[0.99] flex items-center justify-center gap-2">
                                    <Lock className="w-4 h-4 text-salmon group-hover:text-white" />
                                    <span>PROCEDER AL PAGO</span>
                                </button>
                            </Link>

                            {/* CHECKOUT BUTTON 2: WHATSAPP DIRECT ORDER */}
                            <button
                                onClick={handleWhatsAppOrder}
                                className="w-full mt-3 bg-[#25D366] hover:bg-[#20bd5a] text-white h-12 rounded-2xl text-xs font-bold tracking-wider uppercase transition-colors duration-300 shadow-sm flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4 fill-white" />
                                <span>PEDIR POR WHATSAPP</span>
                            </button>

                        </div>

                        {/* TRUST BADGES */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm text-xs text-slate-600">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-salmon/10 text-salmon rounded-xl shrink-0">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">PAGO 100% SEGURO</h4>
                                    <p className="text-[11px] text-slate-400">Encriptación SSL bancaria garantizada</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#3D6A66]/10 text-[#3D6A66] rounded-xl shrink-0">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">COBERTURA NACIONAL</h4>
                                    <p className="text-[11px] text-slate-400">Envíos a todo el Ecuador en 24-48h</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-salmon/10 text-salmon rounded-xl shrink-0">
                                    <RotateCcw className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">GARANTÍA DE SATISFACCIÓN</h4>
                                    <p className="text-[11px] text-slate-400">Devoluciones sin complicaciones</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

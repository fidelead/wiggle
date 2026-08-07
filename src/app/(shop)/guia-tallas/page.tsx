import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Cómo saber la talla de tu mascota? | Wiggle Shop",
    description: "Guía completa para medir a tu perro o gato en casa y elegir la talla ideal de arnés, collar o ropa en Wiggle.",
};

const SIZE_TABLE = [
    { size: "XS", neck: "20–25 cm", chest: "28–34 cm", weight: "1–3 kg" },
    { size: "S", neck: "25–32 cm", chest: "34–44 cm", weight: "3–6 kg" },
    { size: "M", neck: "32–40 cm", chest: "44–56 cm", weight: "6–12 kg" },
    { size: "L", neck: "40–48 cm", chest: "56–70 cm", weight: "12–22 kg" },
    { size: "XL", neck: "48–60 cm", chest: "70–85 cm", weight: "22–35 kg" }
];

export default function SizeGuidePage() {
    return (
        <div className="bg-white min-h-screen text-slate-800 font-sans">
            
            {/* HERO SECTION - 2 COLUMNS */}
            <section className="py-16 md:py-24 px-6 max-w-[1300px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column Text */}
                    <div className="space-y-6">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-salmon block">
                            GUÍA DE TALLAS
                        </span>
                        <h1
                            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15]"
                            style={{ fontFamily: 'var(--font-domine)' }}
                        >
                            ¿Cómo saber la talla de tu mascota?
                        </h1>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
                            Elegir la talla correcta es clave para que tu mascota se sienta cómoda, segura y libre en cada paseo. En Wiggle queremos ayudarte a encontrar el ajuste ideal para que cada arnés, collar o accesorio se adapte a su cuerpo sin apretar, sin rozar y sin limitar su movimiento.
                        </p>
                        <div>
                            <Link
                                href="/shop"
                                className="inline-block px-8 py-3.5 bg-salmon hover:bg-[#e09788] text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                VER PRODUCTOS
                            </Link>
                        </div>
                    </div>

                    {/* Right Column Image */}
                    <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden">
                        <Image
                            src="https://wiggle.shop/wp-content/uploads/2026/05/ChatGPT-Image-5-may-2026-20_47_25-optimized.png"
                            alt="Perro y gato con arneses Wiggle"
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                </div>
            </section>

            {/* SECTION 1: UNA BUENA TALLA CAMBIA LA EXPERIENCIA */}
            <section className="py-12 md:py-20 px-6 max-w-[1300px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Column Image */}
                    <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-gray-100 shadow-md">
                        <Image
                            src="https://wiggle.shop/wp-content/uploads/2026/05/ChatGPT-Image-5-may-2026-20_55_14-optimized.png"
                            alt="Cinta métrica midiendo pata de perro"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                    {/* Right Column Text */}
                    <div className="space-y-6">
                        <h2
                            className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight"
                            style={{ fontFamily: 'var(--font-domine)' }}
                        >
                            Una buena talla cambia la experiencia
                        </h2>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
                            No todas las mascotas tienen las mismas proporciones, incluso si pertenecen a la misma raza o tienen un peso similar. Por eso, elegir la talla solo por intuición puede llevar a comprar un producto demasiado ajustado o demasiado suelto.
                        </p>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light">
                            Tomar las medidas antes de comprar te ayuda a elegir mejor, evitar cambios innecesarios y asegurarte de que tu mascota disfrute cada salida con comodidad.
                        </p>
                    </div>

                </div>
            </section>

            {/* SECTION 2: ¿QUÉ MEDIDAS NECESITAS? */}
            <section className="py-16 md:py-24 px-6 max-w-[1300px] mx-auto">
                <div className="text-center mb-16">
                    <h2
                        className="font-serif text-3xl md:text-5xl font-bold text-slate-900"
                        style={{ fontFamily: 'var(--font-domine)' }}
                    >
                        ¿Qué medidas necesitas?
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* CARD 1: CUELLO */}
                    <div className="bg-white border border-gray-100 rounded-[24px] p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center">
                        <div className="relative w-full h-44 mb-6">
                            <Image
                                src="https://wiggle.shop/wp-content/uploads/2026/05/ChatGPT_Image_5_may_2026__20_58_14__1___1_-removebg-preview-optimized.png"
                                alt="Medición de cuello"
                                fill
                                className="object-contain"
                                sizes="280px"
                            />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-slate-900 uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-domine)' }}>
                            CUELLO
                        </h3>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                            Mide alrededor del cuello, justo donde normalmente iría el collar. Deja un pequeño margen de comodidad: lo ideal es que puedas introducir uno o dos dedos entre la cinta y el cuello.
                        </p>
                    </div>

                    {/* CARD 2: PECHO */}
                    <div className="bg-white border border-gray-100 rounded-[24px] p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center">
                        <div className="relative w-full h-44 mb-6">
                            <Image
                                src="https://wiggle.shop/wp-content/uploads/2026/05/ChatGPT_Image_5_may_2026__20_58_14__2___1_-removebg-preview-optimized.png"
                                alt="Medición de pecho"
                                fill
                                className="object-contain"
                                sizes="280px"
                            />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-slate-900 uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-domine)' }}>
                            PECHO
                        </h3>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                            Mide la parte más ancha del torso, justo detrás de las patas delanteras. Esta suele ser la medida más importante para elegir un arnés, porque define cómo se ajustará al cuerpo durante el paseo.
                        </p>
                    </div>

                    {/* CARD 3: LARGO DEL CUERPO */}
                    <div className="bg-white border border-gray-100 rounded-[24px] p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center">
                        <div className="relative w-full h-44 mb-6">
                            <Image
                                src="https://wiggle.shop/wp-content/uploads/2026/05/ChatGPT_Image_5_may_2026__20_58_15__3___1_-removebg-preview-optimized.png"
                                alt="Medición de largo del cuerpo"
                                fill
                                className="object-contain"
                                sizes="280px"
                            />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-slate-900 uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-domine)' }}>
                            LARGO DEL CUERPO
                        </h3>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                            Mide desde la base del cuello hasta el inicio de la cola. Esta medida es útil para prendas, chalecos o accesorios que cubren parte del cuerpo.
                        </p>
                    </div>

                    {/* CARD 4: PESO APROXIMADO */}
                    <div className="bg-white border border-gray-100 rounded-[24px] p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center">
                        <div className="relative w-full h-44 mb-6">
                            <Image
                                src="https://wiggle.shop/wp-content/uploads/2026/05/ChatGPT_Image_5_may_2026__20_58_15__4___1_-removebg-preview-optimized.png"
                                alt="Medición de peso aproximado"
                                fill
                                className="object-contain"
                                sizes="280px"
                            />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-slate-900 uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-domine)' }}>
                            PESO APROXIMADO
                        </h3>
                        <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-light">
                            El peso puede servir como referencia, pero no debería ser el único criterio. Dos mascotas con el mismo peso pueden necesitar tallas diferentes según su complexión.
                        </p>
                    </div>

                </div>
            </section>

            {/* SECTION 3: GUÍA RÁPIDA DE TALLAS (TABLA) */}
            <section className="py-12 px-6 max-w-[1100px] mx-auto">
                <div className="text-center mb-10">
                    <h2
                        className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3"
                        style={{ fontFamily: 'var(--font-domine)' }}
                    >
                        Guía rápida de tallas
                    </h2>
                    <div className="w-16 h-[3px] bg-salmon mx-auto rounded-full"></div>
                </div>

                <div className="w-full overflow-x-auto rounded-[24px] border border-gray-100 shadow-md bg-white">
                    <table className="w-full text-center border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-salmon text-white uppercase text-xs tracking-widest font-bold">
                                <th className="py-4 px-6 border-b border-salmon-dark">Talla</th>
                                <th className="py-4 px-6 border-b border-salmon-dark">Cuello</th>
                                <th className="py-4 px-6 border-b border-salmon-dark">Pecho</th>
                                <th className="py-4 px-6 border-b border-salmon-dark">Peso aprox.</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-slate-700 text-sm">
                            {SIZE_TABLE.map((row, idx) => (
                                <tr key={row.size} className={idx % 2 === 0 ? "bg-white" : "bg-salmon/5"}>
                                    <td className="py-4 px-6 font-bold text-slate-900 text-base">{row.size}</td>
                                    <td className="py-4 px-6 font-medium text-slate-700">{row.neck}</td>
                                    <td className="py-4 px-6 font-medium text-slate-700">{row.chest}</td>
                                    <td className="py-4 px-6 font-light text-slate-600">{row.weight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-center text-xs text-slate-500 mt-4 font-light">
                    Esta tabla es orientativa. Revisa siempre las medidas específicas de cada producto antes de comprar.
                </p>
            </section>

            {/* BOTTOM SALMON BANNER */}
            <section className="bg-salmon py-16 md:py-24 px-6 overflow-hidden select-none mt-16">
                <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Left Text Column */}
                    <div className="text-white space-y-6">
                        <h2
                            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-wider"
                            style={{ fontFamily: 'var(--font-domine)' }}
                        >
                            EL AJUSTE PERFECTO <br />
                            PARA CADA PASEO
                        </h2>
                        <p className="text-white/90 text-sm md:text-base leading-relaxed font-light max-w-xl">
                            En Wiggle creemos que el estilo también debe ser cómodo. Por eso, medir bien a tu mascota es el primer paso para elegir accesorios que acompañen su movimiento, su personalidad y su día a día.
                        </p>
                        <div>
                            <Link
                                href="/contact"
                                className="inline-block px-8 py-3.5 bg-black hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                                CONTÁCTANOS
                            </Link>
                        </div>
                    </div>

                    {/* Right Image Column */}
                    <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                        <Image
                            src="/perritobanner.png"
                            alt="Perro Poodle cómodo en su cojín con pechera rosa"
                            fill
                            className="object-contain filter drop-shadow-xl"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                </div>
            </section>

        </div>
    );
}

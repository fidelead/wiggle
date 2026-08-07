"use client";

import React from "react";

export default function PrivacyPage() {
    return (
        <div className="bg-white min-h-screen py-12 md:py-24 px-6 font-sans">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center border-b border-gray-100 pb-12">
                    <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-900 mb-6" style={{ fontFamily: 'var(--font-domine)' }}>
                        POLÍTICA DE PRIVACIDAD Y <br /> PROTECCIÓN DE DATOS PERSONALES
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
                        En cumplimiento de lo dispuesto en la Constitución de la República del Ecuador y la Ley Orgánica de Protección de Datos Personales (LOPDP).
                    </p>
                </div>

                <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed space-y-8">

                    <p>
                        En cumplimiento de lo dispuesto en la Constitución de la República del Ecuador, la Ley Orgánica de Protección de Datos Personales (LOPDP), su Reglamento y la Guía de Protección de Datos Personales del Gobierno del Ecuador, se informa a los usuarios del sitio web <a href="https://wiggle.shop" className="text-salmon font-bold">https://wiggle.shop</a> sobre el tratamiento de sus datos personales.
                        <br />
                        Para efectos de la presente política, el nombre comercial Wiggle será referido en adelante como <strong>LA EMPRESA</strong>.
                    </p>

                    <section>
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">1. Identificación del Responsable del Tratamiento</h2>
                        <ul className="list-none space-y-2 pl-0">
                            <li><strong>Responsable del Tratamiento:</strong></li>
                            <li><strong>Nombre legal de la empresa:</strong> VETCAREGLOBAL PREMIUM SERVICES S.A.S.</li>
                            <li><strong>Nombre comercial:</strong> WIGGLE (en adelante, LA EMPRESA)</li>
                            <li><strong>Domicilio:</strong> IGNACIO FERNÁNDEZ SALVADOR OE2-1 Y AV. INTEROCEÁNICA, CENTRO COMERCIAL EL PORTAL.</li>
                            <li><strong>Teléfono:</strong> 099 835 8413</li>
                            <li><strong>Correo electrónico:</strong> privacidad@wiggle.shop</li>
                        </ul>
                        <p className="mt-4">
                            LA EMPRESA determina los fines y medios del tratamiento de datos personales y garantiza el cumplimiento de los principios de legalidad, lealtad, transparencia, finalidad, proporcionalidad, confidencialidad y seguridad.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">2. Finalidad del Tratamiento de los Datos Personales</h2>
                        <p>LA EMPRESA trata datos personales mediante sistemas automatizados y no automatizados (plataformas digitales, servidores, aplicaciones, bases de datos y, cuando aplique, documentación física), con las siguientes finalidades:</p>
                        <ul className="list-disc pl-5 mt-4 space-y-2">
                            <li>Gestionar la relación comercial y contractual, incluyendo registro de usuarios, procesamiento de pedidos, facturación, entregas y servicio postventa.</li>
                            <li>Brindar atención al cliente, responder consultas, solicitudes, reclamos o sugerencias.</li>
                            <li>Gestionar la participación en promociones, concursos, sorteos y campañas especiales, cuando aplique.</li>
                            <li>Enviar comunicaciones comerciales y de marketing por medios electrónicos (correo electrónico, redes sociales, mensajería instantánea, llamadas u otros), siempre que exista consentimiento expreso.</li>
                            <li>Ejecutar programas de fidelización y análisis de preferencias para mejorar la experiencia del usuario.</li>
                            <li>Realizar análisis internos y estadísticos del uso del sitio web y comportamiento de navegación.</li>
                            <li>Cumplir obligaciones legales o requerimientos de autoridades competentes.</li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-500">
                            El titular podrá revocar su consentimiento en cualquier momento, sin afectar la licitud del tratamiento previo.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">3. Tipos de Datos Personales Recabados</h2>
                        <p>LA EMPRESA podrá tratar, de manera proporcional y necesaria, las siguientes categorías de datos personales:</p>
                        <div className="mt-4 space-y-4">
                            <div>
                                <strong className="text-slate-800">a) Datos de identificación</strong> <br />
                                Nombres, apellidos, número de identificación, fecha de nacimiento (cuando aplique).
                            </div>
                            <div>
                                <strong className="text-slate-800">b) Datos de contacto</strong> <br />
                                Correo electrónico, número telefónico, dirección domiciliaria o de entrega.
                            </div>
                            <div>
                                <strong className="text-slate-800">c) Datos comerciales y transaccionales</strong> <br />
                                Información de pedidos, historial de compras, facturación y preferencias de consumo.
                            </div>
                            <div>
                                <strong className="text-slate-800">d) Datos digitales y de navegación</strong> <br />
                                Dirección IP, identificadores de dispositivo, datos obtenidos mediante cookies y métricas de interacción con el sitio web.
                            </div>
                            <div>
                                <strong className="text-slate-800">e) Datos de redes sociales</strong> <br />
                                Identificadores públicos de redes sociales, sin incluir contraseñas ni credenciales de acceso.
                            </div>
                        </div>
                        <p className="mt-4 font-medium text-slate-800">
                            LA EMPRESA no trata datos sensibles, salvo en los casos permitidos por la ley y con consentimiento expreso del titular.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">4. Plazo de Conservación de los Datos</h2>
                        <p>Los datos personales se conservarán mientras se mantenga la relación comercial o contractual y, posteriormente, durante los plazos exigidos por la normativa legal aplicable.</p>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">5. Base de Legitimación del Tratamiento</h2>
                        <p>El tratamiento de datos personales se fundamenta en:</p>
                        <ul className="list-disc pl-5 mt-4 space-y-2">
                            <li>El consentimiento expreso del titular.</li>
                            <li>La ejecución de una relación contractual o precontractual.</li>
                            <li>El cumplimiento de obligaciones legales.</li>
                        </ul>
                        <p className="mt-4">
                            La falta de entrega de datos o el suministro de información inexacta podrá impedir la correcta prestación del servicio. El titular garantiza la veracidad y actualización de los datos proporcionados.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">6. Comunicación, Cesión y Transferencias Internacionales de Datos</h2>
                        <p>Los datos personales podrán ser comunicados:</p>
                        <ul className="list-disc pl-5 mt-4 space-y-2">
                            <li>A autoridades públicas, cuando exista obligación legal.</li>
                            <li>A proveedores tecnológicos y operativos necesarios para la ejecución de los servicios.</li>
                        </ul>
                        <p className="mt-4">
                            El uso de plataformas cuyos servidores se encuentren fuera del Ecuador puede implicar transferencias internacionales de datos, las cuales contarán con garantías adecuadas de seguridad, confidencialidad y protección conforme a la normativa vigente.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">7. Derechos de los Titulares</h2>
                        <p>El titular podrá ejercer los derechos de:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm font-medium text-slate-800">
                            <div className="p-3 bg-gray-50 rounded">Acceso</div>
                            <div className="p-3 bg-gray-50 rounded">Rectificación y actualización</div>
                            <div className="p-3 bg-gray-50 rounded">Supresión o eliminación</div>
                            <div className="p-3 bg-gray-50 rounded">Oposición</div>
                            <div className="p-3 bg-gray-50 rounded">Limitación o suspensión del tratamiento</div>
                            <div className="p-3 bg-gray-50 rounded">Portabilidad</div>
                            <div className="p-3 bg-gray-50 rounded">Revocatoria del consentimiento</div>
                            <div className="p-3 bg-gray-50 rounded">A no ser objeto de decisiones automatizadas (incluida elaboración de perfiles)</div>
                        </div>
                        <p className="mt-6">
                            Las solicitudes deberán enviarse a <a href="mailto:privacidad@wiggle.shop" className="text-salmon font-bold">privacidad@wiggle.shop</a>.
                        </p>
                        <p className="mt-2 text-sm">
                            El titular también podrá presentar reclamos ante la Autoridad de Protección de Datos Personales o la Superintendencia de Protección de Datos Personales del Ecuador.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">8. Medidas de Seguridad</h2>
                        <p>LA EMPRESA adopta medidas técnicas, organizativas, administrativas y legales razonables para proteger los datos personales frente a accesos no autorizados, pérdida, alteración, divulgación o destrucción.</p>
                    </section>

                    <section>
                        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">9. Procedencia de los Datos</h2>
                        <p>Los datos personales tratados por LA EMPRESA provienen directamente del titular.</p>
                    </section>

                    {/* COOKIES POLICY SECTION */}
                    <div className="border-t border-gray-200 pt-16 mt-16">
                        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mb-8 text-center" style={{ fontFamily: 'var(--font-domine)' }}>
                            POLÍTICA DE COOKIES
                        </h1>

                        <section>
                            <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">10. Uso de Cookies</h2>
                            <p>
                                El sitio web <a href="https://wiggle.shop" className="text-salmon font-bold">https://wiggle.shop</a> utiliza cookies y tecnologías similares para garantizar su correcto funcionamiento, mejorar la experiencia del usuario y analizar patrones de navegación.
                                <br />
                                Las cookies son archivos que se almacenan en el dispositivo del usuario al acceder al sitio web.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">11. Tipos de Cookies Utilizadas</h2>
                            <div className="space-y-4">
                                <p><strong className="text-slate-800">Cookies técnicas o necesarias:</strong> permiten la navegación y el uso de funcionalidades esenciales.</p>
                                <p><strong className="text-slate-800">Cookies de análisis:</strong> permiten medir tráfico y comportamiento de navegación.</p>
                                <p><strong className="text-slate-800">Cookies de marketing o personalización:</strong> se utilizan únicamente con consentimiento previo, cuando aplique.</p>
                                <p><strong className="text-slate-800">Cookies de consentimiento:</strong> registran la interacción del usuario con el sistema de protección de datos para evitar mostrar el aviso de forma reiterada.</p>
                                <p><strong className="text-slate-800">Cookies de terceros:</strong> bloqueadas por defecto hasta que el usuario otorgue su consentimiento; se utilizan para marketing, análisis de comportamiento o publicidad personalizada.</p>
                            </div>
                        </section>

                        <section className="mt-8">
                            <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">12. Base Legal para el Uso de Cookies</h2>
                            <p>
                                El uso de cookies no esenciales se basa en el consentimiento previo, informado y expreso del usuario, conforme a la Ley Orgánica de Protección de Datos Personales.
                                El usuario podrá aceptar, rechazar o configurar las cookies a través del mecanismo habilitado en el sitio web.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">13. Gestión de Cookies</h2>
                            <p>
                                El usuario puede configurar su navegador para permitir, bloquear o eliminar cookies. La desactivación de ciertas cookies puede afectar la funcionalidad del sitio web.
                            </p>
                        </section>

                        <section className="mt-8">
                            <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">14. Modificaciones</h2>
                            <p>
                                LA EMPRESA podrá modificar esta política en cualquier momento para adaptarla a cambios normativos, tecnológicos o de negocio. Las actualizaciones serán publicadas en el sitio web.
                            </p>
                        </section>

                        <section className="mt-8 p-6 bg-gray-50 rounded-xl">
                            <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">15. Base Legal</h2>
                            <p>Esta política se formula en observancia de:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Constitución de la República del Ecuador</li>
                                <li>Ley Orgánica de Protección de Datos Personales y su Reglamento</li>
                                <li>Guía de Protección de Datos Personales del Gobierno del Ecuador</li>
                            </ul>
                        </section>

                    </div>

                </div>
            </div>
        </div>
    );
}

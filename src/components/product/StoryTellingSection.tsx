import React from "react";
import Image from "next/image";

const defaultStories = [
    {
        id: "default_1",
        subtitle: "ARTESANÍA",
        title: "Hecho a Mano en Ecuador",
        description: "Cada pieza es confeccionada por talentosos artesanos locales en Ecuador, utilizando técnicas ancestrales transmitidas por generaciones. Nos enorgullece preservar nuestro legado cultural, asegurando una calidad excepcional y durabilidad en cada creación.",
        image: "/hero-slide-2.jpg", // Default placeholder
        imageAlt: "Artesano trabajando cuero",
        reverse: false
    },
    {
        id: "default_2",
        subtitle: "MATERIALES",
        title: "Materiales Ecuatorianos de Primera",
        description: "Seleccionamos rigurosamente nuestras pieles y materiales sostenibles en Ecuador. Trabajamos con curtiembres responsables que respetan el medio ambiente y la biodiversidad de nuestra tierra, garantizando productos seguros para tu mascota.",
        image: "/featured-collar.png", // Default placeholder
        imageAlt: "Primer plano de textura de piel",
        reverse: true
    }
];

export default function StoryTellingSection({ product }: { product?: any }) {
    // Dynamic Stories with Fallback
    // If product exists but fields are empty strings, we also want to fall back.
    // So we check if the value is truthy (non-empty string).

    const story1 = {
        id: 1,
        subtitle: "HISTORIA 1",
        title: product?.story_1_title || defaultStories[0].title,
        description: product?.story_1_description || defaultStories[0].description,
        image: product?.story_1_image_url || defaultStories[0].image,
        imageAlt: "Historia 1",
        reverse: false
    };

    const story2 = {
        id: 2,
        subtitle: "HISTORIA 2",
        title: product?.story_2_title || defaultStories[1].title,
        description: product?.story_2_description || defaultStories[1].description,
        image: product?.story_2_image_url || defaultStories[1].image,
        imageAlt: "Historia 2",
        reverse: true
    };

    const stories = [story1, story2];

    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col gap-24 lg:gap-32">
                {stories.map((story) => (
                    <div
                        key={story.id}
                        className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${story.reverse ? 'lg:flex-row-reverse' : ''}`}
                    >
                        {/* Text Column */}
                        <div className="flex-1 w-full text-center lg:text-left">
                            <h3 className="text-xs font-bold tracking-[0.25em] text-slate-400 uppercase mb-4">
                                {story.subtitle}
                            </h3>
                            <h2
                                className="font-serif text-3xl md:text-5xl text-slate-900 mb-6 leading-tight"
                                style={{ fontFamily: 'var(--font-domine)' }}
                            >
                                {story.title}
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                                {story.description}
                            </p>
                        </div>

                        {/* Image Column */}
                        <div className="flex-1 w-full aspect-[4/3] relative overflow-hidden bg-gray-50 rounded-sm">
                            <Image
                                src={story.image}
                                alt={story.imageAlt}
                                fill
                                className="object-contain p-8 transition-transform duration-700 hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

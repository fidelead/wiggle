"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import ProductFilters from "@/components/ProductFilters";
import ShopProductCard from "@/components/ShopProductCard";
import CategorySlider from "@/components/CategorySlider";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchGraphQL } from "@/lib/graphql";
import { useSearchParams } from "next/navigation";

interface Product {
    id: string;
    databaseId: number;
    name: string;
    price: string;
    rawPrice: string;
    slug: string;
    image: {
        sourceUrl?: string;
    } | null;
    productCategories: {
        nodes: { name: string }[];
    };
    productBrands?: {
        nodes: { name: string; slug: string }[];
    };
    productTags?: {
        nodes: { name: string; slug: string }[];
    };
}

// Fetch up to 1000 items ordered by date descending (latest first)
const GET_ALL_PRODUCTS = `
query GetAllProducts {
  products(first: 1000, where: { orderby: [{ field: DATE, order: DESC }] }) {
    nodes {
      id
      databaseId
      name
      slug
      ... on SimpleProduct {
        price
        rawPrice: price(format: RAW)
        productBrands {
          nodes {
            name
            slug
          }
        }
      }
      ... on VariableProduct {
        price
        rawPrice: price(format: RAW)
        productBrands {
          nodes {
            name
            slug
          }
        }
      }
      ... on GroupProduct {
        productBrands {
          nodes {
            name
            slug
          }
        }
      }
      ... on ExternalProduct {
        price
        productBrands {
          nodes {
            name
            slug
          }
        }
      }
      image {
        sourceUrl
      }
      productCategories {
        nodes {
          name
        }
      }
      productTags {
        nodes {
          name
          slug
        }
      }
    }
  }
}
`;

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "";

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter States
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState(initialCategory);
    const [petType, setPetType] = useState<string | null>(null);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [hasInitializedPrice, setHasInitializedPrice] = useState(false);
    
    // Default sorting is date_desc (Latest / Novedades first)
    const [sortOption, setSortOption] = useState("date_desc");

    // Pagination State
    const [visibleCount, setVisibleCount] = useState(12); // 4 rows of 3 products = 12 items

    // Mobile Filter Sheet State
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Sync category state with search param if it changes
    useEffect(() => {
        const catParam = searchParams.get("category");
        if (catParam) setCategory(catParam);
        else if (initialCategory) setCategory(catParam || initialCategory);
    }, [searchParams, initialCategory]);

    useEffect(() => {
        // 1. Try to load from LocalStorage cache first for instant initial rendering
        const cachedData = localStorage.getItem("wiggle_catalog_cache");
        const cachedTime = localStorage.getItem("wiggle_catalog_cache_time");
        const cacheDuration = 1000 * 60 * 10; // 10 minutes cache duration

        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                setAllProducts(parsed);
                setIsLoading(false);
            } catch (e) {
                console.error("Failed to parse cached catalog:", e);
            }
        }

        async function loadProducts() {
            try {
                const now = Date.now();
                const isFresh = cachedTime && (now - parseInt(cachedTime)) < cacheDuration;

                // Only show loader if we have no cached data at all
                if (!cachedData) {
                    setIsLoading(true);
                }

                const data = await fetchGraphQL(GET_ALL_PRODUCTS);
                const fetchedProducts = data.products.nodes;

                setAllProducts(fetchedProducts);
                
                // Write to localStorage cache for subsequent visits
                localStorage.setItem("wiggle_catalog_cache", JSON.stringify(fetchedProducts));
                localStorage.setItem("wiggle_catalog_cache_time", now.toString());
            } catch (err) {
                console.error("Failed to load products:", err);
                if (!cachedData) {
                    setError("No se pudieron cargar los productos.");
                }
            } finally {
                setIsLoading(false);
            }
        }
        
        loadProducts();
    }, []);

    // Reset pagination to first page when any filters change
    useEffect(() => {
        setVisibleCount(12);
    }, [searchTerm, category, petType, selectedBrands, selectedTags, priceRange, sortOption]);

    // Derive unique categories, brands, tags, and maxPriceLimit dynamically from the catalog (Dynamic Faceted Filtering)
    const { categoriesList, brandsList, tagsList, maxPriceLimit } = useMemo(() => {
        const categoriesSet = new Set<string>();
        const brandsSet = new Set<string>();
        const tagsSet = new Set<string>();
        let maxVal = 0;

        const checkMatch = (product: Product, filterOverride: {
            cat?: string;
            pet?: string | null;
            brs?: string[];
            tgs?: string[];
        }) => {
            const currentCat = filterOverride.cat !== undefined ? filterOverride.cat : category;
            const currentPet = filterOverride.pet !== undefined ? filterOverride.pet : petType;
            const currentBrs = filterOverride.brs !== undefined ? filterOverride.brs : selectedBrands;
            const currentTgs = filterOverride.tgs !== undefined ? filterOverride.tgs : selectedTags;

            const lowerName = product.name.toLowerCase();

            // Search
            if (searchTerm && !lowerName.includes(searchTerm.toLowerCase())) return false;

            // Category
            if (currentCat && currentCat.toLowerCase() !== "general") {
                const normalizeStr = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const targetCat = normalizeStr(currentCat);
                const prodCats = product.productCategories?.nodes?.map(n => normalizeStr(n.name)) || [];
                const prodTags = product.productTags?.nodes?.map(n => normalizeStr(n.name)) || [];

                const matchesCat = prodCats.some(c => {
                    if (c === targetCat || c.startsWith(targetCat) || targetCat.startsWith(c)) return true;
                    const cStem = c.endsWith('s') ? c.slice(0, -1) : c;
                    const tStem = targetCat.endsWith('s') ? targetCat.slice(0, -1) : targetCat;
                    return cStem === tStem;
                });

                const matchesTag = prodTags.some(t => {
                    if (t === targetCat || t.startsWith(targetCat) || targetCat.startsWith(t)) return true;
                    const tStem = t.endsWith('s') ? t.slice(0, -1) : t;
                    const targetStem = targetCat.endsWith('s') ? targetCat.slice(0, -1) : targetCat;
                    return tStem === targetStem;
                });

                const matchesTitle = lowerName.includes(targetCat) || lowerName.includes(targetCat.endsWith('s') ? targetCat.slice(0, -1) : targetCat);

                if (!matchesCat && !matchesTag && !matchesTitle) return false;
            }

            // Pet Type
            if (currentPet) {
                const tagSlugs = product.productTags?.nodes?.map(n => n.slug) || [];
                const isPerro = currentPet.toLowerCase() === "perro";
                const isGato = currentPet.toLowerCase() === "gato";

                const hasDogTag = tagSlugs.some(s => s === "perro-3" || s === "perro-12" || s === "perro");
                const hasCatTag = tagSlugs.some(s => s === "gato-4" || s === "gato-13" || s === "gato");
                const hasBothTag = tagSlugs.some(s => s === "perro-gato-5" || s === "perro-gato" || s === "perro-gato-14" || s === "perros-gatos");

                const titleMentionsPerro = lowerName.includes("perro") || lowerName.includes("perros") || lowerName.includes("dog") || lowerName.includes("dogs") || lowerName.includes("cachorro");
                const titleMentionsGato = lowerName.includes("gato") || lowerName.includes("gatos") || lowerName.includes("cat") || lowerName.includes("cats") || lowerName.includes("gatito");

                if (isPerro) {
                    if (titleMentionsGato && !titleMentionsPerro) return false;
                    if (!hasDogTag && !hasBothTag && !titleMentionsPerro) return false;
                } else if (isGato) {
                    if (titleMentionsPerro && !titleMentionsGato) return false;
                    if (!hasCatTag && !hasBothTag && !titleMentionsGato) return false;
                }
            }

            // Brands
            if (currentBrs.length > 0) {
                const productBrands = product.productBrands?.nodes?.map(n => n.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || [];
                const normSelectedBrs = currentBrs.map(b => b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                if (!productBrands.some(b => normSelectedBrs.includes(b))) return false;
            }

            // Tags / Tipo de productos
            if (currentTgs.length > 0) {
                const productTags = product.productTags?.nodes?.map(t => t.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || [];
                const normSelectedTgs = currentTgs.map(t => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                if (!productTags.some(t => normSelectedTgs.includes(t))) return false;
            }

            return true;
        };

        allProducts.forEach(product => {
            // Track max price overall
            const pVal = parseFloat(product.rawPrice?.replace(/[^0-9.]/g, "")) || 0;
            if (pVal > maxVal) maxVal = pVal;

            // Categories available given petType, selectedBrands, selectedTags, searchTerm
            if (checkMatch(product, { cat: "" })) {
                product.productCategories?.nodes?.forEach(cat => {
                    if (cat.name) categoriesSet.add(cat.name);
                });
            }

            // Brands available given category, petType, selectedTags, searchTerm
            if (checkMatch(product, { brs: [] })) {
                product.productBrands?.nodes?.forEach(brand => {
                    if (brand.name) brandsSet.add(brand.name);
                });
            }

            // Tags available given category, petType, selectedBrands, searchTerm
            if (checkMatch(product, { tgs: [] })) {
                product.productTags?.nodes?.forEach(tag => {
                    const isPetTag = tag.slug === "perro-3" || tag.slug === "perro-12" || tag.slug === "perro" ||
                                     tag.slug === "gato-4" || tag.slug === "gato-13" || tag.slug === "gato" ||
                                     tag.slug === "perro-gato-5" || tag.slug === "perro-gato" || tag.slug === "perro-gato-14" || tag.slug === "perros-gatos";
                    if (!isPetTag && tag.name) {
                        tagsSet.add(tag.name);
                    }
                });
            }
        });

        const deduplicateAndCapitalize = (items: string[]) => {
            const map = new Map<string, string>();
            items.forEach(rawItem => {
                if (!rawItem || !rawItem.trim()) return;
                const item = rawItem.trim();
                const key = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (!map.has(key)) {
                    const capitalized = item.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
                    map.set(key, capitalized);
                }
            });
            return Array.from(map.values()).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
        };

        const roundedMax = Math.ceil(maxVal) || 100;

        return {
            categoriesList: deduplicateAndCapitalize(Array.from(categoriesSet)),
            brandsList: deduplicateAndCapitalize(Array.from(brandsSet)),
            tagsList: deduplicateAndCapitalize(Array.from(tagsSet)),
            maxPriceLimit: roundedMax
        };
    }, [allProducts, category, petType, selectedBrands, selectedTags, searchTerm]);

    // Initialize/Sync price range once products are loaded
    useEffect(() => {
        if (maxPriceLimit > 100 && !hasInitializedPrice) {
            setPriceRange(prev => ({ ...prev, max: maxPriceLimit }));
            setHasInitializedPrice(true);
        }
    }, [maxPriceLimit, hasInitializedPrice]);

    // Handle brand selection toggle
    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev => 
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    // Handle tag (product type) selection toggle
    const handleTagChange = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    // Reset all filters to default
    const handleClearAll = () => {
        setSearchTerm("");
        setCategory("");
        setPetType(null);
        setSelectedBrands([]);
        setSelectedTags([]);
        setPriceRange({ min: 0, max: maxPriceLimit });
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

            if (category && category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") !== "general") {
                const normalizeStr = (str: string) => str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const targetCat = normalizeStr(category);
                const prodCats = product.productCategories?.nodes?.map(n => normalizeStr(n.name)) || [];
                const prodTags = product.productTags?.nodes?.map(n => normalizeStr(n.name)) || [];

                const matchesCat = prodCats.some(c => {
                    if (c === targetCat || c.startsWith(targetCat) || targetCat.startsWith(c)) return true;
                    const cStem = c.endsWith('s') ? c.slice(0, -1) : c;
                    const tStem = targetCat.endsWith('s') ? targetCat.slice(0, -1) : targetCat;
                    return cStem === tStem;
                });

                const matchesTag = prodTags.some(t => {
                    if (t === targetCat || t.startsWith(targetCat) || targetCat.startsWith(t)) return true;
                    const tStem = t.endsWith('s') ? t.slice(0, -1) : t;
                    const targetStem = targetCat.endsWith('s') ? targetCat.slice(0, -1) : targetCat;
                    return tStem === targetStem;
                });

                if (!matchesCat && !matchesTag) return false;
            }

            if (petType) {
                const tagSlugs = product.productTags?.nodes.map(n => n.slug) || [];
                const isPerro = petType.toLowerCase() === "perro";
                const isGato = petType.toLowerCase() === "gato";

                const hasDogTag = tagSlugs.some(s => s === "perro-3" || s === "perro-12" || s === "perro");
                const hasCatTag = tagSlugs.some(s => s === "gato-4" || s === "gato-13" || s === "gato");
                const hasBothTag = tagSlugs.some(s => s === "perro-gato-5" || s === "perro-gato" || s === "perro-gato-14" || s === "perros-gatos");

                // Check title for explicit keywords (guards against human tagging mistakes in WooCommerce)
                const lowerName = product.name.toLowerCase();
                const titleMentionsPerro = lowerName.includes("perro") || lowerName.includes("perros") || lowerName.includes("dog") || lowerName.includes("dogs") || lowerName.includes("cachorro");
                const titleMentionsGato = lowerName.includes("gato") || lowerName.includes("gatos") || lowerName.includes("cat") || lowerName.includes("cats") || lowerName.includes("gatito");

                if (isPerro) {
                    if (titleMentionsGato && !titleMentionsPerro) return false;
                    if (!hasDogTag && !hasBothTag) return false;
                } else if (isGato) {
                    if (titleMentionsPerro && !titleMentionsGato) return false;
                    if (!hasCatTag && !hasBothTag) return false;
                }
            }

            if (selectedBrands.length > 0) {
                const normSelectedBrands = selectedBrands.map(b => b.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                const productBrands = product.productBrands?.nodes?.map(n => n.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || [];
                if (!productBrands.some(b => normSelectedBrands.includes(b))) return false;
            }

            if (selectedTags.length > 0) {
                const normSelectedTags = selectedTags.map(t => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                const productTags = product.productTags?.nodes?.map(t => t.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || [];
                if (!productTags.some(t => normSelectedTags.includes(t))) return false;
            }

            const numericPrice = parseFloat(product.rawPrice?.replace(/[^0-9.]/g, "")) || 0;
            if (numericPrice < priceRange.min || (priceRange.max < maxPriceLimit && numericPrice > priceRange.max)) return false;

            return true;
        }).sort((a, b) => {
            if (sortOption === "price_asc") {
                const priceA = parseFloat(a.rawPrice?.replace(/[^0-9.]/g, "")) || 0;
                const priceB = parseFloat(b.rawPrice?.replace(/[^0-9.]/g, "")) || 0;
                return priceA - priceB;
            }
            if (sortOption === "price_desc") {
                const priceA = parseFloat(a.rawPrice?.replace(/[^0-9.]/g, "")) || 0;
                const priceB = parseFloat(b.rawPrice?.replace(/[^0-9.]/g, "")) || 0;
                return priceB - priceA;
            }
            if (sortOption === "name_asc") return a.name.localeCompare(b.name);
            if (sortOption === "name_desc") return b.name.localeCompare(a.name);
            if (sortOption === "date_desc") return b.databaseId - a.databaseId; // Descending database ID = newest first
            return 0;
        });
    }, [allProducts, searchTerm, category, petType, selectedBrands, selectedTags, priceRange, sortOption, maxPriceLimit]);

    // Slice products for pagination
    const slicedProducts = useMemo(() => {
        return filteredProducts.slice(0, visibleCount);
    }, [filteredProducts, visibleCount]);

    if (isLoading && !allProducts.length) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-salmon border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header with dynamic Category Banner */}
            <div className="relative py-20 md:py-28 text-center px-6 bg-[#3D6A66] transition-all duration-500 overflow-hidden">
                {/* Background Image Div with scale to clip rounded corners */}
                <div 
                    className="absolute inset-0 scale-[1.05] transition-transform duration-500"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${
                            category 
                                ? `/banner/${category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}.jpg` 
                                : '/banner/default.jpg'
                        })`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
                <div className="relative z-10">
                    <h1 className="font-serif text-4xl md:text-6xl text-white mb-4 tracking-tight" style={{ fontFamily: 'var(--font-domine)' }}>
                        {category || "La Colección"}
                    </h1>
                    <p className="font-sans text-sm md:text-base text-white/90 max-w-lg mx-auto tracking-widest uppercase">
                        {category ? `Esenciales de ${category} para tu mascota` : "Esenciales seleccionados para la mascota moderna"}
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
                {/* Category Slider Banner */}
                <CategorySlider
                    activeCategory={category}
                    onCategoryChange={setCategory}
                />

                {/* Mobile Filter Button & Sort (Top Bar) */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12 sticky top-20 z-20 bg-white/80 backdrop-blur-md py-4 md:static md:bg-transparent md:py-0">

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsMobileFiltersOpen(true)}
                        className="md:hidden flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-lg text-sm font-bold uppercase tracking-widest text-gray-900"
                    >
                        <SlidersHorizontal className="w-4 h-4" /> Filtrar y Ordenar
                    </button>

                    <div className="hidden md:block text-sm text-gray-400 font-medium">
                        Mostrando {filteredProducts.length} resultados
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-2 self-end md:self-auto">
                        <span className="text-sm text-gray-400 hidden md:inline">Ordenar por:</span>
                        <div className="relative group">
                            <button className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wide hover:text-salmon transition-colors">
                                {sortOption === 'date_desc' && 'Novedades'}
                                {sortOption === 'price_asc' && 'Precio: Bajo a Alto'}
                                {sortOption === 'price_desc' && 'Precio: Alto a Bajo'}
                                {sortOption === 'name_asc' && 'Nombre: A - Z'}
                                {sortOption === 'name_desc' && 'Nombre: Z - A'}
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <button onClick={() => setSortOption('date_desc')} className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-salmon transition-colors">Novedades</button>
                                <button onClick={() => setSortOption('name_asc')} className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-salmon transition-colors">Nombre: A - Z</button>
                                <button onClick={() => setSortOption('price_asc')} className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-salmon transition-colors">Precio: Bajo a Alto</button>
                                <button onClick={() => setSortOption('price_desc')} className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-salmon transition-colors">Precio: Alto a Bajo</button>
                                <button onClick={() => setSortOption('name_desc')} className="block w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-salmon transition-colors">Nombre: Z - A</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-12 items-start relative">
                    <aside className="hidden md:block w-64 sticky top-32 flex-shrink-0">
                        <ProductFilters
                            searchTerm={searchTerm}
                            onSearch={setSearchTerm}
                            selectedCategory={category}
                            onCategoryChange={setCategory}
                            selectedPetType={petType}
                            onPetTypeChange={setPetType}
                            selectedBrands={selectedBrands}
                            onBrandChange={handleBrandChange}
                            selectedTags={selectedTags}
                            onTagChange={handleTagChange}
                            priceRange={priceRange}
                            onPriceChange={(min, max) => setPriceRange({ min, max })}
                            onClearAll={handleClearAll}
                            categories={categoriesList}
                            brands={brandsList}
                            tags={tagsList}
                            maxPriceLimit={maxPriceLimit}
                        />
                    </aside>

                    <main className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="space-y-16">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                    {slicedProducts.map((product) => (
                                        <ShopProductCard key={product.id} product={{
                                            ...product,
                                            image: product.image?.sourceUrl || "/placeholder-product.png",
                                            brand: product.productBrands?.nodes?.[0]?.name || "",
                                            category: product.productCategories?.nodes?.[0]?.name || ""
                                        }} />
                                    ))}
                                </div>

                                {/* Load More Button */}
                                {visibleCount < filteredProducts.length && (
                                    <div className="flex justify-center pt-8">
                                        <button
                                            onClick={() => setVisibleCount(prev => prev + 12)}
                                            className="px-10 py-4 border border-neutral-900 text-neutral-900 rounded font-bold text-xs uppercase tracking-[0.2em] hover:bg-neutral-900 hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
                                        >
                                            Cargar más
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-32">
                                <p className="text-gray-400 text-lg">No se encontraron productos.</p>
                                <button
                                    onClick={handleClearAll}
                                    className="mt-4 text-salmon underline hover:text-black transition-colors"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileFiltersOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-50 md:hidden shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                                <h2 className="font-serif text-xl font-bold text-gray-900">Filtros</h2>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 -mr-2 text-gray-500 hover:text-black">
                                    ✕
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6">
                                <ProductFilters
                                    searchTerm={searchTerm}
                                    onSearch={setSearchTerm}
                                    selectedCategory={category}
                                    onCategoryChange={setCategory}
                                    selectedPetType={petType}
                                    onPetTypeChange={setPetType}
                                    selectedBrands={selectedBrands}
                                    onBrandChange={handleBrandChange}
                                    selectedTags={selectedTags}
                                    onTagChange={handleTagChange}
                                    priceRange={priceRange}
                                    onPriceChange={(min, max) => setPriceRange({ min, max })}
                                    onClearAll={handleClearAll}
                                    categories={categoriesList}
                                    brands={brandsList}
                                    tags={tagsList}
                                    maxPriceLimit={maxPriceLimit}
                                />
                            </div>
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full py-4 bg-black text-white rounded-lg font-bold uppercase tracking-widest text-xs"
                                >
                                    Ver {filteredProducts.length} Resultados
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-salmon border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}

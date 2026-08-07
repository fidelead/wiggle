"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: string;
    numericPrice: number;
    image: string;
    quantity: number;
    variantName?: string;
    category?: string;
    sku?: string;
}

interface CartContextType {
    items: CartItem[];
    count: number;
    subtotal: number;
    shipping: number;
    discount: number;
    couponCode: string;
    total: number;
    addToCart: (item?: Partial<CartItem>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    applyCoupon: (code: string) => boolean;
    removeCoupon: () => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial fallback sample item if cart is empty on first demo load
const INITIAL_DEMO_ITEMS: CartItem[] = [
    {
        id: "ownat-classic-duck-4kg",
        name: "OWNAT CLASSIC DUCK PERRO 4 KG",
        price: "$20,45",
        numericPrice: 20.45,
        image: "/ownat-duck-4kg.png",
        quantity: 1,
        category: "Alimento",
        sku: "OWN-DUCK-4"
    }
];

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [couponCode, setCouponCode] = useState<string>("");
    const [discountPercentage, setDiscountPercentage] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("wiggle_cart_items");
            const savedCoupon = localStorage.getItem("wiggle_cart_coupon");
            if (saved) {
                const parsed = JSON.parse(saved);
                setItems(parsed.length > 0 ? parsed : INITIAL_DEMO_ITEMS);
            } else {
                setItems(INITIAL_DEMO_ITEMS);
            }
            if (savedCoupon) {
                setCouponCode(savedCoupon);
                if (savedCoupon.toUpperCase() === "WIGGLE10") setDiscountPercentage(10);
                if (savedCoupon.toUpperCase() === "OFERTA30") setDiscountPercentage(30);
            }
        } catch {
            setItems(INITIAL_DEMO_ITEMS);
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("wiggle_cart_items", JSON.stringify(items));
            localStorage.setItem("wiggle_cart_coupon", couponCode);
        }
    }, [items, couponCode, isLoaded]);

    const addToCart = (newItem?: Partial<CartItem>) => {
        if (!newItem || !newItem.name) {
            // Generic add from product card default
            setItems(prev => {
                const existing = prev.find(i => i.id === "ownat-classic-duck-4kg");
                if (existing) {
                    return prev.map(i => i.id === "ownat-classic-duck-4kg" ? { ...i, quantity: i.quantity + 1 } : i);
                }
                return [...prev, INITIAL_DEMO_ITEMS[0]];
            });
            return;
        }

        const id = newItem.id || (newItem.name ? newItem.name.toLowerCase().replace(/\s+/g, '-') : `item-${Date.now()}`);
        const numPrice = newItem.numericPrice || parseFloat((newItem.price || "").replace(/[^0-9.]/g, "")) || 15.00;

        setItems(prev => {
            const existingIndex = prev.findIndex(i => i.id === id);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += (newItem.quantity || 1);
                return updated;
            } else {
                return [...prev, {
                    id,
                    name: newItem.name!,
                    price: newItem.price || `$${numPrice.toFixed(2)}`,
                    numericPrice: numPrice,
                    image: newItem.image || "/placeholder-product.png",
                    quantity: newItem.quantity || 1,
                    category: newItem.category || "General",
                    sku: newItem.sku || `WIG-${Math.floor(Math.random()*10000)}`
                }];
            }
        });
    };

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const applyCoupon = (code: string): boolean => {
        const clean = code.trim().toUpperCase();
        if (clean === "WIGGLE10" || clean === "DESCUENTO10") {
            setCouponCode(clean);
            setDiscountPercentage(10);
            return true;
        }
        if (clean === "OFERTA30" || clean === "WIGGLE30") {
            setCouponCode(clean);
            setDiscountPercentage(30);
            return true;
        }
        return false;
    };

    const removeCoupon = () => {
        setCouponCode("");
        setDiscountPercentage(0);
    };

    const clearCart = () => {
        setItems([]);
        removeCoupon();
    };

    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + (item.numericPrice * item.quantity), 0);
    const shipping = subtotal >= 50 || items.length === 0 ? 0 : 4.00;
    const discount = (subtotal * discountPercentage) / 100;
    const total = Math.max(0, subtotal + shipping - discount);

    return (
        <CartContext.Provider value={{
            items,
            count,
            subtotal,
            shipping,
            discount,
            couponCode,
            total,
            addToCart,
            removeFromCart,
            updateQuantity,
            applyCoupon,
            removeCoupon,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

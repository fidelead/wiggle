"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, LogOut } from "lucide-react";

const MENU_ITEMS = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Productos", icon: ShoppingBag, href: "/admin/products" },
    { name: "Pedidos", icon: ShoppingCart, href: "/admin/orders" },
    { name: "Clientes", icon: Users, href: "/admin/customers" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 font-sans z-50">
            {/* Logo Section */}
            <div className="h-16 flex items-center justify-center px-6 border-b border-slate-100 bg-white">
                <div className="relative w-[120px] h-[40px]">
                    {/* Using Next.js Image as requested. Assuming logo.png is in public folder. */}
                    <Image
                        src="/logo.png"
                        alt="Wiggle Admin"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 py-6 space-y-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname.startsWith(item.href) && (item.href !== "/admin" || pathname === "/admin");

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all relative group ${isActive
                                    ? "bg-wiggle-brand/10 text-wiggle-brand"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            {/* Active Indicator Line */}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-wiggle-brand rounded-r-full" />
                            )}

                            <item.icon
                                className={`w-5 h-5 transition-colors ${isActive ? "text-wiggle-brand" : "text-slate-400 group-hover:text-slate-600"}`}
                                strokeWidth={isActive ? 2 : 1.5}
                            />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100">
                <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors group">
                    <LogOut className="w-5 h-5 group-hover:text-red-600 transition-colors" />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}

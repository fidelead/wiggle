import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Bell, Search } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content Wrapper */}
            <div className="pl-64 flex flex-col min-h-screen">

                {/* Topbar */}
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 px-8 flex items-center justify-between">
                    {/* Left: Breadcrumbs or Page Title (Placeholder) */}
                    <div className="text-sm font-medium text-slate-500">
                        Wiggle / <span className="text-slate-900">Administration</span>
                    </div>

                    {/* Right: Actions & Profile */}
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64"
                            />
                        </div>

                        <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-medium text-slate-900">Admin User</p>
                                <p className="text-xs text-slate-500">admin@wiggle.com</p>
                            </div>
                            <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

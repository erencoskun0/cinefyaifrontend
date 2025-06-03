"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Film,
  Building2,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/authStore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    href: "/dashboard/owner",
    icon: LayoutDashboard,
    label: "Genel Bakış",
    exact: true,
  },
  {
    href: "/dashboard/owner/movies",
    icon: Film,
    label: "Film Yönetimi",
  },
  {
    href: "/dashboard/owner/halls",
    icon: Building2,
    label: "Salon Yönetimi",
  },
  {
    href: "/dashboard/owner/sessions",
    icon: Calendar,
    label: "Seans Yönetimi",
  },
  {
    href: "/dashboard/owner/analytics",
    icon: BarChart3,
    label: "İstatistikler",
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const isActiveRoute = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
  
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

   
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:overflow-y-auto lg:bg-black/20 lg:backdrop-blur-md lg:border-r lg:border-white/10">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/cinefyLogo.png"
                alt="CinefyAI Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-white text-xl font-bold">CinefyAI</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActiveRoute(item.href, item.exact)
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}>
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium">{user?.fullName}</div>
                  <div className="text-gray-400 text-sm">CinemaMaximum Bursa</div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 py-2">
                    <Link
                      href="/dashboard/owner/profile"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Profil Ayarları</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                      <LogOut className="h-4 w-4" />
                      <span>Çıkış Yap</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </aside>

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed top-0 left-0 z-50 h-full w-72 bg-black/20 backdrop-blur-md border-r border-white/10 lg:hidden">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/cinefyLogo.png"
                alt="CinefyAI Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-white text-xl font-bold">CinefyAI</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-white/10">
              <X className="h-5 w-5" />
            </Button>
          </div>


          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActiveRoute(item.href, item.exact)
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}>
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

         
          <div className="p-4 border-t border-white/10">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium">{user?.fullName}</div>
                  <div className="text-gray-400 text-sm">Sinema Sahibi</div>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 py-2">
                    <Link
                      href="/dashboard/owner/profile"
                      className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Profil Ayarları</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                      <LogOut className="h-4 w-4" />
                      <span>Çıkış Yap</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>

    
      <div className="lg:pl-72">
      
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-black/20 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white hover:bg-white/10">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-white">
                {sidebarItems.find((item) =>
                  isActiveRoute(item.href, item.exact)
                )?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
              <div className="hidden lg:block text-white text-sm">
                Hoş geldiniz, CinemaMaximum Bursa{" "}
                <span className="font-medium">{user?.fullName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

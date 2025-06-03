"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  Calendar,
  Users,
  Zap,
  Shield,
  Smartphone,
  Star,
  ArrowRight,
  Film,
  Ticket,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src="/cinefyLogo.png"
                alt="CinefyAI Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-white text-xl font-bold">CinefyAI</span>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10">
                  Giriş Yap
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="primary">Kayıt Ol</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Yapay Zeka ile
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Sinema Deneyimi
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                CinefyAI ile film keşfetmek, bilet almak ve sinema deneyiminizi
                kişiselleştirmek hiç bu kadar kolay olmamıştı.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="px-8 py-4">
                    <Play className="h-5 w-5 mr-2" />
                    Hemen Başla
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10">
                  <Film className="h-5 w-5 mr-2" />
                  Nasıl Çalışır?
                </Button>
              </div>
            </motion.div>

            {/* Hero Image/Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-16">
              <div className="relative mx-auto max-w-4xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white/5 rounded-xl">
                      <Bot className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">
                        AI Önerileri
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Kişisel tercihlerinize göre film önerileri
                      </p>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-xl">
                      <Ticket className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">
                        Kolay Rezervasyon
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Tek tıkla koltuk seçimi ve bilet alma
                      </p>
                    </div>
                    <div className="text-center p-6 bg-white/5 rounded-xl">
                      <Calendar className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">
                        Seans Yönetimi
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Tüm seansları tek yerden görün
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Neden CinefyAI?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Modern teknoloji ile sinema deneyiminizi bir üst seviyeye taşıyan
              özellikleri keşfedin
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Sinema Deneyiminizi Bugün Başlatın
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Hemen kayıt olun ve yapay zeka destekli film önerilerini
              deneyimleyin
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="xl" className="px-12 py-4">
                  Ücretsiz Kayıt Ol
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10">
                  Zaten Hesabım Var
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/cinefyLogo.png"
                alt="CinefyAI Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-white text-lg font-semibold">CinefyAI</span>
            </div>
            <div className="text-gray-400">
              © 2025 CinefyAI. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: Bot,
    title: "Yapay Zeka Önerileri",
    description:
      "Kişisel tercihlerinizi analiz ederek size özel film önerileri sunar.",
  },
  {
    icon: Zap,
    title: "Hızlı Rezervasyon",
    description: "Tek tıkla koltuk seçimi yapın ve biletinizi anında alın.",
  },
  {
    icon: Calendar,
    title: "Akıllı Seans Takvimi",
    description: "Tüm sinema seanslarını kolayca görüntüleyin ve planlayın.",
  },
  {
    icon: Users,
    title: "Grup Rezervasyonu",
    description: "Arkadaşlarınızla birlikte kolayca grup biletleri alın.",
  },
  {
    icon: Shield,
    title: "Güvenli Ödeme",
    description: "SSL şifrelemesi ile güvenli ve hızlı ödeme sistemi.",
  },
  {
    icon: Smartphone,
    title: "Mobil Uyumlu",
    description: "Her cihazda mükemmel deneyim için responsive tasarım.",
  },
];

const stats = [
  { value: "10K+", label: "Aktif Kullanıcı" },
  { value: "50+", label: "Sinema Salonu" },
  { value: "1000+", label: "Film Seçeneği" },
  { value: "99%", label: "Memnuniyet Oranı" },
];

export default HomePage;

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Film,
  Building2,
  Star,
  Target,
  Award,
  Zap,
  Eye,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw,
  PieChart,
  Activity,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";

interface AnalyticsData {
  totalRevenue: number;
  totalTickets: number;
  totalCustomers: number;
  averageRating: number;
  monthlyGrowth: number;
  popularMovies: {
    id: string;
    title: string;
    tickets: number;
    revenue: number;
    rating: number;
  }[];
  hallPerformance: {
    id: string;
    name: string;
    occupancyRate: number;
    revenue: number;
    sessions: number;
  }[];
  timeAnalytics: {
    hour: number;
    tickets: number;
    revenue: number;
  }[];
  weeklyData: {
    day: string;
    revenue: number;
    tickets: number;
  }[];
}

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 245780,
    totalTickets: 5430,
    totalCustomers: 3250,
    averageRating: 4.6,
    monthlyGrowth: 12.5,
    popularMovies: [
      {
        id: "1",
        title: "Avatar: The Way of Water",
        tickets: 1250,
        revenue: 87500,
        rating: 4.8,
      },
      {
        id: "2",
        title: "Spider-Man: No Way Home",
        tickets: 980,
        revenue: 68600,
        rating: 4.7,
      },
      {
        id: "3",
        title: "Top Gun: Maverick",
        tickets: 750,
        revenue: 52500,
        rating: 4.5,
      },
      {
        id: "4",
        title: "Black Panther: Wakanda Forever",
        tickets: 620,
        revenue: 43400,
        rating: 4.3,
      },
    ],
    hallPerformance: [
      {
        id: "1",
        name: "Salon 1 - IMAX",
        occupancyRate: 85,
        revenue: 125000,
        sessions: 156,
      },
      {
        id: "2",
        name: "Salon 2 - VIP",
        occupancyRate: 78,
        revenue: 98000,
        sessions: 120,
      },
      {
        id: "3",
        name: "Salon 3 - Standart",
        occupancyRate: 65,
        revenue: 67500,
        sessions: 180,
      },
    ],
    timeAnalytics: [
      { hour: 10, tickets: 45, revenue: 3150 },
      { hour: 12, tickets: 78, revenue: 5460 },
      { hour: 14, tickets: 120, revenue: 8400 },
      { hour: 16, tickets: 156, revenue: 10920 },
      { hour: 18, tickets: 200, revenue: 14000 },
      { hour: 20, tickets: 180, revenue: 12600 },
      { hour: 22, tickets: 95, revenue: 6650 },
    ],
    weeklyData: [
      { day: "Pazartesi", revenue: 28500, tickets: 650 },
      { day: "Salı", revenue: 31200, tickets: 720 },
      { day: "Çarşamba", revenue: 35600, tickets: 820 },
      { day: "Perşembe", revenue: 42300, tickets: 950 },
      { day: "Cuma", revenue: 56800, tickets: 1280 },
      { day: "Cumartesi", revenue: 68900, tickets: 1540 },
      { day: "Pazar", revenue: 61400, tickets: 1380 },
    ],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("tr-TR").format(num);
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? (
      <ArrowUpRight className="h-4 w-4 text-green-400" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-400" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth > 0 ? "text-green-400" : "text-red-400";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 rounded-2xl p-8 border border-purple-500/30">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                  İstatistikler ve Analitikler
                  <Activity className="h-6 w-6 ml-2 text-yellow-400" />
                </h1>
                <p className="text-purple-200 mt-2 text-lg">
                  Sinema işletmenizin detaylı performans analizi
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Download className="h-4 w-4 mr-2" />
                Rapor İndir
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <RefreshCw className="h-4 w-4 mr-2" />
                Yenile
              </Button>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-4">
          {["week", "month", "year"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "ghost"}
              onClick={() => setSelectedPeriod(period)}
              className={
                selectedPeriod === period
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "text-white hover:bg-white/10"
              }>
              {period === "week"
                ? "Bu Hafta"
                : period === "month"
                ? "Bu Ay"
                : "Bu Yıl"}
            </Button>
          ))}
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-600/30 rounded-xl">
                <DollarSign className="h-6 w-6 text-emerald-400" />
              </div>
              {getGrowthIcon(analyticsData.monthlyGrowth)}
            </div>
            <div>
              <h3 className="text-emerald-200 text-sm font-medium">
                Toplam Gelir
              </h3>
              <p className="text-2xl font-bold text-white mb-1">
                {formatCurrency(analyticsData.totalRevenue)}
              </p>
              <p
                className={`text-sm ${getGrowthColor(
                  analyticsData.monthlyGrowth
                )}`}>
                %{analyticsData.monthlyGrowth} artış
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-600/30 rounded-xl">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <h3 className="text-blue-200 text-sm font-medium">
                Satılan Bilet
              </h3>
              <p className="text-2xl font-bold text-white mb-1">
                {formatNumber(analyticsData.totalTickets)}
              </p>
              <p className="text-sm text-green-400">+8.2% bu ay</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-600/30 rounded-xl">
                <Heart className="h-6 w-6 text-purple-400" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            <div>
              <h3 className="text-purple-200 text-sm font-medium">
                Müşteri Sayısı
              </h3>
              <p className="text-2xl font-bold text-white mb-1">
                {formatNumber(analyticsData.totalCustomers)}
              </p>
              <p className="text-sm text-green-400">+15.7% yeni müşteri</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-600/30 rounded-xl">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
              <Award className="h-4 w-4 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-yellow-200 text-sm font-medium">
                Ortalama Değerlendirme
              </h3>
              <p className="text-2xl font-bold text-white mb-1">
                {analyticsData.averageRating}/5.0
              </p>
              <p className="text-sm text-yellow-400">Mükemmel puan!</p>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                Haftalık Gelir Trendi
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10">
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {analyticsData.weeklyData.map((data, index) => (
                <div
                  key={data.day}
                  className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                    <span className="text-gray-300">{data.day}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-white font-medium">
                      {formatCurrency(data.revenue)}
                    </span>
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (data.revenue /
                              Math.max(
                                ...analyticsData.weeklyData.map(
                                  (d) => d.revenue
                                )
                              )) *
                            100
                          }%`,
                          animationDelay: `${index * 100}ms`,
                        }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Time Analytics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                Saatlik Satış Dağılımı
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10">
                <PieChart className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {analyticsData.timeAnalytics.map((data, index) => (
                <div
                  key={data.hour}
                  className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-300 w-12">{data.hour}:00</span>
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-700"
                        style={{
                          width: `${
                            (data.tickets /
                              Math.max(
                                ...analyticsData.timeAnalytics.map(
                                  (d) => d.tickets
                                )
                              )) *
                            100
                          }%`,
                          animationDelay: `${index * 150}ms`,
                        }}></div>
                    </div>
                  </div>
                  <span className="text-white text-sm">
                    {data.tickets} bilet
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Popular Movies and Hall Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Movies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Film className="h-5 w-5 mr-2 text-purple-400" />
                En Popüler Filmler
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10">
                Tümünü Gör
              </Button>
            </div>

            <div className="space-y-4">
              {analyticsData.popularMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{movie.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{movie.tickets} bilet</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-semibold">
                      {formatCurrency(movie.revenue)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hall Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-blue-400" />
                Salon Performansı
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10">
                Detaylar
              </Button>
            </div>

            <div className="space-y-4">
              {analyticsData.hallPerformance.map((hall, index) => (
                <motion.div
                  key={hall.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">{hall.name}</h4>
                    <span
                      className={`text-sm font-medium ${
                        hall.occupancyRate >= 80
                          ? "text-green-400"
                          : hall.occupancyRate >= 60
                          ? "text-yellow-400"
                          : "text-orange-400"
                      }`}>
                      %{hall.occupancyRate} doluluk
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${
                          hall.occupancyRate >= 80
                            ? "bg-green-500"
                            : hall.occupancyRate >= 60
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${hall.occupancyRate}%` }}></div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{hall.sessions} seans</span>
                      <span className="text-emerald-400 font-medium">
                        {formatCurrency(hall.revenue)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border border-indigo-500/30">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-indigo-600/30 rounded-xl mr-4">
              <Target className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Performans Öngörüleri
              </h3>
              <p className="text-indigo-200">AI destekli iş analitikleri</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">
                  Hızlı Büyüme
                </span>
              </div>
              <p className="text-white text-sm">
                Cuma ve Cumartesi akşamları %35 daha fazla gelir elde
                ediyorsunuz. Bu saatlerde ek seanslar planlayın.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-medium">Optimizasyon</span>
              </div>
              <p className="text-white text-sm">
                IMAX salonunuz %85 dolulukta. VIP salon kapasitesini artırarak
                daha fazla gelir elde edebilirsiniz.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Star className="h-5 w-5 text-purple-400" />
                <span className="text-purple-400 font-medium">
                  Müşteri Memnuniyeti
                </span>
              </div>
              <p className="text-white text-sm">
                4.6/5 ortalama puanınız sektör ortalamasının üstünde. Müşteri
                sadakatiniz güçlü.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;

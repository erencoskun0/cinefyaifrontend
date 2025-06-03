"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Calendar,
  Building2,
  Users,
  Ticket,
  Crown,
  Play,
  Film,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Session {
  id: string;
  time: string;
  date: string;
  hall: string;
  hallType: string;
  price: number;
  vipPrice: number;
  availableSeats: number;
  totalSeats: number;
  features: string[];
}

interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  backdrop: string;
  genre: string[];
  duration: number;
  rating: number;
  ageRating: string;
  director: string;
  cast: string[];
}

interface Cinema {
  id: string;
  name: string;
  brand: string;
  city: string;
  district: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
}

const CinemaMovieSessionsPage = () => {
  const params = useParams();
  const [selectedDate, setSelectedDate] = useState("2025-05-20");

  // Sample cinema data
  const [cinema] = useState<Cinema>({
    id: "1",
    name: "CinemaMaximum Zorlu",
    brand: "CinemaMaximum",
    city: "İstanbul",
    district: "Beşiktaş",
    address: "Zorlu Center, Levazım Mah. Koru Sok. No:2",
    phone: "0212 924 0000",
    rating: 4.8,
    image:
      "data:image/jpeg;base64,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",
  });

  // Sample movie data
  const [movie] = useState<Movie>({
    id: "1",
    title: "Avatar: The Way of Water",
    description:
      "Jake Sully su altı dünyasında yaşamına devam ederken, ailesiyle birlikte yeni zorluklarla karşılaşır.",
    poster:
      "https://m.media-amazon.com/images/S/pv-target-images/f0535dd61f56bddd6ee7f3bfb765645e45d78f373418ae37ee5103cf6eebbff0.jpg",
    backdrop:
      "https://m.media-amazon.com/images/S/pv-target-images/f0535dd61f56bddd6ee7f3bfb765645e45d78f373418ae37ee5103cf6eebbff0.jpg",
    genre: ["Bilim Kurgu", "Aksiyon", "Macera"],
    duration: 192,
    rating: 4.8,
    ageRating: "13+",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
  });

  // Sample sessions data
  const [sessions] = useState<Session[]>([
    {
      id: "s1",
      time: "10:30",
      date: "2025-05-20",
      hall: "Salon 1",
      hallType: "IMAX",
      price: 65,
      vipPrice: 85,
      availableSeats: 180,
      totalSeats: 300,
      features: ["IMAX", "Dolby Atmos"],
    },
    {
      id: "s2",
      time: "14:30",
      date: "2025-05-20",
      hall: "Salon 1",
      hallType: "IMAX",
      price: 65,
      vipPrice: 85,
      availableSeats: 95,
      totalSeats: 300,
      features: ["IMAX", "Dolby Atmos"],
    },
    {
      id: "s3",
      time: "18:00",
      date: "2025-05-20",
      hall: "Salon 1",
      hallType: "IMAX",
      price: 65,
      vipPrice: 85,
      availableSeats: 220,
      totalSeats: 300,
      features: ["IMAX", "Dolby Atmos"],
    },
    {
      id: "s4",
      time: "21:30",
      date: "2025-05-20",
      hall: "Salon 1",
      hallType: "IMAX",
      price: 65,
      vipPrice: 85,
      availableSeats: 45,
      totalSeats: 300,
      features: ["IMAX", "Dolby Atmos"],
    },
    {
      id: "s5",
      time: "15:00",
      date: "2025-05-20",
      hall: "Salon 2",
      hallType: "VIP",
      price: 55,
      vipPrice: 75,
      availableSeats: 78,
      totalSeats: 120,
      features: ["VIP Koltuk", "Premium Sound"],
    },
    {
      id: "s6",
      time: "19:30",
      date: "2025-05-20",
      hall: "Salon 2",
      hallType: "VIP",
      price: 55,
      vipPrice: 75,
      availableSeats: 32,
      totalSeats: 120,
      features: ["VIP Koltuk", "Premium Sound"],
    },
    {
      id: "s7",
      time: "22:15",
      date: "2025-05-20",
      hall: "Salon 3",
      hallType: "4DX",
      price: 75,
      vipPrice: 95,
      availableSeats: 25,
      totalSeats: 80,
      features: ["4DX", "Hareket Koltuğu"],
    },
  ]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}sa ${mins}dk`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };

  const getOccupancyStatus = (available: number, total: number) => {
    const occupancy = ((total - available) / total) * 100;
    if (occupancy >= 80)
      return {
        text: "Az Koltuk",
        color: "text-red-400",
        bgColor: "bg-red-500/20",
      };
    if (occupancy >= 60)
      return {
        text: "Dolmak Üzere",
        color: "text-orange-400",
        bgColor: "bg-orange-500/20",
      };
    return {
      text: "Müsait",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    };
  };

  const getHallIcon = (hallType: string) => {
    switch (hallType) {
      case "IMAX":
        return "🎭";
      case "VIP":
        return "👑";
      case "4DX":
        return "🎢";
      default:
        return "🎬";
    }
  };

  const getHallColor = (hallType: string) => {
    switch (hallType) {
      case "IMAX":
        return "border-yellow-500/50 bg-yellow-500/10";
      case "VIP":
        return "border-purple-500/50 bg-purple-500/10";
      case "4DX":
        return "border-blue-500/50 bg-blue-500/10";
      default:
        return "border-gray-500/50 bg-gray-500/10";
    }
  };

  // Group sessions by hall type
  const sessionsByHall = sessions.reduce((acc, session) => {
    if (!acc[session.hallType]) {
      acc[session.hallType] = [];
    }
    acc[session.hallType].push(session);
    return acc;
  }, {} as Record<string, Session[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href={`/cinema/${params.cinemaId}`}
                className="flex items-center space-x-3 text-white hover:text-purple-300 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Sinemaya Dön</span>
              </Link>
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
              <div className="w-32"></div>
            </div>
          </div>
        </header>

        {/* Movie & Cinema Info */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-12">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Movie Poster */}
                <div className="lg:w-64 flex-shrink-0">
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                    <button className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Play className="h-8 w-8" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Movie & Cinema Details */}
                <div className="lg:flex-1">
                  <div className="mb-6">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {movie.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-medium">{movie.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <span>{formatDuration(movie.duration)}</span>
                      </div>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">
                        {movie.ageRating}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-400">{movie.director}</span>
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {movie.description}
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {movie.genre.map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cinema Info */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-white font-semibold mb-3 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-purple-400" />
                      Sinema Bilgileri
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Sinema:</span>
                        <span className="text-white ml-2 font-medium">
                          {cinema.name}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Konum:</span>
                        <span className="text-white ml-2">
                          {cinema.city}, {cinema.district}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Puan:</span>
                        <span className="text-yellow-400 ml-2">
                          ★ {cinema.rating}/5.0
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Telefon:</span>
                        <span className="text-white ml-2">{cinema.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sessions by Hall Type */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Calendar className="h-6 w-6 mr-3 text-blue-400" />
                Seanslar
              </h2>
              <div className="text-gray-400 text-sm">
                20 Ocak 2024, Cumartesi
              </div>
            </div>

            <div className="space-y-8">
              {Object.entries(sessionsByHall).map(
                ([hallType, hallSessions], index) => (
                  <motion.div
                    key={hallType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-2xl p-6 border ${getHallColor(
                      hallType
                    )} backdrop-blur-md`}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-white flex items-center">
                        <span className="text-2xl mr-3">
                          {getHallIcon(hallType)}
                        </span>
                        {hallType} Seansları
                      </h3>
                      <div className="text-gray-400 text-sm">
                        {hallSessions.length} seans
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {hallSessions.map((session) => {
                        const occupancyStatus = getOccupancyStatus(
                          session.availableSeats,
                          session.totalSeats
                        );

                        return (
                          <motion.div
                            key={session.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-200">
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-2xl font-bold text-white">
                                {session.time}
                              </div>
                              <div
                                className={`px-2 py-1 rounded-lg text-xs font-medium ${occupancyStatus.bgColor} ${occupancyStatus.color}`}>
                                {occupancyStatus.text}
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">
                                  {session.hall}
                                </span>
                                <span className="text-gray-300">
                                  {session.availableSeats}/{session.totalSeats}{" "}
                                  koltuk
                                </span>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {session.features.map((feature) => (
                                  <span
                                    key={feature}
                                    className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Standart:</span>
                                <span className="text-emerald-400 font-medium">
                                  {formatPrice(session.price)}
                                </span>
                              </div>
                              {session.vipPrice > 0 && (
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-400">VIP:</span>
                                  <span className="text-yellow-400 font-medium">
                                    {formatPrice(session.vipPrice)}
                                  </span>
                                </div>
                              )}
                            </div>

                            <Link href={`/booking/${movie.id}/${session.id}`}>
                              <Button
                                className="w-full bg-purple-600 hover:bg-purple-700"
                                disabled={session.availableSeats === 0}>
                                <Ticket className="h-4 w-4 mr-2" />
                                {session.availableSeats === 0
                                  ? "Tükendi"
                                  : "Bilet Al"}
                              </Button>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {Object.keys(sessionsByHall).length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Seans bulunamadı
                </h3>
                <p className="text-gray-400">
                  Bu film için bugün seans bulunmamaktadır.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CinemaMovieSessionsPage;

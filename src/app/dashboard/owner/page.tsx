"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Film,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Edit,
  Save,
  X,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/stores/authStore";

interface CinemaInfo {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  description: string;
}

const OwnerDashboardPage = () => {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [cinemaInfo, setCinemaInfo] = useState<CinemaInfo>({
    name: "CinemaMaximum Bursa",
    address: "Odunluk, CarrefourSa No:57, 16110 Ni̇lüfer/Bursa",
    city: "Bursa",
    phone: "+90 224 452 83 00",
    email: "info@cinemaplus-bursa.com",
    description:
      "Modern sinema deneyimi sunan, son teknoloji ses ve görüntü sistemleri ile donatılmış premium sinema kompleksi.",
  });

  const [editForm, setEditForm] = useState<CinemaInfo>(cinemaInfo);

  const stats = [
    {
      title: "Toplam Salon",
      value: "5",
      icon: Building2,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      change: "+1 bu ay",
    },
    {
      title: "Aktif Film",
      value: "12",
      icon: Film,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      change: "+3 bu hafta",
    },
    {
      title: "Günlük Seans",
      value: "48",
      icon: Calendar,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      change: "16 salon başına",
    },
    {
      title: "Bu Ay Bilet",
      value: "2,847",
      icon: Users,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      change: "+18% geçen aya göre",
    },
    {
      title: "Bu Ay Gelir",
      value: "₺284,700",
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      change: "+22% geçen aya göre",
    },
    {
      title: "Doluluk Oranı",
      value: "%76",
      icon: TrendingUp,
      color: "text-pink-400",
      bgColor: "bg-pink-500/20",
      change: "Sektör ortalaması %65",
    },
  ];

  const recentActivities = [
    {
      title: "Yeni Film Eklendi",
      description: "Spider-Man: No Way Home filmi sisteme eklendi",
      time: "2 saat önce",
      type: "film",
    },
    {
      title: "Salon 3 Güncellendi",
      description: "VIP koltuklar eklenedi ve düzen değiştirildi",
      time: "5 saat önce",
      type: "hall",
    },
    {
      title: "Yeni Seanslar",
      description: "Hafta sonu için 24 yeni seans programlandı",
      time: "1 gün önce",
      type: "session",
    },
    {
      title: "Yüksek Doluluk",
      description: "Avatar 2 seansları %95 dolu",
      time: "2 gün önce",
      type: "booking",
    },
  ];

  const handleEdit = () => {
    setEditForm(cinemaInfo);
    setIsEditing(true);
  };

  const handleSave = () => {
    setCinemaInfo(editForm);
    setIsEditing(false); 
  };

  const handleCancel = () => {
    setEditForm(cinemaInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof CinemaInfo, value: string) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Hoş geldiniz, CinemaMaximum Bursa!
              </h1>
              <p className="text-gray-300">
                Sinema işletmenizin güncel durumunu buradan takip edebilirsiniz.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="border-white/30 text-white">
                Rapor İndir
              </Button>
              <Button>Yeni Seans Ekle</Button>
            </div>
          </div>
        </motion.div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.change}</div>
                </div>
              </div>
              <h3 className="text-white font-medium">{stat.title}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Sinema Bilgileri
              </h2>
              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="text-white hover:bg-white/10">
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancel}
                    className="text-white hover:bg-white/10">
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSave}
                    className="text-white hover:bg-white/10">
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {isEditing ? (
                <>
                  <Input
                    label="Sinema Adı"
                    value={editForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <Input
                    label="Adres"
                    value={editForm.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <Input
                    label="Şehir"
                    value={editForm.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <Input
                    label="Telefon"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <Input
                    label="E-posta"
                    value={editForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/5 border-white/20 text-white"
                  />
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={editForm.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-white font-medium">
                        {cinemaInfo.name}
                      </div>
                      <div className="text-gray-400 text-sm">Sinema Adı</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">
                        {cinemaInfo.address}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {cinemaInfo.city}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">
                        {cinemaInfo.phone}
                      </div>
                      <div className="text-gray-400 text-sm">Telefon</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-orange-400" />
                    <div>
                      <div className="text-white font-medium">
                        {cinemaInfo.email}
                      </div>
                      <div className="text-gray-400 text-sm">E-posta</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-white font-medium mb-2">Açıklama</div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {cinemaInfo.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">
              Son Aktiviteler
            </h2>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === "film"
                        ? "bg-purple-500/20"
                        : activity.type === "hall"
                        ? "bg-blue-500/20"
                        : activity.type === "session"
                        ? "bg-green-500/20"
                        : "bg-orange-500/20"
                    }`}>
                    {activity.type === "film" && (
                      <Film className="h-4 w-4 text-purple-400" />
                    )}
                    {activity.type === "hall" && (
                      <Building2 className="h-4 w-4 text-blue-400" />
                    )}
                    {activity.type === "session" && (
                      <Calendar className="h-4 w-4 text-green-400" />
                    )}
                    {activity.type === "booking" && (
                      <Users className="h-4 w-4 text-orange-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {activity.title}
                    </div>
                    <div className="text-gray-300 text-sm mt-1">
                      {activity.description}
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboardPage;

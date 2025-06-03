"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Users,
  Settings,
  Save,
  Grid3X3,
  Crown,
  Accessibility,
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Hall, HallForm, SeatType } from "@/types/cinema";

interface SeatPosition {
  row: string;
  number: number;
  type: SeatType;
  isActive: boolean;
}

const HallsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLayoutModal, setShowLayoutModal] = useState(false);
  const [editingHall, setEditingHall] = useState<Hall | null>(null);
  const [selectedHallForLayout, setSelectedHallForLayout] =
    useState<Hall | null>(null);

  const [formData, setFormData] = useState<HallForm>({
    name: "",
    rows: 10,
    seatsPerRow: 12,
    vipRows: [],
    disabledSeats: [],
    features: [],
  });

  const [seatLayout, setSeatLayout] = useState<SeatPosition[][]>([]);

  const [halls] = useState<Hall[]>([
    {
      id: "1",
      cinemaId: "cinema-1",
      name: "Salon 1 - IMAX",
      capacity: 250,
      seatLayout: [],
      features: ["IMAX", "Dolby Atmos", "Recliner Koltuk"],
      isActive: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      cinemaId: "cinema-1",
      name: "Salon 2 - VIP",
      capacity: 120,
      seatLayout: [],
      features: ["VIP Koltuk", "Waiter Service", "Premium Sound"],
      isActive: true,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-10",
    },
    {
      id: "3",
      cinemaId: "cinema-1",
      name: "Salon 3 - Standart",
      capacity: 180,
      seatLayout: [],
      features: ["Digital Sound", "Stadium Seating"],
      isActive: false,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-05",
    },
  ]);

  const availableFeatures = [
    "IMAX",
    "4DX",
    "Dolby Atmos",
    "Premium Sound",
    "Recliner Koltuk",
    "VIP Koltuk",
    "Stadium Seating",
    "Waiter Service",
    "Premium Snacks",
    "Digital Projection",
  ];

  const generateSeatLayout = (rows: number, seatsPerRow: number) => {
    const layout: SeatPosition[][] = [];

    for (let r = 0; r < rows; r++) {
      const rowLetter = String.fromCharCode(65 + r); // A, B, C, ...
      const row: SeatPosition[] = [];

      for (let s = 1; s <= seatsPerRow; s++) {
        row.push({
          row: rowLetter,
          number: s,
          type: SeatType.Standard,
          isActive: true,
        });
      }

      layout.push(row);
    }

    return layout;
  };

  const handleAddHall = () => {
    setFormData({
      name: "",
      rows: 10,
      seatsPerRow: 12,
      vipRows: [],
      disabledSeats: [],
      features: [],
    });
    setEditingHall(null);
    setShowAddModal(true);
  };

  const handleEditHall = (hall: Hall) => {
    setFormData({
      name: hall.name,
      rows: 10, // This would come from hall data
      seatsPerRow: 12, // This would come from hall data
      vipRows: [],
      disabledSeats: [],
      features: hall.features,
    });
    setEditingHall(hall);
    setShowAddModal(true);
  };

  const handleSaveHall = () => {
    console.log("Saving hall:", formData);
    setShowAddModal(false);
  };

  const handleDeleteHall = (hallId: string) => {
    console.log("Deleting hall:", hallId);
  };

  const handleEditLayout = (hall: Hall) => {
    setSelectedHallForLayout(hall);
    setSeatLayout(generateSeatLayout(10, 12)); // Default layout
    setShowLayoutModal(true);
  };

  const handleInputChange = (
    field: keyof HallForm,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const updateSeatLayout = () => {
    setSeatLayout(generateSeatLayout(formData.rows, formData.seatsPerRow));
  };

  const toggleSeatType = (rowIndex: number, seatIndex: number) => {
    setSeatLayout((prev) => {
      const newLayout = [...prev];
      const currentSeat = newLayout[rowIndex][seatIndex];

      // Cycle through seat types: Standard -> VIP -> Disabled -> Standard
      if (currentSeat.type === SeatType.Standard) {
        currentSeat.type = SeatType.VIP;
      } else if (currentSeat.type === SeatType.VIP) {
        currentSeat.type = SeatType.Disabled;
      } else {
        currentSeat.type = SeatType.Standard;
      }

      return newLayout;
    });
  };

  const getSeatIcon = (type: SeatType) => {
    switch (type) {
      case SeatType.VIP:
        return <Crown className="h-3 w-3" />;
      case SeatType.Disabled:
        return <Accessibility className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getSeatClass = (type: SeatType) => {
    switch (type) {
      case SeatType.VIP:
        return "bg-yellow-500 border-yellow-400 text-yellow-900";
      case SeatType.Disabled:
        return "bg-blue-500 border-blue-400 text-blue-900";
      default:
        return "bg-gray-600 border-gray-500 text-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Salon Yönetimi</h1>
            <p className="text-gray-300 mt-1">
              Sinema salonlarınızı ve oturma düzenlerini yönetin
            </p>
          </div>
          <Button onClick={handleAddHall}>
            <Plus className="h-4 w-4 mr-2" />
            Salon Ekle
          </Button>
        </div>

        {/* Halls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {halls.map((hall, index) => (
            <motion.div
              key={hall.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Building2 className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {hall.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">
                        {hall.capacity} kişi
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditLayout(hall)}
                    className="text-white hover:bg-white/10"
                    title="Düzen Düzenle">
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditHall(hall)}
                    className="text-white hover:bg-white/10">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteHall(hall.id)}
                    className="text-white hover:bg-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Durum</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hall.isActive
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}>
                    {hall.isActive ? "Aktif" : "Pasif"}
                  </span>
                </div>

                <div>
                  <span className="text-gray-300 text-sm block mb-2">
                    Özellikler
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {hall.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-400 pt-2 border-t border-white/10">
                  Oluşturma:{" "}
                  {new Date(hall.createdAt).toLocaleDateString("tr-TR")}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Hall Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title={editingHall ? "Salon Düzenle" : "Yeni Salon Ekle"}>
          <div className="space-y-4 p-4">
            <Input
              label="Salon Adı"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-white/5 border-white/20 text-white"
              placeholder="örn: Salon 1 - IMAX"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Sıra Sayısı"
                type="number"
                min="1"
                max="20"
                value={formData.rows}
                onChange={(e) =>
                  handleInputChange("rows", parseInt(e.target.value) || 0)
                }
                className="bg-white/5 border-white/20 text-white"
              />
              <Input
                label="Sıra Başına Koltuk"
                type="number"
                min="1"
                max="30"
                value={formData.seatsPerRow}
                onChange={(e) =>
                  handleInputChange(
                    "seatsPerRow",
                    parseInt(e.target.value) || 0
                  )
                }
                className="bg-white/5 border-white/20 text-white"
              />
            </div>

            <div className="p-1">
              <label className="block text-white text-sm font-medium mb-3">
                Salon Özellikleri
              </label>
              <div className="grid grid-cols-2 gap-2 ">
                {availableFeatures.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                      className="rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-white text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                variant="ghost"
                onClick={() => setShowAddModal(false)}
                className="text-white hover:bg-white/10">
                İptal
              </Button>
              <Button onClick={handleSaveHall}>
                <Save className="h-4 w-4 mr-2" />
                {editingHall ? "Güncelle" : "Kaydet"}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Seat Layout Modal */}
        <Modal
          isOpen={showLayoutModal}
          onClose={() => setShowLayoutModal(false)}
          title={`${selectedHallForLayout?.name} - Oturma Düzeni Tasarımı`}
          size="xl">
          <div className="space-y-8 p-4">
            {/* Header Section with Gradient */}
            <div className="relative bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 rounded-2xl p-6 border border-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl"></div>
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-2">
                  İnteraktif Koltuk Düzenleyicisi
                </h3>
                <p className="text-purple-200">
                  Koltukların üzerine tıklayarak türlerini değiştirebilirsiniz
                </p>
              </div>
            </div>

            {/* Modern Layout Controls */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-purple-400" />
                Salon Boyutları
              </h4>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-200">
                    Sıra Sayısı ({formData.rows})
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={formData.rows}
                      onChange={(e) => {
                        handleInputChange(
                          "rows",
                          parseInt(e.target.value) || 0
                        );
                        updateSeatLayout();
                      }}
                      className="w-full h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg appearance-none slider-thumb"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1</span>
                      <span>20</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-purple-200">
                    Sıra Başına Koltuk ({formData.seatsPerRow})
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={formData.seatsPerRow}
                      onChange={(e) => {
                        handleInputChange(
                          "seatsPerRow",
                          parseInt(e.target.value) || 0
                        );
                        updateSeatLayout();
                      }}
                      className="w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg appearance-none slider-thumb"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1</span>
                      <span>30</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capacity Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-xl border border-emerald-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-200 font-medium">
                      Toplam Kapasite
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-300">
                    {formData.rows * formData.seatsPerRow}
                  </span>
                </div>
              </div>
            </div>

            {/* Seat Type Legend - Enhanced */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Grid3X3 className="h-5 w-5 mr-2 text-blue-400" />
                Koltuk Türleri
              </h4>

              <div className="grid grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-xl border border-gray-500/30">
                  <div className="w-10 h-10 bg-gray-600 border-2 border-gray-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Standart</div>
                    <div className="text-gray-400 text-xs">Genel koltuklar</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-xl border border-yellow-500/30">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 border-2 border-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
                    <Crown className="h-5 w-5 text-yellow-900" />
                  </div>
                  <div>
                    <div className="text-white font-medium">VIP</div>
                    <div className="text-yellow-300 text-xs">
                      Premium koltuklar
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-blue-400 rounded-lg flex items-center justify-center shadow-lg">
                    <Accessibility className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      Engelli Erişimi
                    </div>
                    <div className="text-blue-300 text-xs">
                      Erişilebilir koltuklar
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Cinema Screen - Enhanced */}
            <div className="text-center">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative mx-auto max-w-2xl">
                <div className="h-16 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl border border-purple-400/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur-lg"></div>
                  <span className="relative text-white font-bold text-xl tracking-wider">
                    🎬 PERDE 🎬
                  </span>
                </div>
              </motion.div>
              <p className="text-purple-300 text-sm mt-2">
                Film gösterim ekranı
              </p>
            </div>

            {/* Interactive Seat Layout Grid - Enhanced */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <motion.div
                className="space-y-3 max-h-96 overflow-auto custom-scrollbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                {seatLayout.map((row, rowIndex) => (
                  <motion.div
                    key={rowIndex}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: rowIndex * 0.1 }}
                    className="flex items-center justify-center space-x-2">
                    {/* Row Label */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg border border-purple-400/50">
                      {String.fromCharCode(65 + rowIndex)}
                    </motion.div>

                    {/* Seats */}
                    <div className="flex space-x-1.5">
                      {row.map((seat, seatIndex) => (
                        <motion.button
                          key={`${seat.row}-${seat.number}`}
                          whileHover={{ scale: 1.15, rotateZ: 3 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSeatType(rowIndex, seatIndex)}
                          className={`relative w-10 h-10 rounded-xl border-2 transition-all duration-300 flex items-center justify-center text-xs font-bold shadow-lg hover:shadow-xl group ${getSeatClass(
                            seat.type
                          )}`}
                          title={`${seat.row}${seat.number} - ${
                            seat.type === SeatType.Standard
                              ? "Standart"
                              : seat.type === SeatType.VIP
                              ? "VIP"
                              : "Engelli Erişimi"
                          }`}>
                          {/* Seat Number or Icon */}
                          <span className="relative z-10">
                            {getSeatIcon(seat.type) || seat.number}
                          </span>

                          {/* Glow Effect */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Ripple Effect */}
                          <div className="absolute inset-0 rounded-xl bg-white/10 scale-0 group-active:scale-110 transition-transform duration-200"></div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats Bar */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-gray-600/20 rounded-lg p-3 text-center border border-gray-500/30">
                  <div className="text-lg font-bold text-gray-300">
                    {
                      seatLayout
                        .flat()
                        .filter((seat) => seat.type === SeatType.Standard)
                        .length
                    }
                  </div>
                  <div className="text-xs text-gray-400">Standart</div>
                </div>
                <div className="bg-yellow-600/20 rounded-lg p-3 text-center border border-yellow-500/30">
                  <div className="text-lg font-bold text-yellow-300">
                    {
                      seatLayout
                        .flat()
                        .filter((seat) => seat.type === SeatType.VIP).length
                    }
                  </div>
                  <div className="text-xs text-yellow-400">VIP</div>
                </div>
                <div className="bg-blue-600/20 rounded-lg p-3 text-center border border-blue-500/30">
                  <div className="text-lg font-bold text-blue-300">
                    {
                      seatLayout
                        .flat()
                        .filter((seat) => seat.type === SeatType.Disabled)
                        .length
                    }
                  </div>
                  <div className="text-xs text-blue-400">Engelli</div>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons - Enhanced */}
            <div className="flex justify-between items-center pt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-sm text-purple-300 bg-purple-600/20 px-4 py-2 rounded-lg border border-purple-500/30">
                💡 İpucu: Koltukların üzerine tıklayarak türlerini
                değiştirebilirsiniz
              </motion.div>

              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowLayoutModal(false)}
                  className="text-white hover:bg-red-600/20 hover:border-red-500/50 border border-white/20 px-6">
                  ❌ İptal
                </Button>
                <Button
                  onClick={() => {
                    console.log("Saving layout:", seatLayout);
                    setShowLayoutModal(false);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-400/50">
                  <Save className="h-4 w-4 mr-2" />✨ Düzeni Kaydet
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default HallsPage;

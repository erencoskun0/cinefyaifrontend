"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  CreditCard,
  Shield,
  Star,
  Crown,
  Accessibility,
  Building2,
  Ticket,
  AlertCircle,
  CheckCircle,
  User,
  Mail,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface Seat {
  row: string;
  number: number;
  type: "standard" | "vip" | "disabled";
  status: "available" | "occupied" | "selected";
  price: number;
}

interface BookingStep {
  id: number;
  title: string;
  description: string;
}

const BookingPage = () => {
  const params = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    createAccount: false,
    password: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    paymentMethod: "card",
  });

  const bookingSteps: BookingStep[] = [
    {
      id: 1,
      title: "Koltuk Seçimi",
      description: "İstediğiniz koltukları seçin",
    },
    {
      id: 2,
      title: "Kişisel Bilgiler",
      description: "İletişim bilgilerinizi girin",
    },
    {
      id: 3,
      title: "Ödeme",
      description: "Ödeme bilgilerinizi girin",
    },
    {
      id: 4,
      title: "Onay",
      description: "Rezervasyonunuzu onaylayın",
    },
  ];

  // Sample movie and session data
  const movieData = {
    title: "Avatar: The Way of Water",
    poster: "https://m.media-amazon.com/images/S/pv-target-images/f0535dd61f56bddd6ee7f3bfb765645e45d78f373418ae37ee5103cf6eebbff0.jpg",
    genre: ["Bilim Kurgu", "Aksiyon"],
    duration: 192,
    rating: 4.8,
    ageRating: "13+",
  };

  const sessionData = {
    date: "2025-05-20",
    time: "18:00",
    hall: "Salon 1 - IMAX",
    totalSeats: 250,
    standardPrice: 45,
    vipPrice: 65,
  };

  const generateSeatLayout = (): Seat[][] => {
    const layout: Seat[][] = [];
    const rows = 12;
    const seatsPerRow = 16;

    for (let r = 0; r < rows; r++) {
      const rowLetter = String.fromCharCode(65 + r);
      const row: Seat[] = [];

      for (let s = 1; s <= seatsPerRow; s++) {
        let type: "standard" | "vip" | "disabled" = "standard";
        let price = sessionData.standardPrice;

        if (r < 3) {
          type = "vip";
          price = sessionData.vipPrice;
        }

        if (r === 5 && (s === 1 || s === 2)) {
          type = "disabled";
          price = sessionData.standardPrice;
        }

        const isOccupied = Math.random() > 0.7;

        row.push({
          row: rowLetter,
          number: s,
          type,
          status: isOccupied ? "occupied" : "available",
          price,
        });
      }

      layout.push(row);
    }

    return layout;
  };

  const [seatLayout] = useState(generateSeatLayout());

  const handleSeatClick = (rowIndex: number, seatIndex: number) => {
    const seat = seatLayout[rowIndex][seatIndex];

    if (seat.status === "occupied") return;

    const seatId = `${seat.row}${seat.number}`;
    const isSelected = selectedSeats.some(
      (s) => `${s.row}${s.number}` === seatId
    );

    if (isSelected) {
      
      setSelectedSeats((prev) =>
        prev.filter((s) => `${s.row}${s.number}` !== seatId)
      );
      seat.status = "available";
    } else {

      if (selectedSeats.length < 8) {
        setSelectedSeats((prev) => [...prev, seat]);
        seat.status = "selected";
      }
    }
  };

  const getSeatIcon = (type: string) => {
    switch (type) {
      case "vip":
        return <Crown className="h-3 w-3" />;
      case "disabled":
        return <Accessibility className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getSeatClass = (seat: Seat) => {
    const baseClass =
      "w-8 h-8 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-xs font-bold cursor-pointer hover:scale-110";

    switch (seat.status) {
      case "occupied":
        return `${baseClass} bg-red-500 border-red-400 text-white cursor-not-allowed hover:scale-100`;
      case "selected":
        return `${baseClass} bg-purple-500 border-purple-400 text-white shadow-lg shadow-purple-500/50`;
      default:
        switch (seat.type) {
          case "vip":
            return `${baseClass} bg-yellow-500/20 border-yellow-400 text-yellow-300 hover:bg-yellow-500/30`;
          case "disabled":
            return `${baseClass} bg-blue-500/20 border-blue-400 text-blue-300 hover:bg-blue-500/30`;
          default:
            return `${baseClass} bg-gray-600/20 border-gray-500 text-gray-300 hover:bg-gray-600/30`;
        }
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleNextStep = () => {
    if (currentStep < bookingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", {
      selectedSeats,
      customerInfo,
      paymentInfo,
      total: calculateTotal(),
    });

    router.push("/booking/success");
  };

  const renderSeatSelection = () => (
    <div className="space-y-8">
  
      <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
        <div className="flex items-start space-x-4">
          <img
            src={movieData.poster}
            alt={movieData.title}
            className="w-20 h-28 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              {movieData.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{movieData.rating}</span>
              </div>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                {movieData.ageRating}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-400" />
                <span className="text-white">
                  {formatDate(sessionData.date)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-white">{sessionData.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-purple-400" />
                <span className="text-white">{sessionData.hall}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-orange-400" />
                <span className="text-white">
                  {sessionData.totalSeats} kişilik
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

 
      <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
        <h4 className="text-white font-medium mb-4">Koltuk Türleri</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-600/20 border-2 border-gray-500 rounded-lg"></div>
            <span className="text-gray-300 text-sm">
              Standart ({formatPrice(sessionData.standardPrice)})
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-yellow-500/20 border-2 border-yellow-400 rounded-lg flex items-center justify-center">
              <Crown className="h-3 w-3 text-yellow-400" />
            </div>
            <span className="text-gray-300 text-sm">
              VIP ({formatPrice(sessionData.vipPrice)})
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-red-500 border-2 border-red-400 rounded-lg"></div>
            <span className="text-gray-300 text-sm">Dolu</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-purple-500 border-2 border-purple-400 rounded-lg"></div>
            <span className="text-gray-300 text-sm">Seçili</span>
          </div>
        </div>
      </div>

  
      <div className="text-center">
        <div className="w-full max-w-md mx-auto h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl border border-purple-400/50 mb-8">
          <span className="text-white font-bold text-lg">🎬 PERDE 🎬</span>
        </div>
      </div>

    
      <div className="bg-white/5 rounded-2xl p-8 border border-white/20">
        <div className="max-h-96 overflow-auto custom-scrollbar">
          <div className="space-y-2">
            {seatLayout.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex items-center justify-center space-x-2">
                <div className="w-8 text-center text-gray-300 font-medium">
                  {String.fromCharCode(65 + rowIndex)}
                </div>
                <div className="flex space-x-1">
                  {row.slice(0, 6).map((seat, seatIndex) => (
                    <button
                      key={`${seat.row}-${seat.number}`}
                      onClick={() => handleSeatClick(rowIndex, seatIndex)}
                      className={getSeatClass(seat)}
                      disabled={seat.status === "occupied"}
                      title={`${seat.row}${seat.number} - ${
                        seat.type
                      } ${formatPrice(seat.price)}`}>
                      {getSeatIcon(seat.type) || seat.number}
                    </button>
                  ))}
                </div>
                <div className="w-8"></div> 
                <div className="flex space-x-1">
                  {row.slice(6).map((seat, seatIndex) => (
                    <button
                      key={`${seat.row}-${seat.number}`}
                      onClick={() => handleSeatClick(rowIndex, seatIndex + 6)}
                      className={getSeatClass(seat)}
                      disabled={seat.status === "occupied"}
                      title={`${seat.row}${seat.number} - ${
                        seat.type
                      } ${formatPrice(seat.price)}`}>
                      {getSeatIcon(seat.type) || seat.number}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {selectedSeats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-500/30">
          <h4 className="text-white font-medium mb-4">Seçili Koltuklar</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {selectedSeats.map((seat) => (
              <div
                key={`${seat.row}${seat.number}`}
                className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <span className="text-white font-medium">
                  {seat.row}
                  {seat.number}
                </span>
                <span className="text-emerald-400">
                  {formatPrice(seat.price)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/20">
            <span className="text-lg font-medium text-white">Toplam:</span>
            <span className="text-2xl font-bold text-emerald-400">
              {formatPrice(calculateTotal())}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );

  const renderCustomerInfo = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">
          Kişisel Bilgiler
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Ad"
            value={customerInfo.firstName}
            onChange={(e) =>
              setCustomerInfo((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className="bg-white/5 border-white/20 text-white"
            placeholder="Adınızı girin"
          />

          <Input
            label="Soyad"
            value={customerInfo.lastName}
            onChange={(e) =>
              setCustomerInfo((prev) => ({ ...prev, lastName: e.target.value }))
            }
            className="bg-white/5 border-white/20 text-white"
            placeholder="Soyadınızı girin"
          />

          <Input
            label="E-posta"
            type="email"
            value={customerInfo.email}
            onChange={(e) =>
              setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))
            }
            className="bg-white/5 border-white/20 text-white"
            placeholder="E-posta adresinizi girin"
          />

          <Input
            label="Telefon"
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))
            }
            className="bg-white/5 border-white/20 text-white"
            placeholder="Telefon numaranızı girin"
          />
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={customerInfo.createAccount}
              onChange={(e) =>
                setCustomerInfo((prev) => ({
                  ...prev,
                  createAccount: e.target.checked,
                }))
              }
              className="rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
            />
            <span className="text-blue-300">Hesap oluştur (isteğe bağlı)</span>
          </label>

          {customerInfo.createAccount && (
            <div className="mt-4">
              <div className="relative">
                <Input
                  label="Şifre"
                  type={showPassword ? "text" : "password"}
                  value={customerInfo.password}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="bg-white/5 border-white/20 text-white pr-12"
                  placeholder="Şifrenizi girin"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-white">
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">
          Ödeme Bilgileri
        </h3>

        <div className="space-y-6">
          {paymentInfo.paymentMethod === "card" && (
            <div className="space-y-4">
              <Input
                label="Kart Numarası"
                value={paymentInfo.cardNumber}
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    cardNumber: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
                placeholder="1234 5678 9012 3456"
              />

              <Input
                label="Kart Sahibi"
                value={paymentInfo.cardName}
                onChange={(e) =>
                  setPaymentInfo((prev) => ({
                    ...prev,
                    cardName: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/20 text-white"
                placeholder="Kartın üzerindeki isim"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Son Kullanma"
                  value={paymentInfo.expiryDate}
                  onChange={(e) =>
                    setPaymentInfo((prev) => ({
                      ...prev,
                      expiryDate: e.target.value,
                    }))
                  }
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="MM/YY"
                />

                <Input
                  label="CVV"
                  value={paymentInfo.cvv}
                  onChange={(e) =>
                    setPaymentInfo((prev) => ({ ...prev, cvv: e.target.value }))
                  }
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="123"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/30 flex items-center space-x-3">
          <Shield className="h-5 w-5 text-green-400" />
          <span className="text-green-300 text-sm">
            Ödeme bilgileriniz SSL ile şifrelenmektedir
          </span>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">
          Rezervasyon Özeti
        </h3>

        <div className="space-y-6">
     
          <div className="flex items-start space-x-4">
            <img
              src={movieData.poster}
              alt={movieData.title}
              className="w-16 h-22 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="text-lg font-medium text-white">
                {movieData.title}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mt-2">
                <span>{formatDate(sessionData.date)}</span>
                <span>{sessionData.time}</span>
                <span>{sessionData.hall}</span>
                <span>{selectedSeats.length} kişi</span>
              </div>
            </div>
          </div>

 
          <div>
            <h5 className="text-white font-medium mb-3">Seçili Koltuklar</h5>
            <div className="grid grid-cols-4 gap-2">
              {selectedSeats.map((seat) => (
                <div
                  key={`${seat.row}${seat.number}`}
                  className="bg-white/10 rounded-lg p-2 text-center">
                  <span className="text-white text-sm">
                    {seat.row}
                    {seat.number}
                  </span>
                </div>
              ))}
            </div>
          </div>


          <div>
            <h5 className="text-white font-medium mb-3">Müşteri Bilgileri</h5>
            <div className="bg-white/10 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Ad Soyad:</span>
                <span className="text-white">
                  {customerInfo.firstName} {customerInfo.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">E-posta:</span>
                <span className="text-white">{customerInfo.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Telefon:</span>
                <span className="text-white">{customerInfo.phone}</span>
              </div>
            </div>
          </div>


          <div>
            <h5 className="text-white font-medium mb-3">Fiyat Detayı</h5>
            <div className="bg-white/10 rounded-lg p-4 space-y-2">
              {selectedSeats.map((seat) => (
                <div
                  key={`${seat.row}${seat.number}`}
                  className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {seat.row}
                    {seat.number} ({seat.type})
                  </span>
                  <span className="text-white">{formatPrice(seat.price)}</span>
                </div>
              ))}
              <div className="border-t border-white/20 pt-2 mt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">Toplam:</span>
                  <span className="text-emerald-400">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderSeatSelection();
      case 2:
        return renderCustomerInfo();
      case 3:
        return renderPayment();
      case 4:
        return renderConfirmation();
      default:
        return renderSeatSelection();
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return selectedSeats.length > 0;
      case 2:
        return (
          customerInfo.firstName &&
          customerInfo.lastName &&
          customerInfo.email &&
          customerInfo.phone
        );
      case 3:
        return (
          paymentInfo.paymentMethod &&
          (paymentInfo.paymentMethod !== "card" ||
            (paymentInfo.cardNumber &&
              paymentInfo.cardName &&
              paymentInfo.expiryDate &&
              paymentInfo.cvv))
        );
      case 4:
        return true;
      default:
        return false;
    }
  };

  console.log(
    "Current booking for movie:",
    params.movieId,
    "session:",
    params.sessionId
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
  
        <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/movies"
                className="flex items-center space-x-3 text-white hover:text-purple-300 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Filmlere Dön</span>
              </Link>
              <h1 className="text-xl font-semibold text-white">
                Bilet Rezervasyonu
              </h1>
              <div className="w-24"></div>
            </div>
          </div>
        </header>


        <div className="bg-white/5 backdrop-blur-md border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {bookingSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center space-x-3 ${
                      index < bookingSteps.length - 1 ? "flex-1" : ""
                    }`}>
                    <div
                      className={`w-10 h-10 flex-shrink-0  rounded-full flex items-center justify-center transition-colors ${
                        step.id <= currentStep
                          ? "bg-purple-600 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}>
                      {step.id < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <div className="hidden md:block">
                      <div
                        className={`text-sm font-medium ${
                          step.id <= currentStep
                            ? "text-white"
                            : "text-gray-400"
                        }`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < bookingSteps.length - 1 && (
                    <div
                      className={`hidden md:block flex-1 h-px mx-4 ${
                        step.id < currentStep ? "bg-purple-600" : "bg-gray-600"
                      }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}>
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>

            <div className="flex items-center space-x-4">
              {currentStep < bookingSteps.length ? (
                <Button
                  onClick={handleNextStep}
                  disabled={!canProceedToNextStep()}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  Devam Et
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleConfirmBooking}
                  className="bg-green-600 hover:bg-green-700">
                  <Ticket className="h-4 w-4 mr-2" />
                  Rezervasyonu Onayla
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingPage;

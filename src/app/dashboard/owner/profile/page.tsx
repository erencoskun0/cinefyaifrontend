"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Save,
  Edit3,
  Eye,
  EyeOff,
  Building2,
  Calendar,
  Settings,
  Lock,
  Smartphone,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUser } from "@/contexts/UserContext";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  companyName: string;
  position: string;
  bio: string;
  avatar: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  systemUpdates: boolean;
}

export default function ProfilePage() {
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: user?.firstName || "Eren",
    lastName: user?.lastName || "Coşkun",
    email: user?.email || "eren@cinefyai.com",
    phone: "+90 532 123 45 67",
    address: "Beşiktaş Caddesi No: 123",
    city: "İstanbul",
    country: "Türkiye",
    companyName: "CinefyAI",
    position: "Sinema Yöneticisi",
    bio: "10 yıllık deneyime sahip sinema endüstrisi uzmanı. Film teknolojileri ve müşteri deneyimi konularında uzmanlaşmış.",
    avatar:
      user?.avatar ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    systemUpdates: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update user context
    updateUser({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      avatar: profileData.avatar,
    });

    setIsSaving(false);
    setIsEditing(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Yeni şifreler eşleşmiyor!");
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    alert("Şifre başarıyla değiştirildi!");
  };

  const tabs = [
    { id: "personal", label: "Kişisel Bilgiler", icon: User },
    { id: "security", label: "Güvenlik", icon: Shield },
    { id: "notifications", label: "Bildirimler", icon: Bell },
    { id: "company", label: "Şirket Bilgileri", icon: Building2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Profil Ayarları
          </h1>
          <p className="text-gray-300">
            Hesap bilgilerinizi ve tercihlerinizi yönetin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-purple-500/50"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-white font-semibold text-lg">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-gray-400 text-sm">{profileData.position}</p>
                <p className="text-purple-400 text-sm">
                  {profileData.companyName}
                </p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-purple-600 text-white"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}>
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Kişisel Bilgiler
                    </h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? "outline" : "primary"}
                      className="bg-purple-600 hover:bg-purple-700">
                      <Edit3 className="h-4 w-4 mr-2" />
                      {isEditing ? "İptal" : "Düzenle"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ad
                      </label>
                      <Input
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Soyad
                      </label>
                      <Input
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        E-posta
                      </label>
                      <Input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/5 border-white/20 text-white"
                        leftIcon={<Mail className="h-4 w-4" />}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Telefon
                      </label>
                      <Input
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/5 border-white/20 text-white"
                        leftIcon={<Phone className="h-4 w-4" />}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Adres
                      </label>
                      <Input
                        value={profileData.address}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            address: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/5 border-white/20 text-white"
                        leftIcon={<MapPin className="h-4 w-4" />}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Şehir
                      </label>
                      <Input
                        value={profileData.city}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            city: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Ülke
                      </label>
                      <Input
                        value={profileData.country}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            country: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        className="bg-white/5 border-white/20 text-white"
                        leftIcon={<Globe className="h-4 w-4" />}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Biyografi
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end mt-6">
                      <Button
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="bg-purple-600 hover:bg-purple-700">
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Kaydediliyor...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Kaydet
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Güvenlik Ayarları
                  </h2>

                  {/* Password Change */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Şifre Değiştir
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Mevcut Şifre
                        </label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                currentPassword: e.target.value,
                              })
                            }
                            className="bg-white/5 border-white/20 text-white pr-12"
                            leftIcon={<Lock className="h-4 w-4" />}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Yeni Şifre
                        </label>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) =>
                              setPasswordData({
                                ...passwordData,
                                newPassword: e.target.value,
                              })
                            }
                            className="bg-white/5 border-white/20 text-white pr-12"
                            leftIcon={<Lock className="h-4 w-4" />}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Yeni Şifre (Tekrar)
                        </label>
                        <Input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="bg-white/5 border-white/20 text-white"
                          leftIcon={<Lock className="h-4 w-4" />}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handlePasswordChange}
                      disabled={
                        !passwordData.currentPassword ||
                        !passwordData.newPassword ||
                        !passwordData.confirmPassword
                      }
                      className="mt-4 bg-purple-600 hover:bg-purple-700">
                      Şifreyi Değiştir
                    </Button>
                  </div>

                  {/* Two Factor Authentication */}
                  <div className="border-t border-white/20 pt-8">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      İki Faktörlü Doğrulama
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-white font-medium">
                            SMS Doğrulama
                          </p>
                          <p className="text-gray-400 text-sm">
                            Giriş yaparken SMS kodu iste
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            setSecuritySettings({
                              ...securitySettings,
                              twoFactorAuth: !securitySettings.twoFactorAuth,
                            })
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            securitySettings.twoFactorAuth
                              ? "bg-purple-600"
                              : "bg-gray-600"
                          }`}>
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              securitySettings.twoFactorAuth
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {securitySettings.twoFactorAuth && (
                      <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-400" />
                          <span className="text-green-400 text-sm">
                            İki faktörlü doğrulama aktif. Hesabınız ekstra
                            güvende!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Bildirim Tercihleri
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <div>
                          <p className="text-white font-medium">
                            E-posta Bildirimleri
                          </p>
                          <p className="text-gray-400 text-sm">
                            Önemli güncellemeler için e-posta al
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({
                            ...securitySettings,
                            emailNotifications:
                              !securitySettings.emailNotifications,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          securitySettings.emailNotifications
                            ? "bg-purple-600"
                            : "bg-gray-600"
                        }`}>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            securitySettings.emailNotifications
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-green-400" />
                        <div>
                          <p className="text-white font-medium">
                            SMS Bildirimleri
                          </p>
                          <p className="text-gray-400 text-sm">
                            Acil durumlar için SMS al
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({
                            ...securitySettings,
                            smsNotifications:
                              !securitySettings.smsNotifications,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          securitySettings.smsNotifications
                            ? "bg-purple-600"
                            : "bg-gray-600"
                        }`}>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            securitySettings.smsNotifications
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-yellow-400" />
                        <div>
                          <p className="text-white font-medium">
                            Pazarlama E-postaları
                          </p>
                          <p className="text-gray-400 text-sm">
                            Kampanya ve özel teklifler
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({
                            ...securitySettings,
                            marketingEmails: !securitySettings.marketingEmails,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          securitySettings.marketingEmails
                            ? "bg-purple-600"
                            : "bg-gray-600"
                        }`}>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            securitySettings.marketingEmails
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/20">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-5 w-5 text-purple-400" />
                        <div>
                          <p className="text-white font-medium">
                            Sistem Güncellemeleri
                          </p>
                          <p className="text-gray-400 text-sm">
                            Platform yenilikleri ve bakım bildirimleri
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({
                            ...securitySettings,
                            systemUpdates: !securitySettings.systemUpdates,
                          })
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          securitySettings.systemUpdates
                            ? "bg-purple-600"
                            : "bg-gray-600"
                        }`}>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            securitySettings.systemUpdates
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Company Tab */}
              {activeTab === "company" && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Şirket Bilgileri
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Şirket Adı
                      </label>
                      <Input
                        value={profileData.companyName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            companyName: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/20 text-white"
                        leftIcon={<Building2 className="h-4 w-4" />}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Pozisyon
                      </label>
                      <Input
                        value={profileData.position}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            position: e.target.value,
                          })
                        }
                        className="bg-white/5 border-white/20 text-white"
                        leftIcon={<User className="h-4 w-4" />}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Çalışma Başlangıç Tarihi
                      </label>
                      <Input
                        type="date"
                        defaultValue="2020-01-15"
                        className="bg-white/5 border-white/20 text-white"
                        leftIcon={<Calendar className="h-4 w-4" />}
                      />
                    </div>
                  </div>

                  {/* Company Stats */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-lg border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 text-sm">Toplam Satış</p>
                          <p className="text-2xl font-bold text-white">
                            ₺125,450
                          </p>
                        </div>
                        <CreditCard className="h-8 w-8 text-purple-400" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-lg border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 text-sm">
                            Aktif Sinemalar
                          </p>
                          <p className="text-2xl font-bold text-white">3</p>
                        </div>
                        <Building2 className="h-8 w-8 text-green-400" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-lg border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-300 text-sm">
                            Müşteri Sayısı
                          </p>
                          <p className="text-2xl font-bold text-white">1,247</p>
                        </div>
                        <User className="h-8 w-8 text-yellow-400" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

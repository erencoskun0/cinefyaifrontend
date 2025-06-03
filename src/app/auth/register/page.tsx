"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ArrowLeft,
  Building2,
  Crown,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserRole } from "@/types/auth";
import { useAuthStore } from "@/stores/authStore";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

const RegisterPage = () => {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: UserRole.User,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Ad soyad gereklidir";
    }

    if (!formData.email) {
      newErrors.email = "E-posta adresi gereklidir";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }

    if (!formData.password) {
      newErrors.password = "Şifre gereklidir";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı gereklidir";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      router.push("/dashboard");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Kayıt olurken bir hata oluştu";
      setErrors({
        general: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center text-white hover:text-gray-300 mb-8 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Ana Sayfaya Dön
        </Link>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/cinefyLogo.png"
                alt="CinefyAI Logo"
                width={60}
                height={60}
                className="rounded-xl"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Hesap Oluşturun
            </h1>
            <p className="text-gray-300">
              CinefyAI&apos;ye katılın ve sinema deneyiminizi kişiselleştirin
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {errors.general && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-red-300 text-sm">{errors.general}</p>
              </motion.div>
            )}

            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Hesap Türü
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRoleChange(UserRole.User)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === UserRole.User
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-white/20 bg-white/5 hover:border-white/30"
                  }`}>
                  <UserCheck className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-white font-medium">Kullanıcı</div>
                  <div className="text-gray-300 text-xs">Film izlemek için</div>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRoleChange(UserRole.CinemaOwner)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === UserRole.CinemaOwner
                      ? "border-blue-500 bg-blue-500/20"
                      : "border-white/20 bg-white/5 hover:border-white/30"
                  }`}>
                  <Building2 className="h-8 w-8 text-white mx-auto mb-2" />
                  <div className="text-white font-medium">Sinema Sahibi</div>
                  <div className="text-gray-300 text-xs">
                    Sinema yönetmek için
                  </div>
                </motion.button>
              </div>
            </div>

            <div>
              <Input
                type="text"
                name="fullName"
                placeholder="Ad ve soyadınızı girin"
                value={formData.fullName}
                onChange={handleChange}
                leftIcon={<User className="h-5 w-5" />}
                error={errors.fullName}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                placeholder="E-posta adresinizi girin"
                value={formData.email}
                onChange={handleChange}
                leftIcon={<Mail className="h-5 w-5" />}
                error={errors.email}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Input
                name="password"
                placeholder="Şifrenizi girin"
                value={formData.password}
                onChange={handleChange}
                leftIcon={<Lock className="h-5 w-5" />}
                isPassword
                error={errors.password}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <Input
                name="confirmPassword"
                placeholder="Şifrenizi tekrar girin"
                value={formData.confirmPassword}
                onChange={handleChange}
                leftIcon={<Lock className="h-5 w-5" />}
                isPassword
                error={errors.confirmPassword}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              className="mt-8">
              {formData.role === UserRole.CinemaOwner ? (
                <>
                  <Crown className="h-5 w-5 mr-2" />
                  Sinema Hesabı Oluştur
                </>
              ) : (
                <>
                  <UserCheck className="h-5 w-5 mr-2" />
                  Hesap Oluştur
                </>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/10 text-gray-300 rounded-full">
                veya
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-300">
              Zaten hesabınız var mı?{" "}
              <Link
                href="/auth/login"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Giriş yapın
              </Link>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Hesap oluşturarak{" "}
            <Link
              href="/terms"
              className="text-purple-400 hover:text-purple-300">
              Kullanım Şartları
            </Link>{" "}
            ve{" "}
            <Link
              href="/privacy"
              className="text-purple-400 hover:text-purple-300">
              Gizlilik Politikası
            </Link>
            &apos;nı kabul etmiş olursunuz.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;

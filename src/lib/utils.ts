import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string,
  locale: string = "tr-TR"
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeString: string): string {
  return timeString.slice(0, 5); 
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} dk`;
  }

  if (remainingMinutes === 0) {
    return `${hours} sa`;
  }

  return `${hours} sa ${remainingMinutes} dk`;
}

export function formatCurrency(
  amount: number,
  currency: string = "TRY"
): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function generateSeatLabel(row: string, number: number): string {
  return `${row}${number}`;
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getImageUrl(imageUrl: string): string {
  if (!imageUrl) return "/placeholder-movie.svg";

  if (imageUrl.startsWith("/uploads/")) {
    return `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
  }

  return imageUrl;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push("Şifre en az 6 karakter olmalıdır");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Şifre en az bir büyük harf içermelidir");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Şifre en az bir küçük harf içermelidir");
  }

  if (!/\d/.test(password)) {
    errors.push("Şifre en az bir rakam içermelidir");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isToday(dateString: string): boolean {
  const today = new Date();
  const date = new Date(dateString);

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isTomorrow(dateString: string): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(dateString);

  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
}

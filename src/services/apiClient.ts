import { ApiError } from "@/types/api";

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://localhost:6500";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Token'ı localStorage'dan al ve header'a ekle
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token && config.headers) {
        (
          config.headers as Record<string, string>
        ).Authorization = `Bearer ${token}`;
      }
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Bir hata oluştu",
        }));

        const error: ApiError = {
          message: errorData.message || "Bir hata oluştu",
          status: response.status,
          details: errorData.details,
        };

        throw error;
      }

      // Empty response (204 No Content) için özel durum
      if (response.status === 204) {
        return {} as T;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw {
          message:
            "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.",
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    let url = endpoint;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });

      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }
    }

    return this.request<T>(url, {
      method: "GET",
    });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }

  // FormData için özel POST request
  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;

    const config: RequestInit = {
      method: "POST",
      body: formData,
    };

    // Token'ı header'a ekle (Content-Type'ı browser otomatik set edecek)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Bir hata oluştu",
        }));

        const error: ApiError = {
          message: errorData.message || "Bir hata oluştu",
          status: response.status,
          details: errorData.details,
        };

        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw {
          message:
            "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.",
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  // FormData için özel PUT request
  async putFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;

    const config: RequestInit = {
      method: "PUT",
      body: formData,
    };

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Bir hata oluştu",
        }));

        throw {
          message: errorData.message || "Bir hata oluştu",
          status: response.status,
          details: errorData.details,
        } as ApiError;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw {
          message:
            "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.",
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  // Error handler
  handleError(error: ApiError) {
    console.error("API Error:", error);

    switch (error.status) {
      case 401:
        // Token expired, redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/auth/login";
        }
        break;
      case 403:
        // Insufficient permissions
        console.warn("Yetkisiz erişim:", error.message);
        break;
      case 404:
        console.warn("Kaynak bulunamadı:", error.message);
        break;
      case 500:
        console.error("Sunucu hatası:", error.message);
        break;
      default:
        console.error("Bilinmeyen hata:", error.message);
    }

    return error;
  }
}

export const apiClient = new ApiClient();

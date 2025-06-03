export interface ApiError {
  message: string;
  status?: number;
  details?: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: "user" | "bot";
  timestamp: string;
  type?: "text" | "movie_suggestion" | "booking_help";
}

export interface ChatbotResponse {
  message: string;
  suggestions?: MovieSuggestion[];
  actionType?: "movie_recommendation" | "booking_assistance" | "general_help";
}

export interface MovieSuggestion {
  movieId: string;
  title: string;
  reason: string;
  confidence: number;
}

// Theme tipi
export type Theme = "light" | "dark" | "system";

// Notification tipi
export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

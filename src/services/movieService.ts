import { apiClient } from "./apiClient";
import {
  MovieListParams,
  MovieListResponse,
  MovieDetail,
  CreateMovieForm,
  UpdateMovieForm,
  MovieListItem,
  Seat,
  Hall,
  BookingRequest,
  Ticket,
} from "@/types/movie";

export class MovieService {

  async getMovies(params: MovieListParams = {}): Promise<MovieListResponse> {
    return await apiClient.get<MovieListResponse>("/movies", params);
  }


  async getMovie(id: string): Promise<MovieDetail> {
    return await apiClient.get<MovieDetail>(`/movies/${id}`);
  }


  async createMovie(data: CreateMovieForm): Promise<MovieListItem> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else if (key === "releaseDate" && value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    return await apiClient.postFormData<MovieListItem>("/movies", formData);
  }

  async updateMovie(id: string, data: UpdateMovieForm): Promise<MovieListItem> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else if (key === "releaseDate" && value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    return await apiClient.putFormData<MovieListItem>(
      `/movies/${id}`,
      formData
    );
  }

  async deleteMovie(id: string): Promise<{ message: string }> {
    return await apiClient.delete(`/movies/${id}`);
  }

  async getPopularMovies(limit: number = 10): Promise<MovieListItem[]> {
    const response = await this.getMovies({ pageSize: limit });
    return response.data;
  }

  async getUpcomingMovies(limit: number = 10): Promise<MovieListItem[]> {
    const today = new Date().toISOString().split("T")[0];
    // Backend'de tarih filtreleme olması gerekir, şimdilik normal listeyi döndürüyoruz
    const response = await this.getMovies({ pageSize: limit });
    return response.data.filter(
      (movie) => movie.releaseDate && new Date(movie.releaseDate) > new Date()
    );
  }

  async getMoviesByGenre(
    genre: string,
    limit: number = 10
  ): Promise<MovieListItem[]> {
    const response = await this.getMovies({ genre, pageSize: limit });
    return response.data;
  }

  async searchMovies(
    query: string,
    page: number = 1
  ): Promise<MovieListResponse> {
    return await this.getMovies({ search: query, page });
  }

  getGenres(): string[] {
    return [
      "Aksiyon",
      "Macera",
      "Animasyon",
      "Komedi",
      "Suç",
      "Belgesel",
      "Drama",
      "Aile",
      "Fantastik",
      "Korku",
      "Müzik",
      "Gizem",
      "Romantik",
      "Bilim Kurgu",
      "Gerilim",
      "Savaş",
      "Western",
    ];
  }

  getAgeRestrictions(): string[] {
    return ["Genel İzleyici", "7+", "13+", "15+", "18+"];
  }

  async getSeatingPlan(showId: string): Promise<Hall> {
    return await apiClient.get<Hall>(`/shows/${showId}/seats`);
  }
  async bookTickets(bookingData: BookingRequest): Promise<Ticket> {
    return await apiClient.post<Ticket>("/bookings", bookingData);
  }

  async getUserTickets(): Promise<Ticket[]> {
    return await apiClient.get<Ticket[]>("/bookings/my-tickets");
  }

  async getTicket(ticketId: string): Promise<Ticket> {
    return await apiClient.get<Ticket>(`/bookings/${ticketId}`);
  }

  async addReview(
    movieId: string,
    rating: number,
    comment: string
  ): Promise<{ message: string }> {
    return await apiClient.post(`/movies/${movieId}/reviews`, {
      rating,
      comment,
    });
  }

  async getAIRecommendations(userId?: string): Promise<MovieListItem[]> {
    const endpoint = userId
      ? `/ai/recommendations/${userId}`
      : "/ai/recommendations";
    return await apiClient.get<MovieListItem[]>(endpoint);
  }

  async getMovieStats(movieId: string): Promise<{
    totalBookings: number;
    totalRevenue: number;
    averageRating: number;
    totalReviews: number;
  }> {
    return await apiClient.get(`/movies/${movieId}/stats`);
  }
}

export const movieService = new MovieService();

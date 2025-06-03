export interface MovieListParams {
  page?: number;
  pageSize?: number;
  genre?: string;
  search?: string;
}

export interface MovieListItem {
  id: string;
  title: string;
  genre: string;
  duration: number;
  description: string;
  releaseDate?: string;
  director: string;
  cast: string;
  language: string;
  country: string;
  ageRestriction: string;
  trailerUrl: string;
  imageUrl: string;
  aiTags: string;
  isActive: boolean;
  createdAt: string;
}

export interface ShowInfo {
  id: string;
  showDate: string;
  startTime: string;
  endTime: string;
  hallName: string;
  cinemaName: string;
  availableSeats?: number;
  totalSeats?: number;
}

export interface ReviewInfo {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface MovieDetail extends MovieListItem {
  shows: ShowInfo[];
  reviews: ReviewInfo[];
}

export interface MovieListResponse {
  data: MovieListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateMovieForm {
  title: string;
  genre: string;
  duration: number;
  description: string;
  releaseDate?: Date;
  director: string;
  cast: string;
  language: string;
  country: string;
  ageRestriction: string;
  trailerUrl: string;
  aiTags: string;
  image?: File;
}

export interface UpdateMovieForm {
  title?: string;
  genre?: string;
  duration?: number;
  description?: string;
  releaseDate?: Date;
  director?: string;
  cast?: string;
  language?: string;
  country?: string;
  ageRestriction?: string;
  trailerUrl?: string;
  aiTags?: string;
  isActive?: boolean;
  image?: File;
}

// Seat ve Booking için ek tipler
export interface Seat {
  id: string;
  row: string;
  number: number;
  isAvailable: boolean;
  isSelected?: boolean;
  type: "normal" | "vip" | "premium";
  price: number;
}

export interface Hall {
  id: string;
  name: string;
  cinemaName: string;
  seats: Seat[];
  totalSeats: number;
  rows: number;
  seatsPerRow: number;
}

export interface BookingRequest {
  showId: string;
  seatIds: string[];
  totalPrice: number;
}

export interface Ticket {
  id: string;
  showId: string;
  seatIds: string[];
  movieTitle: string;
  showDate: string;
  startTime: string;
  hallName: string;
  cinemaName: string;
  seats: string[];
  totalPrice: number;
  bookingDate: string;
  qrCode?: string;
}

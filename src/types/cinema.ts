export interface Cinema {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  ownerId: string;
  description?: string;
  facilities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Hall {
  id: string;
  cinemaId: string;
  name: string;
  capacity: number;
  seatLayout: SeatRow[];
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SeatRow {
  row: string;
  seats: Seat[];
}

export interface Seat {
  number: number;
  type: SeatType;
  isActive: boolean;
}

export enum SeatType {
  Standard = "Standard",
  VIP = "VIP",
  Disabled = "Disabled",
}

export interface Session {
  id: string;
  movieId: string;
  hallId: string;
  date: string;
  time: string;
  price: number;
  vipPrice: number;
  availableSeats: number;
  totalSeats: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  movie?: {
    title: string;
    poster: string;
    duration: number;
    genre: string;
  };
  hall?: {
    name: string;
    capacity: number;
  };
}

export interface SessionAnalytics {
  sessionId: string;
  totalTickets: number;
  soldTickets: number;
  revenue: number;
  occupancyRate: number;
  seatMap: SeatStatus[];
}

export interface SeatStatus {
  row: string;
  number: number;
  status: "available" | "occupied" | "selected";
  customerName?: string;
  ticketId?: string;
}

export interface CinemaStats {
  totalSessions: number;
  totalTicketsSold: number;
  totalRevenue: number;
  averageOccupancy: number;
  topMovies: {
    movieId: string;
    title: string;
    ticketsSold: number;
    revenue: number;
  }[];
  recentBookings: {
    id: string;
    customerName: string;
    movieTitle: string;
    sessionDate: string;
    sessionTime: string;
    seatCount: number;
    totalAmount: number;
  }[];
}

export interface MovieForm {
  title: string;
  description: string;
  genre: string;
  duration: number;
  rating: number;
  director: string;
  cast: string[];
  poster: File | null;
  trailer?: string;
  releaseDate: string;
}

export interface HallForm {
  name: string;
  rows: number;
  seatsPerRow: number;
  vipRows: string[];
  disabledSeats: string[];
  features: string[];
}

export interface SessionForm {
  movieId: string;
  hallId: string;
  date: string;
  time: string;
  price: number;
  vipPrice: number;
}

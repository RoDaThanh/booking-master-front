export interface Seat {
    id: number;
    name: string;
    price: number;
    isBooked: boolean;
  }

  export interface BookingState {
    seats: Seat[];
    isLoading: boolean;
    error: string | null;
  }
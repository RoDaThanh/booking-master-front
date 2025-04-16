import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookingState, Seat } from './bookingTypes';
import { fetchSeatApi } from './bookingAPI';


const initialState: BookingState = {
    seats: [],
    isLoading: false,
    error: null,
};

export const fetchSeats = createAsyncThunk(
  "booking/fetchSeats",
  async () => {
    const response = await fetchSeatApi();
    return response;
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateSeatStatus: (state, action: PayloadAction<Seat>
    ) => {
      let seat = state.seats.find((seat: any) => seat.id === action.payload.id);
      if (seat && !seat.isBooked) {
        seat.isBooked = true;
      }
    },
  }, extraReducers: (builder) => {
    builder.addCase(fetchSeats.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSeats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.seats = action.payload;
    });
    builder.addCase(fetchSeats.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export const seatsSelector = (state: any) => state.booking.seats;

export const isLoadingSelector = (state: any) => state.booking.isLoading;

export const updateSeatStatus  = bookingSlice.actions.updateSeatStatus;

export default bookingSlice.reducer;

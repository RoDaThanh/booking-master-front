import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookingState } from './bookingTypes';
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
    addSeat: (state, action: PayloadAction<any>) => {
      state.seats.push(action.payload);
    },
    removeSeat: (state, action: PayloadAction<any>) => {
      state.seats = state.seats.filter((seat) => seat !== action.payload);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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

export const { addSeat, removeSeat, setIsLoading } = bookingSlice.actions;

export default bookingSlice.reducer;

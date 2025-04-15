import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchSeats,
  addSeat,
  removeSeat,
  seatsSelector,
  isLoadingSelector,} from '../features/booking/bookingSlice';
import { RootState } from '../app/store';
import { AppDispatch } from "../app/store";


const Seats = () => {
  const dispatch = useDispatch();
  const seats = useSelector((state: RootState) => seatsSelector(state));
  const isLoading = useSelector((state: RootState) => isLoadingSelector(state));

   useEffect(() => {
    dispatch(fetchSeats() as any);
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="seats-container">
      <h2>Select Your Seats</h2>
      <div className="seats-grid">
        {seats.map((seat: { number: number; isBooked: boolean; }, index: number) => (
          <Seat
            key={index}
            seatNumber={seat.number}
            isBooked={seat.isBooked} 
           
          />
        ))}
      </div>
    </div>
  );
};

const Seat = ({ seatNumber, isBooked }: { seatNumber: number; isBooked: boolean }) => {
  const seatClass = `seat ${isBooked ? 'booked' : 'available'}`;
  return (
    <div className={seatClass} >
      {seatNumber}
    </div>
  );
};

export default Seats;

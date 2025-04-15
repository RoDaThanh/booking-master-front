import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeats,
  addSeat,
  removeSeat,
  seatsSelector,
  isLoadingSelector,
} from "./bookingSlice";
import { AppDispatch } from "../../app/store";
import { Seat } from "./bookingTypes";

const SeatSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const availableSeats = useSelector(seatsSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  useEffect(() => {
    dispatch(fetchSeats() as any);
  }, [dispatch]);

  const handleToggleSeat = (seat: Seat) => {
    const isSelected = selectedSeats.find((s: { id: number; }) => s.id === seat.id);
    if (isSelected) {
      dispatch(removeSeat(seat));
      setSelectedSeats(selectedSeats.filter((s: { id: number; }) => s.id !== seat.id));
    } else {
      dispatch(addSeat(seat));
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Seat Selector</h2>
      {isLoading ? (
        <p>Loading seats...</p>
      ) : (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {availableSeats.map((seat: Seat) => {
            const isSelected = selectedSeats.some((s: { id: any; }) => s.id === seat.id);
            return (
              <button
                key={seat.id}
                onClick={() => handleToggleSeat(seat)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  backgroundColor: isSelected ? "#4caf50" : "#f0f0f0",
                  color: isSelected ? "white" : "black",
                  border: "1px solid #ccc",
                }}
              >
                {seat.name} - ${seat.price}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SeatSelector;

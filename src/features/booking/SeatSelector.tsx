import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeats,
  updateSeatStatus,
  seatsSelector,
  isLoadingSelector,
} from "./bookingSlice";
import { AppDispatch } from "../../app/store";
import { Seat } from "./bookingTypes";

const SeatSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const seats = useSelector(seatsSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(fetchSeats() as any);
  }, [dispatch]);

  const handleToggleSeat = (seat: Seat) => {
    dispatch(updateSeatStatus(seat));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Seat Selector</h2>
      {isLoading ? (
        <p>Loading seats...</p>
      ) : (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {seats.map((seat: Seat) => {
            return (
              <button
                key={seat.id}
                onClick={() => handleToggleSeat(seat)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  backgroundColor: seat.isBooked ? "#4caf50" : "#f0f0f0",
                  color: seat.isBooked ? "white" : "black",
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

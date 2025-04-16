  import { Seat } from "./bookingTypes";

export const fetchSeatApi = async (): Promise<Seat[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: "A1", price: 100, isBooked: false },
            { id: 2, name: "A2", price: 100, isBooked: false },
            { id: 3, name: "A3", price: 100, isBooked: false },
            { id: 4, name: "B1", price: 120, isBooked: false },
            { id: 5, name: "B2", price: 120, isBooked: false },
            { id: 6, name: "B3", price: 120, isBooked: false },
            { id: 7, name: "C1", price: 130, isBooked: true },
            { id: 8, name: "C2", price: 130, isBooked: false },
            { id: 9, name: "C3", price: 130, isBooked: false },
            { id: 10, name: "D1", price: 140, isBooked: false },
          ]);
        }, 1000); // simulate delay
      });
};

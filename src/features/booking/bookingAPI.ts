  import { Seat } from "./bookingTypes";

export const fetchSeatApi = async (): Promise<Seat[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: "A1", price: 100 },
            { id: 2, name: "A2", price: 100 },
            { id: 3, name: "A3", price: 100 },
            { id: 4, name: "B1", price: 120 },
            { id: 5, name: "B2", price: 120 },
            { id: 6, name: "B3", price: 120 },
          ]);
        }, 1000); // simulate delay
      });
};

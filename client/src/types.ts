
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  totalSeats: number;
  bookedSeats: number;
  imageUrl: string;
}

export interface Booking {
  _id: string;
  event: Event;
  user: string; // user ID
  createdAt: string;
}

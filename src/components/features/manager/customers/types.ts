// features/customers/types.ts

export interface Customer {
  id: string;
  customer: string;
  phone: string;
  email: string;
  cnic: string;
  bookings: number;
  investment: string;
  status: "ACTIVE" | "INACTIVE";
}
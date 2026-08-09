// features/customers/data.ts

import { Customer } from "./types";

export const customers: Customer[] = [
  {
    id: "1",
    customer: "Ahmed Khan",
    phone: "+92-321-1234567",
    email: "ahmed@example.com",
    cnic: "35201-1234567-1",
    bookings: 2,
    investment: "PKR 5.50M",
    status: "ACTIVE",
  },
  {
    id: "2",
    customer: "Fatima Ali",
    phone: "+92-322-7654321",
    email: "fatima@example.com",
    cnic: "35202-7654321-2",
    bookings: 1,
    investment: "PKR 3.00M",
    status: "ACTIVE",
  },
  {
    id: "3",
    customer: "Hassan Raza",
    phone: "+92-333-9876543",
    email: "hassan@example.com",
    cnic: "35203-9876543-3",
    bookings: 3,
    investment: "PKR 8.20M",
    status: "ACTIVE",
  },
];
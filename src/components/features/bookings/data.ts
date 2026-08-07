import { Booking } from "./types";

export const bookings: Booking[] = [
  {
    id: "1",
    bookingNo: "BK-2026-0001",
    customer: "Ahmed Khan",
    plot: "A-125",
    project: "Green Valley Housing Society",
    totalPrice: "PKR 3.00M",
    paid: 1200000,
    dueDate: "2026-06-15",
    status: "ACTIVE",
  },
  {
    id: "2",
    bookingNo: "BK-2026-0002",
    customer: "Fatima Ali",
    plot: "B-45",
    project: "Blue Sky Apartments",
    totalPrice: "PKR 3.00M",
    paid: 900000,
    dueDate: "2026-06-20",
    status: "ACTIVE",
  },
  {
    id: "3",
    bookingNo: "BK-2026-0003",
    customer: "Hassan Raza",
    plot: "C-78",
    project: "Green Valley Housing Society",
    totalPrice: "PKR 2.50M",
    paid: 500000,
    dueDate: "2026-05-10",
    status: "DEFAULTER",
  },
];
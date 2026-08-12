import { Payment } from "./types";

export const payments: Payment[] = [
  {
    id: "1",
    receiptNo: "RC-2026-1234",
    customer: "Ahmed Khan",
    amount: "PKR 100K",
    method: "Bank Transfer",
    date: "2026-05-15",
    status: "CONFIRMED",
  },
  {
    id: "2",
    receiptNo: "RC-2026-1235",
    customer: "Fatima Ali",
    amount: "PKR 150K",
    method: "Cash",
    date: "2026-05-18",
    status: "PENDING",
  },
  {
    id: "3",
    receiptNo: "RC-2026-1236",
    customer: "Hassan Raza",
    amount: "PKR 200K",
    method: "Cheque",
    date: "2026-05-19",
    status: "VERIFIED",
  },
];
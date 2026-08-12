export interface Booking {
  id: string;
  bookingNo: string;
  customer: string;
  plot: string;
  project: string;
  totalPrice: string;
  paid: number;
  dueDate: string;
  status: "ACTIVE" | "DEFAULTER";
}
export interface Payment {
  id: string;
  receiptNo: string;
  customer: string;
  amount: string;
  method: string;
  date: string;
  status: "CONFIRMED" | "PENDING" | "VERIFIED";
}
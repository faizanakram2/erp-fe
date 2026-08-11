"use client";

import { MapPin, Phone, Star } from "lucide-react";

export interface Vendor {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  category: string;
  rating: number;
  orders: number;
  phone: string;
  city: string;
  totalSpent: string;
  paymentTerms: string;
}

interface VendorCardProps {
  vendor: Vendor;
  onViewDetails?: (vendor: Vendor) => void;
  onCreateOrder?: (vendor: Vendor) => void;
}

export default function VendorCard({
  vendor,
  onViewDetails,
  onCreateOrder,
}: VendorCardProps) {
  const isActive = vendor.status === "ACTIVE";

  return (
    <div className="rounded-xl border border-[#E4E4E7] bg-white p-5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <h3 className="min-w-0 text-lg font-semibold text-[#0A0A0A]">
          {vendor.name}
        </h3>

        <span
          className={`shrink-0 rounded-md px-1.5 py-0.5 text-xs font-medium ${
            isActive
              ? "bg-[#030213] text-white"
              : "bg-[#F1F1F3] text-[#52525B]"
          }`}
        >
          {vendor.status}
        </span>
      </div>

      {/* Category */}
      <p className="mt-2 text-sm text-[#45556C]">
        {vendor.category}
      </p>

      {/* Rating */}
      <div className="mt-2 flex items-center gap-1">
        <Star
          size={14}
          fill="#F0B100"
          className="text-[#F0B100]"
        />

        <span className="font-medium text-sm text-[#0A0A0A]">
          {vendor.rating}
        </span>

        <span className="text-[#62748E] text-xs">
          ({vendor.orders} orders)
        </span>
      </div>

      {/* Contact information */}
      <div className="mt-4 space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-[#45556C]">
          <Phone size={15} />
          <span>{vendor.phone}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#45556C]">
          <MapPin size={15} />
          <span>{vendor.city}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-[#E4E4E7]" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-[#62748E]">
            Total Spent
          </p>

          <p className="mt-1 text-sm font-bold text-[#155DFC]">
            {vendor.totalSpent}
          </p>
        </div>

        <div>
          <p className="text-sm text-[#62748E]">
            Payment Terms
          </p>

          <p className="mt-1 text-sm font-medium text-[#0A0A0A]">
            {vendor.paymentTerms}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onViewDetails?.(vendor)}
          className="h-10 rounded-lg border border-[#E4E4E7] bg-white text-sm font-medium text-[#0A0A0A] transition hover:bg-slate-50"
        >
          View Details
        </button>

        <button
          type="button"
          onClick={() => onCreateOrder?.(vendor)}
          className="h-10 rounded-lg bg-[#030213] text-sm font-medium text-white transition hover:bg-black"
        >
          Create Order
        </button>
      </div>
    </div>
  );
}
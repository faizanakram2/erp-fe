"use client";
import { useState } from "react";
import ManageAssestsModel from "../models/ManageAssestsModel";
export default function ChartOfAccountTab() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const assets = [
    { label: "Cash in Hand", value: "PKR 2.5M" },
    { label: "Bank - HBL Main", value: "PKR 45.0M" },
    { label: "Bank - MCB Business", value: "PKR 32.0M" },
    { label: "Bank - MCB B/uAccounts Receivable", value: "PKR 15.0M" },
  ];

  const liabilities = [
    { label: "Accounts Payable", value: "PKR 8.5M" },
    { label: "Loans - Development Finance", value: "PKR 25.0M" },
  ];

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="flex flex-wrap items-start gap-16">
        {isModelOpen && (
          <ManageAssestsModel onClose={() => setIsModelOpen(false)} />
        )}
        {/* Assets Card */}
        <section className="w-[375px] h-full rounded-[17px] bg-[#F2F2F2] px-3 flex flex-col gap-3 py-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[16px] font-normal text-[#000000]">Assets</h2>
            <button
              onClick={() => setIsModelOpen(true)}
              className="cursor-pointer h-[28px] w-[111px] rounded-[7px] bg-[#000000] flex items-center justify-center text-[10px] font-normal text-white"
            >
              Manage Assets
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {assets.map((item, i) => (
              <div
                key={item.label}
                className={`px-3 flex items-center justify-between w-full h-[48px]   rounded-[12px] bg-[#FAFAFA]`}
              >
                <span className="text-[12px] font-normal text-[#000000]">
                  {item.label}
                </span>
                <span className="text-[12px] font-normal text-[#000000]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Liabilities Card */}
        <section className="w-[375px] h-full rounded-[17px] bg-[#F2F2F2] px-3 flex flex-col gap-3 py-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[16px] font-normal text-[#000000]">
              Liabilities
            </h2>
            <button className="h-[28px] w-[111px] rounded-[7px] bg-[#D52145] flex items-center justify-center text-[10px] font-normal text-white">
              Manage Liabilities
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {liabilities.map((item, i) => (
              <div
                key={item.label}
                className={`px-3 flex items-center justify-between w-full h-[48px]   rounded-[12px] bg-[#FAFAFA]`}
              >
                <span className="text-[12px] font-normal text-[#000000]">
                  {item.label}
                </span>
                <span className="text-[12px] font-normal text-[#D52145]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

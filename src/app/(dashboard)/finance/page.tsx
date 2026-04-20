"use client";
import { useState } from "react";
import Image from "next/image";

import TransactionTab from "@/components/ui/transactionTab";
import ProfitAndLossTab from "@/components/ui/profitAndLossTab";
import AddCustomerModel from "@/components/models/AddCustomerModel";
import CashFlow from "@/components/ui/cashFlow";
import ChartOfAccountTab from "@/components/ui/chartOfAccountTab";
import AddNewTransactionModel from "@/components/models/AddNewTransactionModel";
export default function Page() {
  const cards = [
    {
      title: "Total Assets",
      value: "225.0M",

      icon: "./icons/assests_icon.svg",
    },
    {
      title: "Total Liabilities",
      value: "14.0M",

      icon: "./icons/qualified_icon.svg",
    },
    {
      title: "Monthly Profit",
      value: "14.0M",
      icon: "./icons/profit_icon.svg",
    },

    {
      title: "Net Worth",
      value: "61.0M",

      icon: "./icons/dollar2_icon.svg",
    },
  ];

  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("activeProjects");

  const handleTab = (val: string) => {
    setActiveTab(val);
  };

  return (
    <div className="mx-auto max-w-6xl rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.06)] flex flex-col gap-6">
      {isModelOpen && (
        <AddNewTransactionModel
          onClose={() => {
            setIsModelOpen(false);
          }}
        />
      )}
      {/* Header */}
      <div className="h-[91px] w-full  flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[18px] font-medium text-[#101828]">
            Finance & Accounting
          </h1>
          <p className=" text-[12px] font-normal text-[#667085]">
            Complete financial management and reporting
          </p>
        </div>

        <div
          onClick={() => setIsModelOpen(true)}
          className="cursor-pointer h-[40px] w-[153px] flex items-center justify-center gap-3 rounded-[8px] bg-[#0070FF] "
        >
          <Image
            src="/icons/add_icon.svg"
            alt="Add Icon"
            width={12}
            height={12}
          />
          <h1 className="font-normal text-white text-[10px]">
            New Transaction
          </h1>
        </div>
      </div>

      {/* Stat cards */}

      <div className=" flex  justify-between pr-12">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-[#EBEBEB] w-[153px] h-[67px] rounded-[6px] flex items-center justify-between px-3"
          >
            {/* Left side */}
            <div className="flex items-center gap-3">
              {/* border line */}
              <div className="w-1 h-10 bg-[#0070FF]"></div>

              {/* title and value */}
              <div>
                <h1 className="text-[12px] text-[#667085]">{card.title}</h1>
                <p className="text-[16px] leading-6 text-[#000]">
                  {card.value}
                </p>
              </div>
            </div>

            {/* Right side icon */}
            <Image
              src={card.icon}
              alt={`${card.title} Icon`}
              width={20}
              height={20}
            />
          </div>
        ))}
      </div>

      {/* Tabs */}

      <div className="w-[550px] flex rounded-[8px] border border-[#D0D5DD] overflow-hidden">
        <button
          onClick={() => handleTab("Accounts")}
          className={`h-[40px] w-[137px] ${
            activeTab === "Accounts" ? "bg-[#F9FAFB]" : "bg-white"
          } border-r border-[#EBD0D0] text-[14px] font-semibold text-[#1D2939] cursor-pointer`}
        >
          Chart of Accounts
        </button>

        <button
          onClick={() => handleTab("Transactions")}
          className={`h-[40px] w-[137px] ${
            activeTab === "Transactions" ? "bg-[#F9FAFB]" : "bg-white"
          } border-r border-[#EBD0D0] text-[14px] font-semibold text-[#1D2939] cursor-pointer`}
        >
          Transactions
        </button>

        <button
          onClick={() => handleTab("Profit")}
          className={`h-[40px] w-[137px] ${
            activeTab === "Profit" ? "bg-[#F9FAFB]" : "bg-white"
          } border-r border-[#EBD0D0] text-[14px] font-semibold text-[#1D2939] cursor-pointer`}
        >
          Profit & Loss
        </button>

        <button
          onClick={() => handleTab("Cash")}
          className={`h-[40px] w-[137px] ${
            activeTab === "Cash" ? "bg-[#F9FAFB]" : "bg-white"
          } text-[14px] font-semibold text-[#1D2939] cursor-pointer`}
        >
          Cash Flow
        </button>
      </div>

      {activeTab === "Accounts" ? (
        <ChartOfAccountTab />
      ) : activeTab === "Transactions" ? (
        <TransactionTab />
      ) : activeTab === "Profit" ? (
        <ProfitAndLossTab />
      ) : (
        <CashFlow />
      )}
    </div>
  );
}

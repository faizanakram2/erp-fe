"use client";
import { useState } from "react";
import Image from "next/image";
import InstallmentsTab from "@/components/ui/InstallmentsTab";
import RecentSalesTab from "@/components/ui/RecentSalesTab";

import CustomerTab from "@/components/ui/customerTab";
import AddCustomerModel from "@/components/models/AddCustomerModel";
export default function Page() {
  const cards = [
    {
      title: "Leads",
      value: "4500",
      subtitle: "225.0M",
      icon: "../icons/lead_icon.svg",
    },
    {
      title: "Qualified",
      value: "28",
      subtitle: "14.0M",
      icon: "../icons/qualified_icon.svg",
    },
    {
      title: "Proposal",
      value: "2876",
      subtitle: "14.0M",
      icon: "../icons/proposal_icon.svg",
    },

    {
      title: "Construction",
      value: "287600",
      subtitle: "14.0M",
      icon: "../icons/construction_icon.svg",
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
        <AddCustomerModel
          onClose={() => {
            setIsModelOpen(false);
          }}
        />
      )}
      {/* Header */}
      <div className="h-[91px] w-full  flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-[18px] font-medium text-[#101828]">
            Sales &amp; Customer Management
          </h1>
          <p className=" text-[12px] font-normal text-[#667085]">
            Manage customers, sales pipeline, and installment tracking
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
            Add New Customer
          </h1>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-5 ">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`relative  bg-[#EBEBEB] w-[165px] h-[86px] rounded-[6px] flex flex-col  px-4 py-2 gap-2`}
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                {/* border line */}
                <div className="w-1 h-10 bg-[#0070FF]"></div>
                {/* title and value */}
                <div className=" flex  flex-col  ">
                  <h1 className="text-[12px] font-normal text-[#667085]">
                    {card.title}
                  </h1>
                  <p className="text-[16px] font-normal leading-6 text-[#000000]">
                    {card.value}
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src={card.icon}
                  alt={`${card.title} Icon`}
                  width={20}
                  height={20}
                />
              </div>
            </div>
            <p className=" text-[12px] font-normal text-[#00BC7D]">
              <span className="text-[#667085]"> PKR </span>
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}

      <div className="w-[414px] rounded-[8px] border border-[#D0D5DD] ">
        <button
          onClick={() => handleTab("Customers")}
          className={`cursor-pointer h-[40px] w-[137px] ${activeTab === "Customers" ? "bg-[#F9FAFB]" : "bg-white"}  rounded-l-[8px]   border-r border-[#EBD0D0]  text-[14px] font-semibold text-[#1D2939]`}
        >
          Customers
        </button>
        <button
          onClick={() => handleTab("RecentSales")}
          className={`cursor-pointer h-[40px] w-[137px] ${activeTab === "RecentSales" ? "bg-[#F9FAFB]" : "bg-white"} border-r border-[#EBD0D0]  text-[14px] font-semibold text-[#1D2939]`}
        >
          Recent Sales
        </button>
        <button
          onClick={() => handleTab("Installments")}
          className={`cursor-pointer h-[40px] w-[137px] ${activeTab === "Installments" ? "bg-[#F9FAFB]" : "bg-white"} rounded-r-[8px]   text-[14px] font-semibold text-[#1D2939]`}
        >
          Installments
        </button>
      </div>

      {activeTab === "Customers" ? (
        <CustomerTab />
      ) : activeTab === "RecentSales" ? (
        <RecentSalesTab />
      ) : (
        <InstallmentsTab />
      )}
    </div>
  );
}

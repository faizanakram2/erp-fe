import React from "react";

const AddCustomerModel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-start justify-center overflow-y-auto px-4 py-6">
      {/* overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/20"></div>
      {/* box model */}
      <div
        className="bg-white w-full max-w-[565px] max-h-[calc(100vh-3rem)] rounded-[20px] z-10 p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* heading  and Description*/}
        <div className="flex flex-col gap-1">
          <h1 className="text-[14px] text-medium text-[#101828]">
            Add New Customer
          </h1>
          <p className="text-[12px] text-normal text-[#667085]">
            Add a new customer
          </p>
        </div>

        <form className="flex flex-col gap-3 mt-4">
          {/* customer name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="customerName"
              className="text-[14px] text-normal text-black"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g Ahmad Khan"
            />
          </div>
          {/* email and phone  number */}
          <div className="grid grid-cols-2 gap-3">
            {/* email */}
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-[14px] text-normal text-black"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g ahmad@gmail.com"
              />
            </div>
            {/* phone number */}
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="phoneNumber"
                className="text-[14px] text-normal text-black"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g +92 300 1234567"
              />
            </div>
          </div>
          {/* plot  and phone  project */}
          <div className="grid grid-cols-2 gap-3">
            {/* plot */}
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="plot"
                className="text-[14px] text-normal text-black"
              >
                Select Plot *
              </label>
              <select
                id="plot"
                className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Plot</option>
                <option value="plot1">Plot 1</option>
                <option value="plot2">Plot 2</option>
                <option value="plot3">Plot 3</option>
              </select>
            </div>
            {/* select project */}
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="project"
                className="text-[14px] text-normal text-black"
              >
                Select Project *
              </label>
              <select
                id="project"
                className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Project</option>
                <option value="project1">Project 1</option>
                <option value="project2">Project 2</option>
                <option value="project3">Project 3</option>
              </select>
            </div>
          </div>

          {/* amount  and paid amount */}
          <div className="grid grid-cols-2 gap-3">
            {/* amount */}
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="amount"
                className="text-[14px] text-normal text-black"
              >
                Amount *
              </label>
              <input
                type="number"
                id="amount"
                className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g 1344000"
              />
            </div>
            {/* paid amount */}
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="paidAmount"
                className="text-[14px] text-normal text-black"
              >
                Paid Amount *
              </label>
              <input
                type="number"
                id="paidAmount"
                className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g 50000"
              />
            </div>
          </div>
          {/* total installments and per unit cost */}
          <div className="grid grid-cols-2 gap-3">
            {/* total installments */}
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="totalInstallments"
                className="text-[14px] text-normal text-black"
              >
                Total Installments *
              </label>
              <input
                type="number"
                id="totalInstallments"
                className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g 12"
              />
            </div>
            {/* per unit cost */}
            <div className="col-span-1 flex flex-col gap-1">
              <label
                htmlFor="perUnitCost"
                className="text-[14px] text-normal text-black"
              >
                Per Unit Cost *
              </label>
              <input
                type="number"
                id="perUnitCost"
                className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g 50000"
              />
            </div>
          </div>
          {/* button */}
          <div className=" flex justify-end gap-2 mt-4">
            <button
              className="p-4 border border-[#DCDCDC] bg-[#F7F7F7] text-[#000000] rounded-[8px]"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="p-4 bg-[#0070FF] text-white rounded-[8px] ">
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModel;

const AddNewTransactionModel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-start justify-center overflow-y-auto px-4 py-6">
      {/* overlay */}
      <div onClick={onClose} className="absolute inset-0 bg-black/20"></div>
      {/* box model */}
      <div
        className="bg-white w-full max-w-[565px] max-h-[calc(100vh-3rem)] rounded-[20px] z-10 p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* heading  and new button*/}
        <div className="flex items-center gap-1">
          <h1 className="text-[14px] text-medium text-[#101828]">
            Add New Transaction
          </h1>
          <span className="w-[42px] h-[22px] rounded-[16px] bg-[#F7FAFF] flex items-center justify-center text-[12px] text-medium text-[#0070FF]">
            new
          </span>
        </div>

        <form className="flex flex-col gap-3 mt-4">
          {/* transaction type*/}
          <div className=" flex flex-col gap-1">
            <label
              htmlFor="plot"
              className="text-[14px] text-normal text-black"
            >
              Transaction Type *
            </label>
            <select
              id="transactionType"
              className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Transaction Type</option>
              <option value="income">Income </option>
              <option value="expense">Expense </option>
            </select>
          </div>

          {/* account*/}
          <div className=" flex flex-col gap-1">
            <label
              htmlFor="plot"
              className="text-[14px] text-normal text-black"
            >
              Account *
            </label>
            <select
              id="account"
              className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Account</option>
              <option value="cash">Cash In Hand</option>
              <option value="bankHbl">Bank - HBL Main</option>
              <option value="bankMsb">Bank - MSB Bussiness</option>
              <option value="accountPayable">Account Payable</option>
            </select>
          </div>

          {/* amount */}
          <div className="col-span-1 flex flex-col gap-1">
            <label
              htmlFor="amount"
              className="text-[14px] text-normal text-black"
            >
              Amount (PKR) *
            </label>
            <input
              type="number"
              id="amount"
              className="border border-[#E3E3E3] rounded-[8px] p-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g 1344000"
            />
          </div>
          {/* description */}
          <textarea
            id="description"
            className="border border-[#E3E3E3] h-[100px] rounded-[8px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g Payment for materials"
          />

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

export default AddNewTransactionModel;

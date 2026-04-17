"use client";

type MaterialModalProps = {
  onClose: () => void;
};

const units = ["kg", "tons", "bags", "pcs", "liters"];

const MaterialModal = ({ onClose }: MaterialModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      {/* modal */}
      <div className="relative z-10 w-full max-w-[565px] min-h-[580px] rounded-[20px] bg-white px-6 py-5 shadow-xl md:px-8 md:py-6">
        <h2 className="text-[14px]  font-medium text-[#101828]">
          Add New Material
        </h2>
        <p className="mt-1 font-normal text-[12px] text-[#667085]">
          Add a new construction material to inventory tracking
        </p>

        <form className="mt-6 space-y-4">
          {/* Material Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="materialName"
              className=" text-[16px] font-normal text-[#000000]"
            >
              Material Name <span className="text-red-500">*</span>
            </label>
            <select
              id="materialName"
              name="materialName"
              required
              className="h-11 w-full rounded-[8px] border-[0.5px] border-[#E3E3E3] bg-[#FFFFFF] px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">e.g., White Cement</option>
              <option value="White Cement">White Cement</option>
              <option value="Steel Rod">Steel Rod</option>
              <option value="Sand">Sand</option>
              <option value="Bricks">Bricks</option>
            </select>
          </div>

          {/* Quantity + Unit */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="initialQuantity"
                className=" text-[16px] font-normal text-[#000000]"
              >
                Initial Quantity <span className="text-red-500">*</span>
              </label>
              <input
                id="initialQuantity"
                name="initialQuantity"
                type="number"
                placeholder="e.g. 45"
                required
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="unit"
                className="text-[16px] font-normal text-[#000000]"
              >
                Unit <span className="text-red-500">*</span>
              </label>
              <select
                id="unit"
                name="unit"
                required
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select Unit</option>
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Costs */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* total cost */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="totalCost"
                className="text-[16px] font-normal text-[#000000]"
              >
                Total Cost <span className="text-red-500">*</span>
              </label>
              <input
                id="totalCost"
                name="totalCost"
                type="number"
                placeholder="e.g. 45"
                required
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            {/* per unit cost */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="perUnitCost"
                className="mb-1 block text-[16px] font-normal text-black"
              >
                Per Unit Cost <span className="text-red-500">*</span>
              </label>
              <input
                id="perUnitCost"
                name="perUnitCost"
                type="number"
                placeholder="e.g. 5000"
                required
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Reorder level */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="reorderLevel"
              className="text-[16px] font-normal text-[#000000]"
            >
              Reorder Level <span className="text-red-500">*</span>
            </label>
            <input
              id="reorderLevel"
              name="reorderLevel"
              type="number"
              placeholder="e.g. 10"
              required
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* footer buttons */}
          <div className="mt-14 flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="h-[40px] rounded-md border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="h-[40px] rounded-[8px] bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700">
              Add Material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaterialModal;

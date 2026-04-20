import Link from "next/link";

export default function MarkAttendancePage() {
  return (
    <div className="h-full overflow-y-auto bg-[#F3F4F6] p-5 sm:p-6 md:p-7">
      <div className="mx-auto w-full max-w-[760px] rounded-[20px] bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.1)] sm:p-8">
        <h1 className="text-[30px] font-semibold text-[#1F2937] sm:text-[34px]">Ahmed Khan</h1>
        <p className="mt-1 text-[15px] text-[#64748B] sm:text-[16px]">Mark Attendance</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className="text-[14px] font-medium text-[#111827] sm:text-[16px]">
              Status <span aria-hidden>*</span>
            </span>
            <select className="h-[48px] rounded-[10px] border border-[#E5E7EB] px-4 text-[14px] text-[#111827] outline-none focus:border-[#1D75F8]">
              <option>Select Status</option>
              <option>Present</option>
              <option>Absent</option>
              <option>Leave</option>
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-[#111827] sm:text-[16px]">
              Check In <span aria-hidden>*</span>
            </span>
            <input
              type="time"
              className="h-[48px] rounded-[10px] border border-[#E5E7EB] px-4 text-[14px] text-[#111827] outline-none [color-scheme:light] focus:border-[#1D75F8]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[14px] font-medium text-[#111827] sm:text-[16px]">
              Check Out <span aria-hidden>*</span>
            </span>
            <input
              type="time"
              className="h-[48px] rounded-[10px] border border-[#E5E7EB] px-4 text-[14px] text-[#111827] outline-none [color-scheme:light] focus:border-[#1D75F8]"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2.5">
          <Link
            href="/human-resources/attendance"
            className="inline-flex h-[46px] items-center rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-5 text-[14px] font-medium text-[#111827]"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="inline-flex h-[46px] items-center rounded-[10px] bg-[#1D75F8] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#1569E8]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}


"use client";

export default function CreateProjectModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0  z-50 flex items-start justify-center  p-4 overflow-y-auto">
      {/* Backdrop + modal */}
      <div onClick={onClose} className="fixed inset-0 bg-black/20" />
      <div className="relative z-10 w-full max-w-[620px] max-h-[989px] flexl fex-col rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        <div className="px-8 pt-7 pb-6 ">
          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center gap-2">
              <h2 className="text-[19px] font-semibold text-[#111827]">
                Create New Project
              </h2>
              <span className="rounded-full bg-[#eef4ff] px-2 py-0.5 text-[11px] font-medium text-[#2563eb]">
                New
              </span>
            </div>
            <p className="mt-1 text-[12px] text-[#9ca3af]">
              Upload a legal document for your and properties
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Project Name *"
                placeholder="e.g., Skyline Apartments"
              />
              <Field label="Contractor *" placeholder="e.g., ABC Builders" />
            </div>

            {/* Row 2 */}
            <Field label="Location *" placeholder="e.g., Phase 6, DHA" />

            {/* Row 3 */}
            <Field label="Total Budget *" placeholder="e.g., 50000000" />

            {/* Row 4 */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Starting Date *" placeholder="dd/mm/yyyy" />
              <Field label="Ending Date *" placeholder="dd/mm/yyyy" />
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Cement (bags) *" placeholder="e.g., 20" />
              <Field label="Steel Bars (tons) *" placeholder="e.g., 20" />
            </div>

            {/* Row 6 */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bricks (pieces) *" placeholder="e.g., 50" />
              <Field label="Sand (tons) *" placeholder="e.g., 20" />
            </div>

            {/* Row 7 */}
            <Field label="Gravel (tons)*" placeholder="e.g., 50" />

            {/* Row 8 */}
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#111827]">
                Description
              </label>
              <textarea
                placeholder="Project details and scope..."
                className="h-[112px] w-full resize-none rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] text-[#111827] placeholder:text-[#9ca3af] outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20"
              />
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="h-9 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-4 text-[12px] font-medium text-[#4b5563] hover:bg-[#f3f4f6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-9 rounded-md bg-[#1d73ff] px-4 text-[12px] font-medium text-white hover:bg-[#1363e6]"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-[#111827]">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-[13px] text-[#111827] placeholder:text-[#9ca3af] outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20"
      />
    </div>
  );
}

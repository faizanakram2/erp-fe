"use client";

import { ChevronDown, Plus } from "lucide-react";

export default function UpdateProjectModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className=" fixed inset-0  flex items-start justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[620px] max-h-[989px] rounded-[4px] rounded-[20px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.14)]">
        <div className="px-7 pt-6 pb-6">
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-[14px] font-semibold text-[#1f2937]">
              Update Project Progress
            </h2>
            <p className="mt-1 text-[11px] text-[#9ca3af]">
              Record a new progressive update or milestone completion
            </p>
          </div>

          <form className="space-y-4">
            {/* Select Project */}
            <SelectField label="Select Project" placeholder="Select Project" />

            {/* Progress + Current Status */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Progress *" placeholder="e.g. 45" />
              <SelectField
                label="Current Status *"
                placeholder="Select Status"
              />
            </div>

            {/* Cement + Steel */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Cement (bags)  *" placeholder="e.g. 50" />
              <InputField label="Steel Bars (tons)  *" placeholder="e.g. 20" />
            </div>

            {/* Bricks + Sand */}
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Bricks (pieces) *" placeholder="e.g. 50" />
              <InputField label="Sand (tons) *" placeholder="e.g. 20" />
            </div>

            {/* Gravel */}
            <InputField label="Gravel (tons)*" placeholder="e.g., 50" />

            {/* Notes */}
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#111827]">
                Update Notes
              </label>
              <textarea
                placeholder="Project details and scope..."
                className="h-[90px] w-full resize-none rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-[12px] text-[#111827] placeholder:text-[#9ca3af] outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20"
              />
            </div>

            {/* Attachment */}
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#111827]">
                Attachment (Photo/Doc)
              </label>
              <button
                type="button"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white text-[12px] text-[#9ca3af] hover:bg-[#fafafa]"
              >
                <Plus size={14} />
                Select Project
              </button>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="h-8 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-4 text-[11px] font-medium text-[#6b7280] hover:bg-[#f3f4f6]"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                type="submit"
                className="h-8 rounded-md bg-[#1d73ff] px-4 text-[11px] font-medium text-white hover:bg-[#1663db]"
              >
                Add New Land
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-medium text-[#111827]">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-[#111827] placeholder:text-[#9ca3af] outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20"
      />
    </div>
  );
}

function SelectField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-medium text-[#111827]">
        {label}
      </label>
      <button
        type="button"
        className="flex h-10 w-full items-center justify-between rounded-md border border-[#e5e7eb] bg-white px-3 text-[12px] text-[#9ca3af] hover:bg-[#fafafa]"
      >
        <span>{placeholder}</span>
        <ChevronDown size={14} className="text-[#6b7280]" />
      </button>
    </div>
  );
}

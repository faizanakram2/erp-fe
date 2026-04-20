"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PlotLayoutBlockModal, {
  type PlotLayoutBlockData,
} from "@/components/land-planning/PlotLayoutBlockModal";

/** Shared stats so every block card and View Layout grid matches the same design. */
const BLOCK_LAYOUT_STATS = {
  totalPlots: 40,
  sold: 28,
  available: 12,
  reserved: 0,
} as const;

const INITIAL_BLOCKS: PlotLayoutBlockData[] = [
  { id: "a", name: "Block A", ...BLOCK_LAYOUT_STATS },
  { id: "b", name: "Block B", ...BLOCK_LAYOUT_STATS },
  { id: "c", name: "Block C", ...BLOCK_LAYOUT_STATS },
];

type PlotLayoutTabProps = {
  propertyNames: string[];
};

export default function PlotLayoutTab({ propertyNames }: PlotLayoutTabProps) {
  const [blocks, setBlocks] = useState<PlotLayoutBlockData[]>(INITIAL_BLOCKS);
  const [layoutModalBlock, setLayoutModalBlock] =
    useState<PlotLayoutBlockData | null>(null);
  const [isAddBlockOpen, setIsAddBlockOpen] = useState(false);
  const [isUpdateBlockOpen, setIsUpdateBlockOpen] = useState(false);
  const [isUploadPlotLayoutOpen, setIsUploadPlotLayoutOpen] = useState(false);
  const uploadPlotLayoutInputRef = useRef<HTMLInputElement>(null);
  const [updateBlockId, setUpdateBlockId] = useState("");
  const [updateSold, setUpdateSold] = useState("");
  const [updateAvailable, setUpdateAvailable] = useState("");
  const [updateReserved, setUpdateReserved] = useState("");

  const openUpdateBlockPanel = () => {
    setUpdateBlockId("");
    setUpdateSold("");
    setUpdateAvailable("");
    setUpdateReserved("");
    setIsUpdateBlockOpen(true);
  };

  const syncUpdateFormFromBlockId = (id: string) => {
    const b = blocks.find((x) => x.id === id);
    if (!b) return;
    setUpdateBlockId(id);
    setUpdateSold(String(b.sold));
    setUpdateAvailable(String(b.available));
    setUpdateReserved(String(b.reserved));
  };

  const submitUpdateBlock = () => {
    const id =
      updateBlockId && blocks.some((b) => b.id === updateBlockId)
        ? updateBlockId
        : blocks[0]?.id;
    if (!id) return;

    const sold = Number.parseInt(updateSold, 10);
    const available = Number.parseInt(updateAvailable, 10);
    const reserved = Number.parseInt(updateReserved, 10);
    const safeSold = Number.isFinite(sold) ? Math.max(0, sold) : 0;
    const safeAvailable = Number.isFinite(available) ? Math.max(0, available) : 0;
    const safeReserved = Number.isFinite(reserved) ? Math.max(0, reserved) : 0;

    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              sold: safeSold,
              available: safeAvailable,
              reserved: safeReserved,
              totalPlots: safeSold + safeAvailable + safeReserved,
            }
          : b,
      ),
    );
    setIsUpdateBlockOpen(false);
  };

  const options = useMemo(() => {
    const unique = [...new Set(propertyNames.filter(Boolean))];
    return unique.length > 0 ? unique : ["Green Valley Phase 1"];
  }, [propertyNames]);

  const [selectedProperty, setSelectedProperty] = useState("");
  const [propertySelectOpen, setPropertySelectOpen] = useState(false);
  const propertySelectRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProperty && !options.includes(selectedProperty)) {
      setSelectedProperty("");
    }
  }, [options, selectedProperty]);

  useEffect(() => {
    if (!propertySelectOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (propertySelectRootRef.current?.contains(target)) return;
      setPropertySelectOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [propertySelectOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPropertySelectOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const lockScroll =
      isAddBlockOpen || isUpdateBlockOpen || isUploadPlotLayoutOpen;
    if (!lockScroll) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isAddBlockOpen, isUpdateBlockOpen, isUploadPlotLayoutOpen]);

  useEffect(() => {
    if (!isUpdateBlockOpen && !isUploadPlotLayoutOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsUpdateBlockOpen(false);
      setIsUploadPlotLayoutOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isUpdateBlockOpen, isUploadPlotLayoutOpen]);

  const headingSuffix = selectedProperty
    ? ` - ${selectedProperty}`
    : "";

  return (
    <div className="mt-3 flex min-h-0 flex-col gap-5 sm:mt-5 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h2 className="text-[16px] font-semibold leading-snug text-[#0F172A] sm:text-[18px] md:text-[20px]">
          Plot Layout{headingSuffix}
        </h2>
        <div className="relative w-full shrink-0 sm:w-[min(100%,280px)]" ref={propertySelectRootRef}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={propertySelectOpen}
            aria-controls="plot-property-listbox"
            onClick={() => setPropertySelectOpen((o) => !o)}
            className={`flex h-[44px] w-full items-center justify-between gap-2 rounded-[10px] border bg-white py-2 pl-4 pr-3 text-left text-[14px] text-[#111827] outline-none transition-[border-color,box-shadow] sm:text-[15px] ${
              propertySelectOpen
                ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                : "border-[#BFDBFE]"
            }`}
          >
            <span>{selectedProperty || "Select Property"}</span>
            <span className="shrink-0 text-[#1D75F8]">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>

          {propertySelectOpen ? (
            <ul
              id="plot-property-listbox"
              role="listbox"
              className="absolute left-0 right-0 top-full mt-1 z-[30] overflow-hidden rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
            >
              {options.map((name) => (
                <li key={name} role="presentation" className="border-b border-[#F0F2F5] last:border-b-0">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selectedProperty === name}
                    onClick={() => {
                      setSelectedProperty(name);
                      setPropertySelectOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-[14px] transition-colors sm:text-[15px] ${
                      selectedProperty === name
                        ? "bg-[#1D75F8] text-white"
                        : "bg-white text-[#111827] hover:bg-[#1D75F8] hover:text-white"
                    }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blocks.map((block) => (
          <div
            key={block.id}
            className="flex flex-col rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5"
          >
            <p className="border-b border-[#E2E8F0] pb-3 text-[15px] font-semibold text-[#0F172A] sm:text-[16px]">
              {block.name}
            </p>
            <dl className="mt-3 flex flex-col gap-3 text-[14px] sm:text-[15px]">
              <div className="flex items-center justify-between gap-2">
                <dt className="font-normal text-[#64748B]">Total Plots</dt>
                <dd className="font-medium text-[#0F172A] tabular-nums">
                  {block.totalPlots}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="font-normal text-[#64748B]">Sold</dt>
                <dd className="font-semibold text-[#16A34A] tabular-nums">
                  {block.sold}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="font-normal text-[#64748B]">Available</dt>
                <dd className="font-semibold text-[#2563EB] tabular-nums">
                  {block.available}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="font-normal text-[#64748B]">Reserved</dt>
                <dd className="font-semibold text-[#DC2626] tabular-nums">
                  {block.reserved}
                </dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => setLayoutModalBlock(block)}
              className="mt-4 w-full rounded-[10px] border border-[#CBD5E1] bg-white py-2.5 text-[14px] font-medium text-[#334155] transition-colors hover:bg-[#F8FAFC] active:bg-[#F1F5F9] sm:py-3 sm:text-[15px]"
            >
              View Layout
            </button>
          </div>
        ))}
      </div>

      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-12 text-center sm:min-h-[280px] sm:gap-4 sm:py-16">
        <svg
          className="text-[#CBD5E1]"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M12 21C15.5 17.4 19 14.176 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.176 8.5 17.4 12 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <div className="space-y-1">
          <p className="text-[17px] font-semibold text-[#94A3B8] sm:text-[20px]">
            Interactive Plot Map
          </p>
          <p className="text-[13px] text-[#94A3B8] sm:text-[14px]">
            Visual plot layout would appear here
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsUploadPlotLayoutOpen(true)}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-2.5 text-[14px] font-medium text-[#475569] shadow-sm transition-colors hover:bg-[#F8FAFC] sm:px-5 sm:text-[15px]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 5v10M8 9l4-4 4 4M5 19h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Upload Layout Image
        </button>
      </div>

      <div className="flex flex-col items-end gap-3 pb-1 sm:flex-row sm:justify-end sm:gap-3 sm:pb-0">
        <button
          type="button"
          onClick={() => setIsAddBlockOpen(true)}
          className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-[10px] border border-[#CBD5E1] bg-white px-5 text-[14px] font-medium text-[#334155] shadow-sm transition-colors hover:bg-[#F8FAFC] sm:h-12 sm:text-[15px]"
        >
          Add Block
        </button>
        <button
          type="button"
          onClick={openUpdateBlockPanel}
          className="inline-flex h-11 min-w-[140px] items-center justify-center rounded-[10px] bg-[#1D75F8] px-5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-[#1569E8] active:bg-[#145FDB] sm:h-12 sm:text-[15px]"
        >
          Upload Block
        </button>
      </div>

      {isUpdateBlockOpen ? (
        <div
          className="fixed inset-0 z-[57] flex items-end justify-center bg-black/35 p-3 sm:items-center sm:p-4"
          onClick={() => setIsUpdateBlockOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[420px] rounded-[24px] bg-white px-5 pb-6 pt-6 shadow-2xl sm:max-w-[460px] sm:rounded-[28px] sm:px-7 sm:pb-7 sm:pt-7"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-block-panel-title"
          >
            <div className="space-y-1.5 text-left">
              <h2
                id="update-block-panel-title"
                className="text-[18px] font-semibold leading-tight text-[#0F172A] sm:text-[20px]"
              >
                Update Block
              </h2>
              <p className="text-[13px] leading-snug text-[#94A3B8] sm:text-[14px]">
                Upload a legal document. Create a new sector or block for plot
                distribution.
              </p>
            </div>

            <div className="mt-5 space-y-4 sm:mt-6">
              <div className="space-y-2">
                <label
                  htmlFor="update-block-select"
                  className="text-[14px] font-medium leading-none text-[#111827] sm:text-[15px]"
                >
                  Select Block
                </label>
                <div className="relative">
                  <select
                    id="update-block-select"
                    value={updateBlockId}
                    onChange={(e) => syncUpdateFormFromBlockId(e.target.value)}
                    className={`h-[52px] w-full cursor-pointer appearance-none rounded-[10px] border border-[#E5E7EB] bg-white py-2 pl-4 pr-11 text-[16px] outline-none transition-[box-shadow,border-color] focus:border-[#1D75F8] focus:ring-2 focus:ring-[#1D75F8]/20 sm:h-[56px] sm:px-5 sm:text-[17px] ${
                      updateBlockId ? "font-medium text-[#111827]" : "text-[#A3A3A3]"
                    }`}
                  >
                    <option value="" disabled>
                      e.g. Block D
                    </option>
                    {blocks.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1D75F8] sm:right-5">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="update-block-sold"
                    className="text-[14px] font-semibold leading-none text-[#111827] sm:text-[15px]"
                  >
                    Sold <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="update-block-sold"
                    type="text"
                    inputMode="numeric"
                    value={updateSold}
                    onChange={(e) => setUpdateSold(e.target.value)}
                    placeholder="e.g. 45"
                    className="h-[52px] w-full rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] focus:border-[#1D75F8] focus:ring-2 focus:ring-[#1D75F8]/20 sm:h-[56px] sm:px-5 sm:text-[17px]"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="update-block-available"
                    className="text-[14px] font-semibold leading-none text-[#111827] sm:text-[15px]"
                  >
                    Available <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="update-block-available"
                    type="text"
                    inputMode="numeric"
                    value={updateAvailable}
                    onChange={(e) => setUpdateAvailable(e.target.value)}
                    placeholder="e.g. 23"
                    className="h-[52px] w-full rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] focus:border-[#1D75F8] focus:ring-2 focus:ring-[#1D75F8]/20 sm:h-[56px] sm:px-5 sm:text-[17px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="update-block-reserved"
                  className="text-[14px] font-semibold leading-none text-[#111827] sm:text-[15px]"
                >
                  Reserved: <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="update-block-reserved"
                  type="text"
                  inputMode="numeric"
                  value={updateReserved}
                  onChange={(e) => setUpdateReserved(e.target.value)}
                  placeholder="e.g. 45"
                  className="h-[52px] w-full rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] focus:border-[#1D75F8] focus:ring-2 focus:ring-[#1D75F8]/20 sm:h-[56px] sm:px-5 sm:text-[17px]"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5 sm:mt-7">
              <button
                type="button"
                onClick={() => setIsUpdateBlockOpen(false)}
                className="h-11 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] px-5 text-[14px] font-medium text-[#111827] transition-colors hover:bg-[#E5E7EB] sm:h-12 sm:px-6 sm:text-[15px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitUpdateBlock}
                className="h-11 rounded-lg bg-[#1D75F8] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1569E8] sm:h-12 sm:px-6 sm:text-[15px]"
              >
                Add New Land
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isUploadPlotLayoutOpen ? (
        <div
          className="fixed inset-0 z-[58] flex items-end justify-center bg-black/35 p-3 sm:items-center sm:p-4"
          onClick={() => setIsUploadPlotLayoutOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[480px] rounded-[24px] bg-white px-5 pb-6 pt-6 shadow-2xl sm:max-w-[520px] sm:rounded-[28px] sm:px-7 sm:pb-7 sm:pt-7"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-plot-layout-title"
          >
            <div className="space-y-1.5 text-left">
              <h2
                id="upload-plot-layout-title"
                className="text-[18px] font-semibold leading-tight text-[#0F172A] sm:text-[20px]"
              >
                Upload Plot Layout
              </h2>
              <p className="text-[13px] leading-snug text-[#64748B] sm:text-[14px]">
                Upload a visual layout image for your land property
              </p>
            </div>

            <input
              ref={uploadPlotLayoutInputRef}
              type="file"
              accept="image/png,image/jpeg,.png,.jpg,.jpeg"
              className="sr-only"
              tabIndex={-1}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const max = 10 * 1024 * 1024;
                if (file.size > max) {
                  e.target.value = "";
                }
              }}
            />

            <button
              type="button"
              onClick={() => uploadPlotLayoutInputRef.current?.click()}
              className="mt-5 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#CBD5E1] bg-[#FAFBFC] px-6 py-14 text-center transition-colors hover:border-[#94A3B8] hover:bg-[#F8FAFC] sm:mt-6 sm:py-16"
            >
              <svg
                className="text-[#94A3B8]"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 5v10M8 9l4-4 4 4M5 19h14"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[15px] font-medium text-[#64748B] sm:text-[16px]">
                Click to Upload
              </span>
              <span className="text-[13px] text-[#94A3B8] sm:text-[14px]">
                PNG, JPG up to 10MB
              </span>
            </button>

            <div className="mt-6 flex justify-end gap-2.5 sm:mt-7">
              <button
                type="button"
                onClick={() => setIsUploadPlotLayoutOpen(false)}
                className="h-11 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] px-5 text-[14px] font-medium text-[#111827] transition-colors hover:bg-[#E5E7EB] sm:h-12 sm:px-6 sm:text-[15px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => uploadPlotLayoutInputRef.current?.click()}
                className="h-11 rounded-lg bg-[#1D75F8] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1569E8] sm:h-12 sm:px-6 sm:text-[15px]"
              >
                upload Layout
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <PlotLayoutBlockModal
        block={layoutModalBlock}
        onClose={() => setLayoutModalBlock(null)}
      />

      {isAddBlockOpen ? (
        <div
          className="fixed inset-0 z-[56] flex items-end justify-center bg-black/35 p-3 sm:items-center sm:p-4"
          onClick={() => setIsAddBlockOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[420px] rounded-[24px] bg-white px-5 pb-6 pt-6 shadow-2xl sm:max-w-[460px] sm:rounded-[28px] sm:px-7 sm:pb-7 sm:pt-7"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-plot-block-title"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  id="add-plot-block-title"
                  className="text-[18px] font-semibold leading-tight text-[#111827] sm:text-[20px]"
                >
                  Add New Plot Block
                </h3>
                <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#2563EB] sm:px-3 sm:py-1 sm:text-[12px]">
                  New
                </span>
              </div>
              <p className="text-[13px] leading-snug text-[#94A3B8] sm:text-[14px]">
                Create a new sector or block for plot distribution
              </p>
            </div>

            <div className="mt-5 space-y-4 sm:mt-6">
              <div className="space-y-2">
                <label className="text-[14px] font-semibold leading-none text-[#111827] sm:text-[15px]">
                  Block Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Block D"
                    className="h-[52px] w-full rounded-xl border border-[#E5E7EB] px-4 pr-11 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:h-[56px] sm:px-5 sm:text-[17px]"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1677FF] sm:right-5">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-semibold leading-none text-[#111827] sm:text-[15px]">
                  Total Plots
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 50"
                    className="h-[52px] w-full rounded-xl border border-[#E5E7EB] px-4 pr-11 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:h-[56px] sm:px-5 sm:text-[17px]"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#1677FF] sm:right-5">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2.5 sm:mt-7">
              <button
                type="button"
                onClick={() => setIsAddBlockOpen(false)}
                className="h-11 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-5 text-[14px] font-medium text-[#111827] transition-colors hover:bg-[#F1F5F9] sm:h-12 sm:px-6 sm:text-[15px]"
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-11 rounded-lg bg-[#1D75F8] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1569E8] sm:h-12 sm:px-6 sm:text-[15px]"
              >
                Add New Land
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

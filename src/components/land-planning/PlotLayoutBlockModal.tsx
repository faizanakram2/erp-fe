"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo } from "react";

export type PlotLayoutBlockData = {
  id: string;
  name: string;
  totalPlots: number;
  sold: number;
  available: number;
  reserved: number;
};

type PlotLayoutBlockModalProps = {
  block: PlotLayoutBlockData | null;
  onClose: () => void;
};

type CellKind = "sold" | "available" | "reserved" | "empty";

function buildCellStatuses(block: PlotLayoutBlockData): CellKind[] {
  const { totalPlots, sold, available, reserved } = block;
  const out: CellKind[] = [];
  for (let i = 0; i < sold; i++) out.push("sold");
  for (let i = 0; i < available; i++) out.push("available");
  for (let i = 0; i < reserved; i++) out.push("reserved");
  while (out.length < totalPlots) out.push("empty");
  return out.slice(0, totalPlots);
}

const cellClass: Record<CellKind, string> = {
  sold: "bg-[#10B981]",
  available: "bg-[#3B82F6]",
  reserved: "bg-[#F97316]",
  empty: "bg-slate-200",
};

export default function PlotLayoutBlockModal({
  block,
  onClose,
}: PlotLayoutBlockModalProps) {
  const cells = useMemo(
    () => (block ? buildCellStatuses(block) : []),
    [block],
  );

  useEffect(() => {
    if (!block) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [block]);

  useEffect(() => {
    if (!block) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [block, onClose]);

  if (!block) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[55] flex items-end justify-center bg-black/35 p-2 sm:items-center sm:p-3"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative max-h-[92dvh] w-full max-w-[520px] overflow-y-auto rounded-t-[20px] bg-white px-4 pb-4 pt-4 shadow-2xl sm:max-h-[94vh] sm:rounded-[22px] sm:px-6 sm:pb-5 sm:pt-5"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="plot-block-modal-title"
      >
        <header className="space-y-1 border-b border-[#E5E7EB] pb-3 sm:pb-3.5">
          <h2
            id="plot-block-modal-title"
            className="text-[20px] font-semibold leading-tight text-[#111827] sm:text-[22px]"
          >
            Plot Layout - {block.name}
          </h2>
          <p className="text-[13px] font-normal text-[#64748B] sm:text-[14px]">
            Interactive view of the plot layout with detailed information
          </p>
        </header>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <section>
            <h3 className="mb-2 text-[15px] font-semibold leading-none text-[#111827] sm:text-[16px]">
              Block Information
            </h3>
            <dl className="flex flex-col gap-2 text-[13px] sm:text-[14px]">
              {[
                ["Block Name", block.name],
                ["Total Plots", String(block.totalPlots)],
                ["Sold Plots", String(block.sold)],
                ["Available Plots", String(block.available)],
                ["Reserved Plots", String(block.reserved)],
              ].map(([label, value]) => (
                <div
                  key={String(label)}
                  className="flex items-center justify-between gap-3"
                >
                  <dt className="text-[#374151]">{label}:</dt>
                  <dd className="font-medium tabular-nums text-[#111827]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h3 className="mb-2 text-[15px] font-semibold leading-none text-[#111827] sm:text-[16px]">
              Plot Status Legend
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center justify-between gap-3">
                <span
                  className="h-7 w-7 shrink-0 rounded-md bg-[#10B981] sm:h-8 sm:w-8"
                  aria-hidden
                />
                <span className="text-[13px] text-[#374151] sm:text-[14px]">
                  Sold
                </span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span
                  className="h-7 w-7 shrink-0 rounded-md bg-[#3B82F6] sm:h-8 sm:w-8"
                  aria-hidden
                />
                <span className="text-[13px] text-[#374151] sm:text-[14px]">
                  Available
                </span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span
                  className="h-7 w-7 shrink-0 rounded-md bg-[#F97316] sm:h-8 sm:w-8"
                  aria-hidden
                />
                <span className="text-[13px] text-[#374151] sm:text-[14px]">
                  Reserved
                </span>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-4 rounded-[14px] bg-[#F3F4F6] p-4 sm:mt-4 sm:rounded-2xl sm:p-5">
          <div
            className="grid grid-cols-10 gap-3"
            role="img"
            aria-label={`Plot grid for ${block.name}, ${block.totalPlots} plots`}
          >
            {cells.map((kind, i) => (
              <div
                key={i}
                className={`h-6 w-6 rounded-[6px] ${cellClass[kind]} sm:h-7 sm:w-7 sm:rounded-[7px]`}
              />
            ))}
          </div>
        </div>

        <footer className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-5 text-[13px] font-medium text-[#111827] transition-colors hover:bg-[#F1F5F9] sm:h-11 sm:min-w-[100px] sm:text-[14px]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#1D75F8] px-5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#1569E8] active:bg-[#145FDB] sm:h-11 sm:min-w-[140px] sm:text-[14px]"
          >
            Download Layout
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

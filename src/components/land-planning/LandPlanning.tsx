"use client";

import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import PlotLayoutTab from "@/components/land-planning/PlotLayoutTab";

const OWNERSHIP_OPTIONS = ["Leasehold", "Freehold"] as const;
type OwnershipValue = (typeof OWNERSHIP_OPTIONS)[number];

const DEVELOPMENT_STATUS_OPTIONS = [
  "Planning",
  "Under Development",
  "Developed",
] as const;
type DevelopmentStatusValue = (typeof DEVELOPMENT_STATUS_OPTIONS)[number];

type LandRecord = {
  id: string;
  propertyName: string;
  createdAt: string;
  location: string;
  totalArea: string;
  totalPlots: number;
  availablePlots: number;
  ownership: string;
  status: "Developed" | "Planning";
};

const tabs = ["Land Record", "Plot Layout", "Legal Documents"];

const INITIAL_LAND_RECORDS: LandRecord[] = [
  {
    id: "1",
    propertyName: "Green Valley Phase 1",
    createdAt: "Since 2024-03-15",
    location: "Sector 45, Islamabad",
    totalArea: "250 Kanal",
    totalPlots: 120,
    availablePlots: 35,
    ownership: "Freehold",
    status: "Developed",
  },
  {
    id: "2",
    propertyName: "Green Valley Phase 1",
    createdAt: "Since 2024-03-15",
    location: "Sector 45, Islamabad",
    totalArea: "250 Kanal",
    totalPlots: 120,
    availablePlots: 35,
    ownership: "Freehold",
    status: "Planning",
  },
  {
    id: "3",
    propertyName: "Green Valley Phase 1",
    createdAt: "Since 2024-03-15",
    location: "Sector 45, Islamabad",
    totalArea: "250 Kanal",
    totalPlots: 120,
    availablePlots: 35,
    ownership: "Freehold",
    status: "Developed",
  },
  {
    id: "4",
    propertyName: "Green Valley Phase 1",
    createdAt: "Since 2024-03-15",
    location: "Sector 45, Islamabad",
    totalArea: "250 Kanal",
    totalPlots: 120,
    availablePlots: 35,
    ownership: "Freehold",
    status: "Developed",
  },
  {
    id: "5",
    propertyName: "Green Valley Phase 1",
    createdAt: "Since 2024-03-15",
    location: "Sector 45, Islamabad",
    totalArea: "250 Kanal",
    totalPlots: 120,
    availablePlots: 35,
    ownership: "Freehold",
    status: "Planning",
  },
  {
    id: "6",
    propertyName: "Green Valley Phase 1",
    createdAt: "Since 2024-03-15",
    location: "Sector 45, Islamabad",
    totalArea: "250 Kanal",
    totalPlots: 120,
    availablePlots: 35,
    ownership: "Freehold",
    status: "Planning",
  },
  {
    id: "7",
    propertyName: "Green Valley Phase 1",
    createdAt: "Since 2024-03-15",
    location: "Sector 45, Islamabad",
    totalArea: "250 Kanal",
    totalPlots: 120,
    availablePlots: 35,
    ownership: "Freehold",
    status: "Developed",
  },
  {
    id: "8",
    propertyName: "Green Valley Phase 1",
    createdAt: "Since 2024-03-15",
    location: "Sector 45, Islamabad",
    totalArea: "250 Kanal",
    totalPlots: 120,
    availablePlots: 35,
    ownership: "Freehold",
    status: "Developed",
  },
];

const statusBadgeStyles: Record<LandRecord["status"], string> = {
  Developed: "bg-[#74C7AF] text-white",
  Planning: "bg-[#779AF3] text-white",
};

const LEGAL_DOCUMENTS = [
  { id: "doc-1", title: "Land Ownership Deed", property: "Green Valley", size: "2.4 MB", date: "2024-03-15" },
  { id: "doc-2", title: "NOC Certificate", property: "Green Valley", size: "2.4 MB", date: "2024-03-15" },
  { id: "doc-3", title: "Plot Approved Layout", property: "Green Valley", size: "2.4 MB", date: "2024-03-15" },
  { id: "doc-4", title: "Environmental clearance", property: "Green Valley", size: "2.4 MB", date: "2024-03-15" },
] as const;
const LEGAL_DOC_TYPE_OPTIONS = [
  "Ownership Deed",
  "NOC Certificate",
  "Plot Approved Layout",
  "Environmental clearance",
  "Others",
] as const;
const LEGAL_DOC_NOTE_OPTIONS = [
  "Additional note about document.......",
  "Urgent verification required",
  "Pending legal approval",
  "Need signature confirmation",
  "Other remarks",
] as const;
const RELATED_LAND_PROPERTY_OPTIONS = [
  "Green Valley Phase 1",
  "Royal Palm Estate",
  "Sunrise Heights",
] as const;

const LAND_ACTION_MENU_WIDTH = 168;
const LAND_ACTION_MENU_VIEW_MARGIN = 8;

type LandActionMenuSource = "card" | "table";

const TAB_LAND_RECORD = tabs[0];
const TAB_PLOT_LAYOUT = tabs[1];
const TAB_LEGAL_DOCUMENTS = tabs[2];

export default function LandPlanning() {
  const [landRecords, setLandRecords] =
    useState<LandRecord[]>(INITIAL_LAND_RECORDS);
  const plotPropertyNames = useMemo(
    () => [...new Set(landRecords.map((r) => r.propertyName))],
    [landRecords],
  );
  const legalDocsPropertyOptions = useMemo(
    () =>
      plotPropertyNames.length > 0
        ? plotPropertyNames
        : ["Green Valley", "Skyline Apartments"],
    [plotPropertyNames],
  );
  const [editLandRecordId, setEditLandRecordId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [legalDocsProperty, setLegalDocsProperty] = useState("");
  const [legalDocsPropertyOpen, setLegalDocsPropertyOpen] = useState(false);
  const [isUploadLegalDocOpen, setIsUploadLegalDocOpen] = useState(false);
  const [isUploadSuccessOpen, setIsUploadSuccessOpen] = useState(false);
  const [viewingLegalDoc, setViewingLegalDoc] = useState<(typeof LEGAL_DOCUMENTS)[number] | null>(null);
  const [uploadDocType, setUploadDocType] = useState<string | null>(null);
  const [uploadDocTypeOpen, setUploadDocTypeOpen] = useState(false);
  const [uploadRelatedProperty, setUploadRelatedProperty] = useState<string | null>(null);
  const [uploadRelatedPropertyOpen, setUploadRelatedPropertyOpen] = useState(false);
  const [uploadNote, setUploadNote] = useState<string | null>(null);
  const [uploadNoteOpen, setUploadNoteOpen] = useState(false);
  const [isAddLandOpen, setIsAddLandOpen] = useState(false);
  const [ownership, setOwnership] = useState<OwnershipValue | null>(null);
  const [ownershipOpen, setOwnershipOpen] = useState(false);
  const [ownershipMenuLayout, setOwnershipMenuLayout] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const ownershipRootRef = useRef<HTMLDivElement>(null);
  const ownershipMenuRef = useRef<HTMLUListElement>(null);
  const legalDocsPropertyRootRef = useRef<HTMLDivElement>(null);

  const [devStatus, setDevStatus] = useState<DevelopmentStatusValue | null>(
    null,
  );
  const [devStatusOpen, setDevStatusOpen] = useState(false);
  const [devStatusMenuLayout, setDevStatusMenuLayout] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const devStatusRootRef = useRef<HTMLDivElement>(null);
  const devStatusMenuRef = useRef<HTMLUListElement>(null);
  const uploadDocTypeRootRef = useRef<HTMLDivElement>(null);
  const uploadRelatedPropertyRootRef = useRef<HTMLDivElement>(null);
  const uploadNoteRootRef = useRef<HTMLDivElement>(null);
  const uploadLegalFileInputRef = useRef<HTMLInputElement>(null);
  /** Scroll container for the Add Land modal (scroll does not bubble to window). */
  const addLandModalScrollRef = useRef<HTMLDivElement>(null);

  const landRecordsScrollRef = useRef<HTMLDivElement>(null);
  const [landActionMenu, setLandActionMenu] = useState<{
    recordId: string;
    source: LandActionMenuSource;
  } | null>(null);
  const [landActionMenuLayout, setLandActionMenuLayout] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const landActionMenuRef = useRef<HTMLDivElement>(null);

  const getLandActionTrigger = (
    recordId: string,
    source: LandActionMenuSource,
  ) =>
    document.querySelector<HTMLElement>(
      `[data-land-action="${CSS.escape(recordId)}"][data-action-src="${source}"]`,
    );

  const updateLandActionMenuLayout = () => {
    if (!landActionMenu) {
      setLandActionMenuLayout(null);
      return;
    }
    const trigger = getLandActionTrigger(
      landActionMenu.recordId,
      landActionMenu.source,
    );
    if (!trigger) {
      setLandActionMenuLayout(null);
      return;
    }
    const r = trigger.getBoundingClientRect();
    const w = LAND_ACTION_MENU_WIDTH;
    const m = LAND_ACTION_MENU_VIEW_MARGIN;
    let left = r.right - w;
    left = Math.max(m, Math.min(left, window.innerWidth - w - m));
    const top = r.bottom + 6;
    setLandActionMenuLayout({ top, left, width: w });
  };

  const toggleLandActionMenu = (
    recordId: string,
    source: LandActionMenuSource,
  ) => {
    setLandActionMenu((prev) =>
      prev?.recordId === recordId && prev.source === source ? null : { recordId, source },
    );
  };

  const landActionTargetRecord = landActionMenu
    ? landRecords.find((r) => r.id === landActionMenu.recordId)
    : undefined;

  const editLandRecord =
    editLandRecordId !== null
      ? landRecords.find((r) => r.id === editLandRecordId)
      : undefined;

  const handleLandActionEdit = () => {
    if (!landActionTargetRecord) return;
    const rec = landActionTargetRecord;
    setLandActionMenu(null);
    setEditLandRecordId(rec.id);
    if (rec.ownership === "Leasehold" || rec.ownership === "Freehold") {
      setOwnership(rec.ownership);
    } else {
      setOwnership(null);
    }
    setDevStatus(
      rec.status === "Developed"
        ? "Developed"
        : "Planning",
    );
    setIsAddLandOpen(true);
  };

  const handleLandActionDelete = () => {
    if (!landActionTargetRecord) return;
    setLandActionMenu(null);
    const ok = window.confirm(
      `Delete “${landActionTargetRecord.propertyName}”? This cannot be undone.`,
    );
    if (!ok) return;
    setLandRecords((prev) => prev.filter((r) => r.id !== landActionTargetRecord.id));
  };

  const handleCloseModal = () => {
    setIsAddLandOpen(false);
    setEditLandRecordId(null);
    setOwnershipOpen(false);
    setOwnership(null);
    setDevStatusOpen(false);
    setDevStatus(null);
    // Return to the main/default view (Land Record tab) after closing.
    setActiveTab(tabs[0]);
  };

  const applyLandRecordEditFromModal = () => {
    if (!editLandRecord) return;
    const root = addLandModalScrollRef.current;
    if (!root) return;
    const propertyNameEl = root.querySelector<HTMLInputElement>(
      'input[name="land-property-name"]',
    );
    const totalAreaEl = root.querySelector<HTMLInputElement>(
      'input[name="land-total-area"]',
    );
    const locationEl = root.querySelector<HTMLInputElement>(
      'input[name="land-location"]',
    );
    const plotsEl = root.querySelector<HTMLInputElement>(
      'input[name="land-plots"]',
    );
    const propertyName = propertyNameEl?.value?.trim() ?? editLandRecord.propertyName;
    const totalArea = totalAreaEl?.value?.trim() ?? editLandRecord.totalArea;
    const location = locationEl?.value?.trim() ?? editLandRecord.location;
    const plotsParsed = Number.parseInt(plotsEl?.value ?? "", 10);
    const totalPlots = Number.isFinite(plotsParsed)
      ? plotsParsed
      : editLandRecord.totalPlots;
    const recordStatus: LandRecord["status"] =
      devStatus === "Developed" ? "Developed" : "Planning";
    const own =
      ownership ??
      (editLandRecord.ownership === "Leasehold" ||
      editLandRecord.ownership === "Freehold"
        ? editLandRecord.ownership
        : "Freehold");

    setLandRecords((prev) =>
      prev.map((r) =>
        r.id !== editLandRecord.id
          ? r
          : {
              ...r,
              propertyName,
              totalArea,
              location,
              totalPlots,
              ownership: own,
              status: recordStatus,
            },
      ),
    );
    handleCloseModal();
  };

  useEffect(() => {
    if (!isAddLandOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (ownershipOpen) {
        setOwnershipOpen(false);
        return;
      }
      if (devStatusOpen) {
        setDevStatusOpen(false);
        return;
      }
      handleCloseModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddLandOpen, ownershipOpen, devStatusOpen]);

  useEffect(() => {
    if (!legalDocsPropertyOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (legalDocsPropertyRootRef.current?.contains(t)) return;
      setLegalDocsPropertyOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [legalDocsPropertyOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLegalDocsPropertyOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setLegalDocsPropertyOpen(false);
  }, [activeTab]);

  useEffect(() => {
    if (!isUploadLegalDocOpen && !isUploadSuccessOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (uploadDocTypeOpen) {
        setUploadDocTypeOpen(false);
        return;
      }
      if (uploadRelatedPropertyOpen) {
        setUploadRelatedPropertyOpen(false);
        return;
      }
      if (uploadNoteOpen) {
        setUploadNoteOpen(false);
        return;
      }
      if (isUploadSuccessOpen) {
        setIsUploadSuccessOpen(false);
        return;
      }
      setIsUploadLegalDocOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isUploadLegalDocOpen, isUploadSuccessOpen, uploadDocTypeOpen, uploadRelatedPropertyOpen, uploadNoteOpen]);

  useEffect(() => {
    if (!isUploadLegalDocOpen || !uploadDocTypeOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (uploadDocTypeRootRef.current?.contains(target)) return;
      setUploadDocTypeOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [isUploadLegalDocOpen, uploadDocTypeOpen]);

  useEffect(() => {
    if (!isUploadLegalDocOpen || !uploadRelatedPropertyOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (uploadRelatedPropertyRootRef.current?.contains(target)) return;
      setUploadRelatedPropertyOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [isUploadLegalDocOpen, uploadRelatedPropertyOpen]);

  useEffect(() => {
    if (!isUploadLegalDocOpen || !uploadNoteOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (uploadNoteRootRef.current?.contains(target)) return;
      setUploadNoteOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [isUploadLegalDocOpen, uploadNoteOpen]);

  const updateOwnershipMenuLayout = () => {
    const btn = document.getElementById("ownership-select-trigger");
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    setOwnershipMenuLayout({
      top: r.bottom + 4,
      left: r.left,
      width: r.width,
    });
  };

  useLayoutEffect(() => {
    if (!ownershipOpen) {
      setOwnershipMenuLayout(null);
      return;
    }
    updateOwnershipMenuLayout();
  }, [ownershipOpen]);

  useEffect(() => {
    if (!ownershipOpen) return;

    const onReposition = () => updateOwnershipMenuLayout();
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    const modalScroll = addLandModalScrollRef.current;
    modalScroll?.addEventListener("scroll", onReposition, { passive: true });

    const close = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (ownershipRootRef.current?.contains(t)) return;
      if (ownershipMenuRef.current?.contains(t)) return;
      setOwnershipOpen(false);
    };

    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
      modalScroll?.removeEventListener("scroll", onReposition);
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [ownershipOpen]);

  const updateDevStatusMenuLayout = () => {
    const btn = document.getElementById("dev-status-select-trigger");
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    setDevStatusMenuLayout({
      top: r.bottom + 4,
      left: r.left,
      width: r.width,
    });
  };

  useLayoutEffect(() => {
    if (!devStatusOpen) {
      setDevStatusMenuLayout(null);
      return;
    }
    updateDevStatusMenuLayout();
  }, [devStatusOpen]);

  useEffect(() => {
    if (!devStatusOpen) return;

    const onReposition = () => updateDevStatusMenuLayout();
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    const modalScroll = addLandModalScrollRef.current;
    modalScroll?.addEventListener("scroll", onReposition, { passive: true });

    const close = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (devStatusRootRef.current?.contains(t)) return;
      if (devStatusMenuRef.current?.contains(t)) return;
      setDevStatusOpen(false);
    };

    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
      modalScroll?.removeEventListener("scroll", onReposition);
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [devStatusOpen]);

  useEffect(() => {
    if (!isAddLandOpen && !isUploadLegalDocOpen && !isUploadSuccessOpen && !viewingLegalDoc) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isAddLandOpen, isUploadLegalDocOpen, isUploadSuccessOpen, viewingLegalDoc]);

  const getLegalDocTextContent = (doc: (typeof LEGAL_DOCUMENTS)[number]) =>
    [
      `Title: ${doc.title}`,
      `Property: ${doc.property}`,
      `Type: PDF`,
      `Size: ${doc.size}`,
      `Date: ${doc.date}`,
      "",
      "This is a generated preview/download payload for demo purposes.",
    ].join("\n");

  const handleDownloadLegalDoc = (doc: (typeof LEGAL_DOCUMENTS)[number]) => {
    const blob = new Blob([getLegalDocTextContent(doc)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  useLayoutEffect(() => {
    if (!landActionMenu) {
      setLandActionMenuLayout(null);
      return;
    }
    updateLandActionMenuLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landActionMenu]);

  useEffect(() => {
    if (!landActionMenu) return;

    const onReposition = () => updateLandActionMenuLayout();
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    const listScroll = landRecordsScrollRef.current;
    listScroll?.addEventListener("scroll", onReposition, { passive: true });

    const close = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      const trigger = getLandActionTrigger(
        landActionMenu.recordId,
        landActionMenu.source,
      );
      if (trigger?.contains(t)) return;
      if (landActionMenuRef.current?.contains(t)) return;
      setLandActionMenu(null);
    };

    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
      listScroll?.removeEventListener("scroll", onReposition);
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landActionMenu]);

  useEffect(() => {
    if (!landActionMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setLandActionMenu(null);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [landActionMenu]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#F8FAFC] p-2 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="flex min-h-0 flex-col rounded-xl sm:rounded-[16px] bg-white border border-[#E2E8F0] overflow-hidden shadow-sm sm:shadow-none">
        <div className="shrink-0 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 px-3 pt-4 pb-2 sm:px-6 sm:pt-6">
          <div className="flex min-w-0 flex-col gap-1.5 sm:gap-2">
            <div className="flex flex-wrap items-center gap-2 gap-y-1">
              <h1 className="min-w-0 text-[17px] leading-snug sm:text-[22px] md:text-[28px] lg:text-[32px] font-semibold text-[#0F172A]">
                Land &amp; Planning Management
              </h1>
              <span className="shrink-0 rounded-full bg-[#EAF2FF] px-2.5 py-0.5 text-[11px] sm:px-3 sm:py-1 sm:text-[12px] md:text-[14px] font-semibold text-[#2563EB]">
                New
              </span>
            </div>
            <p className="text-[12px] leading-snug sm:text-[14px] md:text-[16px] lg:text-[20px] text-[#64748B] max-w-2xl">
              Manage land records, plot layouts, and legal documentation
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditLandRecordId(null);
              setOwnership(null);
              setDevStatus(null);
              setIsAddLandOpen(true);
            }}
            className="inline-flex w-full sm:w-auto touch-manipulation items-center justify-center gap-2 rounded-[12px] bg-[#1D75F8] px-4 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[16px] md:text-[18px] font-medium text-white min-h-[44px] sm:min-h-0 sm:h-[48px] shrink-0"
          >
            <span className="text-[18px] sm:text-[20px] leading-none">+</span>
            Add New Land
          </button>
        </div>

        <div className="shrink-0 mt-4 sm:mt-6 px-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="-mx-1 flex w-full min-w-0 sm:mx-0 sm:w-auto">
              <div
                className="inline-flex w-full min-w-0 overflow-x-auto overscroll-x-contain rounded-[10px] border border-[#CBD5E1] [scrollbar-width:thin]"
                role="tablist"
                aria-label="Land planning sections"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={`shrink-0 touch-manipulation px-3 py-2.5 text-left text-[12px] leading-tight sm:px-5 sm:py-3 sm:text-[14px] md:text-[16px] lg:text-[18px] ${
                      activeTab === tab
                        ? "bg-[#F8FAFC] text-[#1E293B]"
                        : "bg-white text-[#334155]"
                    } ${tab !== tabs[tabs.length - 1] ? "border-r border-[#CBD5E1]" : ""}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === TAB_LAND_RECORD ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:shrink-0">
                <div className="flex h-[44px] w-full min-w-0 lg:w-[min(100%,420px)] items-center gap-2 rounded-[10px] border border-[#CBD5E1] px-3 sm:gap-3 sm:px-4">
                  <svg
                    className="shrink-0"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="#64748B"
                      strokeWidth="2"
                    />
                    <path d="M21 21L16.65 16.65" stroke="#64748B" strokeWidth="2" />
                  </svg>
                  <input
                    type="search"
                    enterKeyHint="search"
                    placeholder="Search"
                    className="min-w-0 flex-1 border-none bg-transparent text-[16px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-[#334155] outline-none placeholder:text-[#94A3B8]"
                  />
                </div>

                <button
                  type="button"
                  className="flex h-[44px] min-h-[44px] touch-manipulation items-center justify-center gap-2 rounded-[10px] border border-[#CBD5E1] bg-white px-4 text-[14px] sm:h-[48px] sm:gap-3 sm:px-6 sm:text-[15px] md:text-[16px] lg:text-[18px] text-[#334155] sm:min-h-0 lg:h-[54px]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M3 6H21M6 12H18M10 18H14"
                      stroke="#334155"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Filters
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div
          ref={landRecordsScrollRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain px-3 pb-4 pt-1 sm:px-6 sm:pb-6 sm:pt-0"
        >
          {activeTab === TAB_LAND_RECORD ? (
          <div className="mt-3 sm:mt-5">
          {/* Mobile / tablet: card list */}
          <div className="lg:hidden space-y-2.5 sm:space-y-3">
            {landRecords.map((record) => (
              <div
                key={record.id}
                className="rounded-xl border border-[#E2E8F0] bg-[#FAFBFC] px-3 py-3.5 sm:rounded-[16px] sm:px-4 sm:py-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 pr-1">
                    <p className="text-[15px] leading-snug font-semibold text-[#0F172A] break-words sm:text-[16px]">
                      {record.propertyName}
                    </p>
                    <p className="mt-1 text-[11px] text-[#94A3B8] sm:text-[12px]">
                      {record.createdAt}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-land-action={record.id}
                    data-action-src="card"
                    aria-expanded={
                      landActionMenu?.recordId === record.id &&
                      landActionMenu.source === "card"
                    }
                    aria-haspopup="menu"
                    aria-controls="land-record-action-menu"
                    onClick={() => toggleLandActionMenu(record.id, "card")}
                    className="touch-manipulation shrink-0 rounded-lg px-2 py-1 text-[18px] leading-none text-[#64748B] outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#1D75F8]/30 active:bg-slate-200 sm:text-[20px]"
                    aria-label={`More actions for ${record.propertyName}`}
                  >
                    ⋮
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2.5 sm:grid-cols-2 sm:gap-x-3">
                  <div>
                    <p className="text-[12px] text-[#64748B]">Location</p>
                    <p className="text-[14px] text-[#64748B] mt-1 break-words">
                      {record.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#64748B]">Total Area</p>
                    <p className="text-[14px] text-[#64748B] mt-1 break-words">
                      {record.totalArea}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] text-[#64748B]">Plots</p>
                    <p className="text-[14px] text-[#64748B] mt-1">
                      {record.totalPlots} Total
                    </p>
                    <p className="text-[14px] text-[#10B981]">
                      {record.availablePlots} Available
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#64748B]">Ownership</p>
                    <p className="text-[14px] text-[#64748B] mt-1 break-words">
                      {record.ownership}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${statusBadgeStyles[record.status]}`}
                  >
                    {record.status}
                  </span>
                  <span className="text-[12px] text-[#94A3B8]"> </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet/Desktop: table */}
          <div className="hidden lg:block mt-0 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-y border-[#E2E8F0] text-left text-[14px] sm:text-[16px] md:text-[18px] font-normal text-[#64748B]">
                  <th className="px-4 sm:px-6 py-3 sm:py-4 font-normal">
                    <div className="flex items-center gap-2">
                      Property Name
                      <span className="text-[14px] sm:text-[16px]">↓</span>
                    </div>
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 font-normal">
                    Location
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 font-normal">
                    Total Area
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 font-normal">
                    Plots
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 font-normal">
                    Ownership
                  </th>
                  <th className="px-3 sm:px-4 py-3 sm:py-4 font-normal">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {landRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-[#E2E8F0] align-top"
                  >
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <p className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-[#0F172A]">
                        {record.propertyName}
                      </p>
                      <p className="text-[12px] sm:text-[14px] md:text-[16px] text-[#94A3B8]">
                        {record.createdAt}
                      </p>
                    </td>
                    <td className="px-3 sm:px-4 py-4 sm:py-5 text-[14px] sm:text-[16px] md:text-[18px] text-[#64748B]">
                      {record.location}
                    </td>
                    <td className="px-3 sm:px-4 py-4 sm:py-5 text-[14px] sm:text-[16px] md:text-[18px] text-[#64748B]">
                      {record.totalArea}
                    </td>
                    <td className="px-3 sm:px-4 py-4 sm:py-5">
                      <p className="text-[12px] sm:text-[14px] md:text-[16px] text-[#64748B]">
                        {record.totalPlots} Total
                      </p>
                      <p className="text-[12px] sm:text-[14px] md:text-[16px] text-[#10B981]">
                        {record.availablePlots} Available
                      </p>
                    </td>
                    <td className="px-3 sm:px-4 py-4 sm:py-5 text-[14px] sm:text-[16px] md:text-[18px] text-[#64748B]">
                      {record.ownership}
                    </td>
                    <td className="px-3 sm:px-4 py-4 sm:py-5">
                      <span
                        className={`inline-flex rounded-full px-3 sm:px-5 py-1 text-[12px] sm:text-[14px] md:text-[16px] font-medium ${statusBadgeStyles[record.status]}`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-right">
                      <button
                        type="button"
                        data-land-action={record.id}
                        data-action-src="table"
                        aria-expanded={
                          landActionMenu?.recordId === record.id &&
                          landActionMenu.source === "table"
                        }
                        aria-haspopup="menu"
                        aria-controls="land-record-action-menu"
                        onClick={() => toggleLandActionMenu(record.id, "table")}
                        className="touch-manipulation rounded-lg px-2 py-1 text-[18px] leading-none text-[#64748B] outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-[#1D75F8]/30 active:bg-slate-200 sm:text-[22px]"
                        aria-label={`More actions for ${record.propertyName}`}
                      >
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
          ) : null}

          {activeTab === TAB_PLOT_LAYOUT ? (
            <PlotLayoutTab propertyNames={plotPropertyNames} />
          ) : null}

          {activeTab === TAB_LEGAL_DOCUMENTS ? (
            <div className="mt-5 px-1 pb-4 sm:mt-6 sm:px-0 sm:pb-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <h2 className="text-[34px] font-semibold leading-tight text-[#0F172A]">
                  Legal Documents
                </h2>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
                  <div className="relative w-full sm:w-[260px]" ref={legalDocsPropertyRootRef}>
                    <button
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={legalDocsPropertyOpen}
                      aria-controls="legal-docs-property-listbox"
                      onClick={() => setLegalDocsPropertyOpen((o) => !o)}
                      className={`flex h-[44px] w-full items-center justify-between gap-2 rounded-[10px] border bg-white py-2 pl-4 pr-3 text-left text-[15px] outline-none transition-[border-color,box-shadow] ${
                        legalDocsPropertyOpen
                          ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                          : "border-[#93C5FD]"
                      }`}
                    >
                      <span className={legalDocsProperty ? "text-[#111827]" : "text-[#94A3B8]"}>
                        {legalDocsProperty || "Select Property"}
                      </span>
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
                    {legalDocsPropertyOpen ? (
                      <ul
                        id="legal-docs-property-listbox"
                        role="listbox"
                        className="absolute left-0 right-0 top-full mt-1 z-[30] overflow-hidden rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                      >
                        {RELATED_LAND_PROPERTY_OPTIONS.map((name) => (
                          <li key={name} role="presentation" className="border-b border-[#F0F2F5] last:border-b-0">
                            <button
                              type="button"
                              role="option"
                              aria-selected={legalDocsProperty === name}
                              onClick={() => {
                                setLegalDocsProperty(name);
                                setLegalDocsPropertyOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left text-[15px] transition-colors ${
                                legalDocsProperty === name
                                  ? "bg-[#1D75F8] text-white"
                                  : "bg-white text-[#4B5563] hover:bg-[#1D75F8] hover:text-white"
                              }`}
                            >
                              {name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsUploadLegalDocOpen(true)}
                    className="inline-flex h-[44px] shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#1D75F8] px-4 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-[#1569E8] active:bg-[#145FDB]"
                  >
                    <span className="text-[18px] leading-none">+</span>
                    Upload Document
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
                {LEGAL_DOCUMENTS.map((doc) => (
                  <article
                    key={doc.id}
                    className="flex items-center gap-3 rounded-[12px] border border-[#D1D5DB] bg-white px-4 py-4 sm:px-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-[#FFF5F5]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z"
                          stroke="#EF4444"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2v5h5M9 12h6M9 16h6"
                          stroke="#EF4444"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[20px] font-semibold leading-tight text-[#0F172A]">
                        {doc.title} - {doc.property}
                      </p>
                      <p className="mt-1 text-[16px] text-[#6B7280]">PDF • {doc.size} • {doc.date}</p>
                    </div>
                    <div className="ml-2 flex shrink-0 items-center gap-4 text-[#4B5563]">
                      <button
                        type="button"
                        onClick={() => setViewingLegalDoc(doc)}
                        className="rounded p-1 hover:bg-[#F8FAFC]"
                        aria-label={`Preview ${doc.title}`}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadLegalDoc(doc)}
                        className="rounded p-1 hover:bg-[#F8FAFC]"
                        aria-label={`Download ${doc.title}`}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path
                            d="M12 4v10m0 0 4-4m-4 4-4-4M4 20h16"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {isUploadLegalDocOpen ? (
        <div
          className="fixed inset-0 z-[58] flex items-end justify-center bg-black/35 p-3 sm:items-center sm:p-4"
          onClick={() => {
            setUploadDocTypeOpen(false);
            setUploadRelatedPropertyOpen(false);
            setUploadNoteOpen(false);
            setIsUploadLegalDocOpen(false);
          }}
          role="presentation"
        >
          <div
            className="w-full max-w-[640px] rounded-[22px] bg-white px-4 pb-5 pt-5 shadow-2xl sm:rounded-[24px] sm:px-6 sm:pb-6 sm:pt-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-legal-document-title"
          >
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3
                  id="upload-legal-document-title"
                  className="text-[18px] font-semibold leading-tight text-[#111827] sm:text-[20px]"
                >
                  Upload Legal Document
                </h3>
                <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[11px] font-semibold text-[#2563EB] sm:px-3 sm:py-1 sm:text-[12px]">
                  New
                </span>
              </div>
              <p className="text-[13px] leading-snug text-[#667085] sm:text-[14px]">
                Upload a legal document for your land properties
              </p>
            </div>

            <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
              <input
                ref={uploadLegalFileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                className="sr-only"
                tabIndex={-1}
              />

              <div className="relative" ref={uploadDocTypeRootRef}>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={uploadDocTypeOpen}
                  aria-controls="upload-doc-type-listbox"
                  onClick={() => setUploadDocTypeOpen((o) => !o)}
                  className={`flex h-[50px] w-full items-center justify-between gap-2 rounded-[10px] border bg-white py-2 pl-4 pr-10 text-left text-[15px] outline-none transition-[border-color,box-shadow] sm:h-[52px] sm:text-[16px] ${
                    uploadDocTypeOpen
                      ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                      : "border-[#E5E7EB]"
                  }`}
                >
                  <span className={uploadDocType ? "text-[#111827]" : "text-[#A3A3A3]"}>
                    {uploadDocType ?? "Select Document Type"}
                  </span>
                  <span className="ml-auto shrink-0 text-[#1D75F8]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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

                {uploadDocTypeOpen ? (
                  <ul
                    id="upload-doc-type-listbox"
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                  >
                    {LEGAL_DOC_TYPE_OPTIONS.map((option) => (
                      <li key={option} role="presentation" className="border-b border-[#F0F2F5] last:border-b-0">
                        <button
                          type="button"
                          role="option"
                          aria-selected={uploadDocType === option}
                          onClick={() => {
                            setUploadDocType(option);
                            setUploadDocTypeOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-[15px] transition-colors ${
                            uploadDocType === option ||
                            (!uploadDocType && option === LEGAL_DOC_TYPE_OPTIONS[0])
                              ? "bg-[#1D75F8] text-white"
                              : "bg-white text-[#4B5563] hover:bg-[#1D75F8] hover:text-white"
                          }`}
                        >
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <input
                type="text"
                placeholder="Document Name"
                className="h-[50px] w-full rounded-[10px] border border-[#E5E7EB] px-4 text-[15px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:h-[52px] sm:text-[16px]"
              />

              <div className="relative" ref={uploadRelatedPropertyRootRef}>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={uploadRelatedPropertyOpen}
                  aria-controls="upload-related-property-listbox"
                  onClick={() => setUploadRelatedPropertyOpen((o) => !o)}
                  className={`flex h-[50px] w-full items-center justify-between gap-2 rounded-[10px] border bg-white py-2 pl-4 pr-10 text-left text-[15px] outline-none transition-[border-color,box-shadow] sm:h-[52px] sm:text-[16px] ${
                    uploadRelatedPropertyOpen
                      ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                      : "border-[#E5E7EB]"
                  }`}
                >
                  <span className={uploadRelatedProperty ? "text-[#111827]" : "text-[#A3A3A3]"}>
                    {uploadRelatedProperty ?? "Related Land Property"}
                  </span>
                  <span className="ml-auto shrink-0 text-[#1D75F8]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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

                {uploadRelatedPropertyOpen ? (
                  <ul
                    id="upload-related-property-listbox"
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                  >
                    {RELATED_LAND_PROPERTY_OPTIONS.map((name) => (
                      <li key={name} role="presentation" className="border-b border-[#F0F2F5] last:border-b-0">
                        <button
                          type="button"
                          role="option"
                          aria-selected={uploadRelatedProperty === name}
                          onClick={() => {
                            setUploadRelatedProperty(name);
                            setUploadRelatedPropertyOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-[15px] transition-colors ${
                            uploadRelatedProperty === name ||
                            (!uploadRelatedProperty && name === RELATED_LAND_PROPERTY_OPTIONS[0])
                              ? "bg-[#1D75F8] text-white"
                              : "bg-white text-[#4B5563] hover:bg-[#1D75F8] hover:text-white"
                          }`}
                        >
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => {
                  uploadLegalFileInputRef.current?.click();
                }}
                className="flex h-[170px] w-full flex-col items-center justify-center gap-1.5 rounded-[10px] border-2 border-dashed border-[#D1D5DB] bg-white px-4 text-center sm:h-[180px]"
              >
                <svg
                  className="text-[#9CA3AF]"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 5v10M8 9l4-4 4 4M5 19h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[16px] font-medium text-[#9CA3AF] sm:text-[18px]">
                  Click to Upload
                </span>
                <span className="text-[12px] text-[#9CA3AF] sm:text-[14px]">
                  PDF, DOC, DOCX up to 10MB
                </span>
              </button>

              <div className="relative" ref={uploadNoteRootRef}>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={uploadNoteOpen}
                  aria-controls="upload-note-listbox"
                  onClick={() => setUploadNoteOpen((o) => !o)}
                  className={`flex h-[50px] w-full items-center justify-between gap-2 rounded-[10px] border bg-white py-2 pl-4 pr-10 text-left text-[15px] outline-none transition-[border-color,box-shadow] sm:h-[52px] sm:text-[16px] ${
                    uploadNoteOpen
                      ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                      : "border-[#E5E7EB]"
                  }`}
                >
                  <span className={uploadNote ? "text-[#111827]" : "text-[#A3A3A3]"}>
                    {uploadNote ?? "Additional note about document......."}
                  </span>
                  <span className="ml-auto shrink-0 text-[#1D75F8]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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

                {uploadNoteOpen ? (
                  <ul
                    id="upload-note-listbox"
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                  >
                    {LEGAL_DOC_NOTE_OPTIONS.map((note) => (
                      <li key={note} role="presentation" className="border-b border-[#F0F2F5] last:border-b-0">
                        <button
                          type="button"
                          role="option"
                          aria-selected={uploadNote === note}
                          onClick={() => {
                            setUploadNote(note);
                            setUploadNoteOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-[15px] transition-colors ${
                            uploadNote === note
                              ? "bg-[#1D75F8] text-white"
                              : "bg-white text-[#4B5563] hover:bg-[#1D75F8] hover:text-white"
                          }`}
                        >
                          {note}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2.5 sm:mt-6">
              <button
                type="button"
                onClick={() => setIsUploadLegalDocOpen(false)}
                className="h-11 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-5 text-[14px] font-medium text-[#111827] transition-colors hover:bg-[#F1F5F9] sm:h-12 sm:px-6 sm:text-[15px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadDocTypeOpen(false);
                  setUploadRelatedPropertyOpen(false);
                  setUploadNoteOpen(false);
                  setIsUploadLegalDocOpen(false);
                  setIsUploadSuccessOpen(true);
                }}
                className="h-11 rounded-lg bg-[#1D75F8] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1569E8] sm:h-12 sm:px-6 sm:text-[15px]"
              >
                Add New Land
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isUploadSuccessOpen ? (
        <div
          className="fixed inset-0 z-[59] flex items-end justify-center bg-black/35 p-3 sm:items-center sm:p-4"
          onClick={() => setIsUploadSuccessOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[560px] rounded-[24px] bg-white px-7 pb-7 pt-8 shadow-2xl sm:px-10 sm:pb-8 sm:pt-9"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-success-title"
          >
            <div className="mx-auto flex h-[132px] w-[132px] items-center justify-center rounded-full bg-[#FCF9F9]">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12.5L10 17.5L19 6.5"
                  stroke="#1D75F8"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3
              id="upload-success-title"
              className="mt-7 text-center text-[22px] font-semibold leading-tight text-[#111827] sm:text-[24px]"
            >
              Document Uploaded
            </h3>

            <button
              type="button"
              onClick={() => setIsUploadSuccessOpen(false)}
              className="mt-7 inline-flex h-[62px] w-full items-center justify-center rounded-[22px] bg-[#1D75F8] text-[17px] font-medium text-white transition-colors hover:bg-[#1569E8] sm:text-[18px]"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}

      {viewingLegalDoc ? (
        <div
          className="fixed inset-0 z-[59] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
          onClick={() => setViewingLegalDoc(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-[760px] rounded-t-[20px] bg-white px-4 pb-5 pt-5 shadow-2xl sm:rounded-[20px] sm:px-6 sm:pb-6 sm:pt-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-legal-doc-title"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 id="view-legal-doc-title" className="text-[18px] font-semibold text-[#111827] sm:text-[20px]">
                  {viewingLegalDoc.title}
                </h3>
                <p className="text-[13px] text-[#667085] sm:text-[14px]">
                  {viewingLegalDoc.property} • PDF • {viewingLegalDoc.size} • {viewingLegalDoc.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingLegalDoc(null)}
                className="rounded-md p-2 text-[#475467] hover:bg-[#F8FAFC]"
                aria-label="Close document preview"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 rounded-[12px] border border-[#E4E7EC] bg-[#FCFCFD] p-4">
              <pre className="whitespace-pre-wrap text-[14px] text-[#344054]">
                {getLegalDocTextContent(viewingLegalDoc)}
              </pre>
            </div>

            <div className="mt-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => handleDownloadLegalDoc(viewingLegalDoc)}
                className="h-10 rounded-[10px] bg-[#1D75F8] px-4 text-[14px] font-medium text-white hover:bg-[#1569E8]"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isAddLandOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:bg-black/35 sm:p-4 md:px-6 md:py-4"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            key={editLandRecordId ?? "new-project"}
            ref={addLandModalScrollRef}
            className="relative max-h-[90dvh] w-full max-w-[520px] overflow-y-auto overscroll-y-contain rounded-t-[20px] bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-3 shadow-2xl sm:max-h-[92vh] sm:rounded-[24px] sm:px-5 sm:pb-5 sm:pt-5 md:px-6 md:pt-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 md:hidden">
              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[#475467] hover:text-[#1F2937]"
              >
                <span className="text-[18px] leading-none">←</span>
                Back
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <h2 className="text-[16px] font-semibold leading-tight text-[#111827] sm:text-[18px]">
                  {editLandRecord ? "Edit Project" : "Create New Project"}
                </h2>
                {editLandRecord ? (
                  <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[12px] font-semibold leading-none text-[#475569] sm:px-3 sm:py-1 sm:text-[14px]">
                    Edit
                  </span>
                ) : (
                  <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[12px] font-semibold leading-none text-[#2563EB] sm:px-3 sm:py-1 sm:text-[14px]">
                    New
                  </span>
                )}
              </div>
              <p className="text-[12px] leading-snug text-[#667085] sm:text-[13px] sm:leading-[1.4]">
                Upload a legal document for your land properties
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-x-4 sm:gap-y-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium leading-snug text-[#111827] sm:text-[14px]">
                  Property Name *
                </label>
                <input
                  type="text"
                  name="land-property-name"
                  placeholder="e.g., Skyline Apartments"
                  defaultValue={editLandRecord?.propertyName ?? ""}
                  className="min-h-[44px] w-full rounded-[10px] border border-[#E5E7EB] px-3.5 py-2.5 text-[15px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:min-h-[48px] sm:px-5 sm:text-[16px] md:min-h-[50px] md:text-[16px]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium leading-snug text-[#111827] sm:text-[14px]">
                  Total Area *
                </label>
                <input
                  type="text"
                  name="land-total-area"
                  placeholder="e.g., ABC Builders"
                  defaultValue={editLandRecord?.totalArea ?? ""}
                  className="min-h-[44px] w-full rounded-[10px] border border-[#E5E7EB] px-3.5 py-2.5 text-[15px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:min-h-[48px] sm:px-5 sm:text-[16px] md:min-h-[50px] md:text-[16px]"
                />
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-1.5">
              <label className="text-[13px] font-medium leading-snug text-[#111827] sm:text-[14px]">
                Location *
              </label>
              <input
                type="text"
                name="land-location"
                placeholder="e.g., Phase 6, DHA"
                defaultValue={editLandRecord?.location ?? ""}
                className="min-h-[44px] w-full rounded-[10px] border border-[#E5E7EB] px-3.5 py-2.5 text-[15px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:min-h-[48px] sm:px-5 sm:text-[16px] md:min-h-[50px] md:text-[16px]"
              />
            </div>

            <div className="mt-3 flex flex-col gap-1.5">
              <label className="text-[13px] font-medium leading-snug text-[#111827] sm:text-[14px]">
                Amount *
              </label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="e.g., 6000000"
                className="min-h-[44px] w-full rounded-[10px] border border-[#E5E7EB] px-3.5 py-2.5 text-[15px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:min-h-[48px] sm:px-5 sm:text-[16px] md:min-h-[50px] md:text-[16px]"
              />
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:gap-x-4 sm:gap-y-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium leading-snug text-[#111827] sm:text-[14px]">
                  Plots *
                </label>
                <input
                  type="text"
                  name="land-plots"
                  inputMode="numeric"
                  placeholder="e.g., 120"
                  defaultValue={
                    editLandRecord ? String(editLandRecord.totalPlots) : ""
                  }
                  className="min-h-[44px] w-full rounded-[10px] border border-[#E5E7EB] px-3.5 py-2.5 text-[15px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:min-h-[48px] sm:px-5 sm:text-[16px] md:min-h-[50px] md:text-[16px]"
                />
              </div>

              <div className="relative flex flex-col gap-1.5" ref={ownershipRootRef}>
                <label
                  htmlFor="ownership-select-trigger"
                  className="text-[13px] font-medium leading-snug text-[#111827] sm:text-[14px]"
                >
                  Ownership{" "}
                  <span className="font-semibold text-[#2563EB]" aria-hidden>
                    *
                  </span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    id="ownership-select-trigger"
                    aria-haspopup="listbox"
                    aria-expanded={ownershipOpen}
                    aria-controls="ownership-listbox"
                    onClick={() => {
                      setDevStatusOpen(false);
                      setOwnershipOpen((o) => !o);
                    }}
                    className={`flex min-h-[44px] w-full items-center justify-between gap-2 rounded-[10px] border bg-white px-3.5 text-left text-[15px] outline-none transition-[border-color,box-shadow] sm:min-h-[48px] sm:px-5 sm:text-[16px] md:min-h-[50px] md:text-[16px] ${
                      ownershipOpen
                        ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                        : "border-[#E5E7EB] hover:border-[#CBD5E1]"
                    }`}
                  >
                    <span
                      className={
                        ownership ? "truncate text-[#111827]" : "truncate text-[#A3A3A3]"
                      }
                    >
                      {ownership ?? "Select ownership"}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`shrink-0 text-[#1677FF] transition-transform duration-200 ${
                        ownershipOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                </div>
              </div>

              {ownershipOpen && ownershipMenuLayout
                ? createPortal(
                    <ul
                      ref={ownershipMenuRef}
                      id="ownership-listbox"
                      role="listbox"
                      aria-labelledby="ownership-select-trigger"
                      style={{
                        position: "fixed",
                        top: ownershipMenuLayout.top,
                        left: ownershipMenuLayout.left,
                        width: ownershipMenuLayout.width,
                        zIndex: 80,
                      }}
                      className="overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white py-1 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.18),0_4px_12px_-4px_rgba(15,23,42,0.08)]"
                    >
                      {OWNERSHIP_OPTIONS.map((option) => {
                        const selected = ownership === option;
                        return (
                          <li key={option} role="presentation">
                            <button
                              type="button"
                              role="option"
                              aria-selected={selected}
                              onClick={() => {
                                setOwnership(option);
                                setOwnershipOpen(false);
                              }}
                              className={`flex w-full items-center px-4 py-3 text-left text-[16px] transition-colors sm:px-5 sm:py-3.5 sm:text-[17px] md:text-[18px] ${
                                selected
                                  ? "bg-[#1D75F8] font-medium text-white"
                                  : "bg-white text-[#374151] hover:bg-[#1D75F8] hover:font-medium hover:text-white"
                              }`}
                            >
                              {option}
                            </button>
                          </li>
                        );
                      })}
                    </ul>,
                    document.body,
                  )
                : null}
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:gap-x-4 sm:gap-y-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium leading-snug text-[#111827] sm:text-[14px]">
                  Purchase Date *
                </label>
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="min-h-[44px] w-full rounded-[10px] border border-[#E5E7EB] px-3.5 py-2.5 text-[15px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:min-h-[48px] sm:px-5 sm:text-[16px] md:min-h-[50px] md:text-[16px]"
                />
              </div>

              <div
                className="relative flex flex-col gap-1.5"
                ref={devStatusRootRef}
              >
                <label
                  htmlFor="dev-status-select-trigger"
                  className="text-[13px] font-medium leading-snug text-[#111827] sm:text-[14px]"
                >
                  Development Status{" "}
                  <span className="font-semibold text-[#2563EB]" aria-hidden>
                    *
                  </span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    id="dev-status-select-trigger"
                    aria-haspopup="listbox"
                    aria-expanded={devStatusOpen}
                    aria-controls="dev-status-listbox"
                    onClick={() => {
                      setOwnershipOpen(false);
                      setDevStatusOpen((o) => !o);
                    }}
                    className={`flex min-h-[44px] w-full items-center justify-between gap-2 rounded-[10px] border bg-white px-3.5 text-left text-[15px] outline-none transition-[border-color,box-shadow] sm:min-h-[48px] sm:px-5 sm:text-[16px] md:min-h-[50px] md:text-[16px] ${
                      devStatusOpen
                        ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                        : "border-[#E5E7EB] hover:border-[#CBD5E1]"
                    }`}
                  >
                    <span
                      className={
                        devStatus
                          ? "truncate text-[#111827]"
                          : "truncate text-[#A3A3A3]"
                      }
                    >
                      {devStatus ?? "Select Status"}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`shrink-0 text-[#1677FF] transition-transform duration-200 ${
                        devStatusOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {devStatusOpen && devStatusMenuLayout
              ? createPortal(
                  <ul
                    ref={devStatusMenuRef}
                    id="dev-status-listbox"
                    role="listbox"
                    aria-labelledby="dev-status-select-trigger"
                    style={{
                      position: "fixed",
                      top: devStatusMenuLayout.top,
                      left: devStatusMenuLayout.left,
                      width: devStatusMenuLayout.width,
                      zIndex: 80,
                    }}
                    className="overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white py-0 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.18),0_4px_12px_-4px_rgba(15,23,42,0.08)]"
                  >
                    {DEVELOPMENT_STATUS_OPTIONS.map((option) => {
                      const selected = devStatus === option;
                      return (
                        <li
                          key={option}
                          role="presentation"
                          className="border-b border-[#F0F2F5] last:border-b-0"
                        >
                          <button
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onClick={() => {
                              setDevStatus(option);
                              setDevStatusOpen(false);
                            }}
                            className={`flex w-full items-center px-4 py-3 text-left text-[16px] transition-colors sm:px-5 sm:py-3.5 sm:text-[17px] md:text-[18px] ${
                              selected
                                ? "bg-[#1D75F8] font-medium text-white"
                                : "bg-white text-[#374151] hover:bg-[#1D75F8] hover:font-medium hover:text-white"
                            }`}
                          >
                            {option}
                          </button>
                        </li>
                      );
                    })}
                  </ul>,
                  document.body,
                )
              : null}

            <div className="mt-3 flex flex-col gap-1.5">
              <label className="text-[13px] font-medium leading-snug text-[#111827] sm:text-[14px]">
                Description
              </label>
              <textarea
                placeholder="Project details and scope..."
                className="min-h-[80px] resize-none rounded-[10px] border border-[#E5E7EB] px-3.5 py-3 text-[15px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:min-h-[96px] sm:px-5 sm:py-4 sm:text-[15px] md:min-h-[108px] md:text-[16px]"
              />
            </div>

            <div className="mt-4 flex flex-col-reverse gap-2.5 sm:mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-3 sm:pr-0">
              <button
                type="button"
                onClick={handleCloseModal}
                className="h-10 w-full touch-manipulation rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[14px] font-medium text-[#111827] shadow-[0_1px_2px_rgba(16,24,40,0.06)] sm:h-11 sm:w-[112px] sm:text-[15px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (editLandRecord) applyLandRecordEditFromModal();
                }}
                className="h-10 w-full touch-manipulation rounded-[10px] bg-[#1D75F8] px-4 text-[14px] font-medium text-white shadow-[0_1px_2px_rgba(16,24,40,0.08)] sm:h-11 sm:w-[160px] sm:text-[15px]"
              >
                {editLandRecord ? "Save changes" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {landActionMenu && landActionMenuLayout && landActionTargetRecord
        ? createPortal(
            <div
              ref={landActionMenuRef}
              id="land-record-action-menu"
              role="menu"
              aria-orientation="vertical"
              style={{
                position: "fixed",
                top: landActionMenuLayout.top,
                left: landActionMenuLayout.left,
                width: landActionMenuLayout.width,
                zIndex: 60,
              }}
              className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white p-2 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.2),0_4px_14px_-4px_rgba(15,23,42,0.1)]"
            >
              <button
                type="button"
                role="menuitem"
                onClick={handleLandActionEdit}
                className="flex w-full items-center justify-between gap-4 rounded-md px-3 py-3 text-[14px] font-medium text-[#333333] transition-colors hover:bg-[#F8FAFC] active:bg-[#F1F5F9] sm:px-3.5 sm:text-[15px]"
              >
                <svg
                  className="shrink-0 text-[#1D75F8]"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="min-w-0 flex-1 text-right">Edit</span>
              </button>
              <div className="mx-1 my-0.5 h-px bg-[#E8EAED]" aria-hidden />
              <button
                type="button"
                role="menuitem"
                onClick={handleLandActionDelete}
                className="flex w-full items-center gap-2.5 rounded-md px-3 py-3 text-left text-[14px] font-medium text-[#333333] transition-colors hover:bg-[#FEF2F2] active:bg-[#FEE2E2] sm:px-3.5 sm:text-[15px]"
              >
                <svg
                  className="shrink-0 text-[#DC2626]"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3 6h18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 11v6M14 11v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Delete</span>
              </button>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

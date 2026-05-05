"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HR_SUMMARY = [
  { label: "Total Employees", value: "45", icon: "employees" as const },
  { label: "Present Today", value: "45", icon: "employees" as const },
  { label: "Absent Today", value: "0", icon: "employees" as const },
  { label: "Monthly Payroll", value: "PKR 2.1 M", icon: "wallet" as const },
];

const HR_TABS = ["Employees", "Attendance", "Contractors", "Payroll"] as const;
type HrTab = (typeof HR_TABS)[number];

type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  salary: string;
  joined: string;
  avatarSrc: string;
};

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "emp-1",
    name: "Fatima Noor",
    role: "Sales Manager",
    department: "Sales",
    email: "fatima.noor@builderp.com",
    phone: "+92-300-1234567",
    salary: "PKR 80,000",
    joined: "2023-01-15",
    avatarSrc: "/images/employee-1.svg",
  },
  {
    id: "emp-2",
    name: "Ahmed Khan",
    role: "Site Engineer",
    department: "Construction",
    email: "ali.hassan@builderp.com",
    phone: "+92-300-1234567",
    salary: "PKR 80,000",
    joined: "2023-01-15",
    avatarSrc: "/images/employee-2.svg",
  },
  {
    id: "emp-3",
    name: "Ahmed Khan",
    role: "Accountant",
    department: "Finance",
    email: "ali.hassan@builderp.com",
    phone: "+92-300-1234567",
    salary: "PKR 80,000",
    joined: "2023-01-15",
    avatarSrc: "/images/employee-3.svg",
  },
];

const HR_EMPLOYEES_STORAGE_KEY = "hr-employees-v1";

const PROJECT_OPTIONS = [
  "Green Valley Phase 1",
  "Royal Palm Estate",
  "Sunrise Heights",
] as const;

const ATTENDANCE_ROWS = [
  { id: "att-1", name: "Ahmed Khan", date: "20/02/2026", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9 hours", status: "Present" as const },
  { id: "att-2", name: "Ahmed Khan", date: "20/02/2026", checkIn: "10:00 AM", checkOut: "06:00 PM", hours: "8 hours", status: "Present" as const },
  { id: "att-3", name: "Ahmed Khan", date: "20/02/2026", checkIn: "-", checkOut: "-", hours: "-", status: "Absent" as const },
];

const CONTRACTOR_ROWS = [
  { id: "con-1", name: "ABC Builders Ltd", project: "Green Valley Phase 1", type: "Main Contractor", contact: "+92-300-1111222", status: "Active" as const },
  { id: "con-2", name: "Elite Construction", project: "Royal Palm Estate", type: "Main Contractor", contact: "+92-321-3334444", status: "Active" as const },
  { id: "con-3", name: "Ahmed Khan", project: "Green Valley Phase 1", type: "Sub-Contractor", contact: "+92-333-5556666", status: "Active" as const },
];

const PAYROLL_ROWS = [
  { id: "pay-1", employee: "Ali Hassan", role: "Sales Manager", basicSalary: "PKR 80,000", allowances: "PKR 15,000", deductions: "PKR 5,000", netSalary: "PKR 90,000" },
  { id: "pay-2", employee: "Sara Ahmed", role: "Site Engineer", basicSalary: "PKR 95,000", allowances: "PKR 18,000", deductions: "PKR 6,000", netSalary: "PKR 107,000" },
  { id: "pay-3", employee: "Usman Tariq", role: "Accountant", basicSalary: "PKR 70,000", allowances: "PKR 12,000", deductions: "PKR 4,000", netSalary: "PKR 78,000" },
];

function SummaryIcon({ kind }: { kind: "employees" | "calendar" | "attendance" | "wallet" }) {
  if (kind === "employees") {
    return (
      <svg width="11" height="11" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="7.2" cy="7.2" r="2.2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="13.4" cy="6.8" r="1.8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.8 14.8c0-2 1.9-3.7 4.2-3.7s4.2 1.7 4.2 3.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M11.2 14.5c.2-1.5 1.6-2.7 3.3-2.7 1 0 1.9.4 2.5 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === "wallet") {
    return (
      <svg width="11" height="11" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="2.5" y="5.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M14.5 7.5h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="13.4" cy="10" r="0.9" fill="currentColor" />
      </svg>
    );
  }

  if (kind === "attendance") {
    return (
      <svg width="11" height="11" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="2.8" y="2.8" width="14.4" height="14.4" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M6 7.1h3.5M6 11.6h3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M11.8 7.2l1 1 1.6-1.6M11.8 11.7l1 1 1.6-1.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width="11" height="11" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.6" y="3.6" width="14.8" height="13.2" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6.2 2.5v2.7M13.8 2.5v2.7M2.6 7.8h14.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="6.7" cy="10.8" r="0.8" fill="currentColor" />
      <circle cx="10" cy="10.8" r="0.8" fill="currentColor" />
      <circle cx="13.3" cy="10.8" r="0.8" fill="currentColor" />
    </svg>
  );
}

export default function HumanResources({ defaultTab = "Employees" }: { defaultTab?: HrTab }) {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [isAddContractorOpen, setIsAddContractorOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [department, setDepartment] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<HrTab>(defaultTab);
  const [selectedDate, setSelectedDate] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [isFullMonthReportOpen, setIsFullMonthReportOpen] = useState(false);
  const [isMarkedSuccessOpen, setIsMarkedSuccessOpen] = useState(false);
  const [isContractorAddedOpen, setIsContractorAddedOpen] = useState(false);
  const [reportStatus, setReportStatus] = useState("");
  const [reportStatusOpen, setReportStatusOpen] = useState(false);
  const [checkInHour, setCheckInHour] = useState("9");
  const [checkInMinute, setCheckInMinute] = useState("25");
  const [checkInMeridiem, setCheckInMeridiem] = useState<"AM" | "PM">("AM");
  const [checkOutHour, setCheckOutHour] = useState("5");
  const [checkOutMinute, setCheckOutMinute] = useState("30");
  const [checkOutMeridiem, setCheckOutMeridiem] = useState<"AM" | "PM">("PM");
  const [isCheckInPickerOpen, setIsCheckInPickerOpen] = useState(false);
  const [isCheckOutPickerOpen, setIsCheckOutPickerOpen] = useState(false);
  const [openAttendanceActionId, setOpenAttendanceActionId] = useState<string | null>(null);
  const [openContractorActionId, setOpenContractorActionId] = useState<string | null>(null);
  const [openPayrollActionId, setOpenPayrollActionId] = useState<string | null>(null);
  const [contractorTypeOpen, setContractorTypeOpen] = useState(false);
  const [contractorType, setContractorType] = useState("Main Contractor");
  const [joiningDate, setJoiningDate] = useState("");
  const [joiningCalendarOpen, setJoiningCalendarOpen] = useState(false);
  const [joiningCalendarMonth, setJoiningCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const employeesHydrated = useRef(false);
  const [newEmployeeName, setNewEmployeeName] = useState("");
  const [newEmployeeEmail, setNewEmployeeEmail] = useState("");
  const [newEmployeePhone, setNewEmployeePhone] = useState("");
  const [newEmployeeRole, setNewEmployeeRole] = useState("");
  const [newEmployeeSalary, setNewEmployeeSalary] = useState("");
  const departmentRootRef = useRef<HTMLDivElement>(null);
  const joiningDateRootRef = useRef<HTMLDivElement>(null);
  const datePickerRootRef = useRef<HTMLDivElement>(null);
  const statusRootRef = useRef<HTMLDivElement>(null);
  const contractorTypeRootRef = useRef<HTMLDivElement>(null);

  const formattedSelectedDate = selectedDate
    ? (() => {
        const [year, month, day] = selectedDate.split("-");
        return `${day}/${month}/${year}`;
      })()
    : "Select Date";
  const monthLabel = calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const monthStartDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
  const monthDaysCount = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const calendarCells = [
    ...Array.from({ length: monthStartDay }, () => null),
    ...Array.from({ length: monthDaysCount }, (_, i) => i + 1),
  ];

  const formattedJoiningDate = joiningDate
    ? (() => {
        const [year, month, day] = joiningDate.split("-");
        return `${day}/${month}/${year}`;
      })()
    : "";
  const joiningMonthLabel = joiningCalendarMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const joiningMonthStartDay = new Date(
    joiningCalendarMonth.getFullYear(),
    joiningCalendarMonth.getMonth(),
    1,
  ).getDay();
  const joiningMonthDaysCount = new Date(
    joiningCalendarMonth.getFullYear(),
    joiningCalendarMonth.getMonth() + 1,
    0,
  ).getDate();
  const joiningCalendarCells = [
    ...Array.from({ length: joiningMonthStartDay }, () => null),
    ...Array.from({ length: joiningMonthDaysCount }, (_, i) => i + 1),
  ];

  const resetAddEmployeeForm = useCallback(() => {
    setNewEmployeeName("");
    setNewEmployeeEmail("");
    setNewEmployeePhone("");
    setNewEmployeeRole("");
    setNewEmployeeSalary("");
    setDepartment(null);
    setDepartmentOpen(false);
    setJoiningDate("");
    setJoiningCalendarOpen(false);
  }, []);

  const handleSaveEmployee = useCallback(() => {
    const name = newEmployeeName.trim();
    const email = newEmployeeEmail.trim();
    const phone = newEmployeePhone.trim();
    const role = newEmployeeRole.trim();
    const salaryRaw = newEmployeeSalary.trim();
    if (!name || !email || !phone || !role || !department || !salaryRaw || !joiningDate) {
      window.alert("Please fill in all required fields.");
      return;
    }
    const salaryNum = Number.parseFloat(salaryRaw.replace(/,/g, ""));
    const salaryDisplay = Number.isFinite(salaryNum)
      ? `PKR ${Math.round(salaryNum).toLocaleString("en-PK")}`
      : `PKR ${salaryRaw}`;
    const avatarPool = ["/images/employee-1.svg", "/images/employee-2.svg", "/images/employee-3.svg"] as const;
    setEmployees((prev) => {
      const avatarSrc = avatarPool[prev.length % avatarPool.length]!;
      const newEmp: Employee = {
        id: `emp-${Date.now()}`,
        name,
        role,
        department,
        email,
        phone,
        salary: salaryDisplay,
        joined: joiningDate,
        avatarSrc,
      };
      return [...prev, newEmp];
    });
    resetAddEmployeeForm();
    setIsAddEmployeeOpen(false);
  }, [
    newEmployeeName,
    newEmployeeEmail,
    newEmployeePhone,
    newEmployeeRole,
    newEmployeeSalary,
    department,
    joiningDate,
    resetAddEmployeeForm,
  ]);

  useEffect(() => {
    if (!employeesHydrated.current) {
      employeesHydrated.current = true;
      try {
        const raw = localStorage.getItem(HR_EMPLOYEES_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as unknown;
          if (Array.isArray(parsed) && parsed.length > 0) setEmployees(parsed as Employee[]);
        }
      } catch {
        /* keep INITIAL_EMPLOYEES */
      }
      return;
    }
    try {
      localStorage.setItem(HR_EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
    } catch {
      /* ignore */
    }
  }, [employees]);

  useEffect(() => {
    if (isAddEmployeeOpen) return;
    setJoiningDate("");
    setJoiningCalendarOpen(false);
  }, [isAddEmployeeOpen]);

  useEffect(() => {
    if (!isAddEmployeeOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isAddEmployeeOpen]);

  useEffect(() => {
    if (!isAddContractorOpen && !isContractorAddedOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isAddContractorOpen, isContractorAddedOpen]);

  useEffect(() => {
    if (!isAddEmployeeOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (joiningCalendarOpen) {
        setJoiningCalendarOpen(false);
        return;
      }
      if (departmentOpen) {
        setDepartmentOpen(false);
        return;
      }
      resetAddEmployeeForm();
      setIsAddEmployeeOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isAddEmployeeOpen, departmentOpen, joiningCalendarOpen, resetAddEmployeeForm]);

  useEffect(() => {
    if (!isAddEmployeeOpen || !joiningCalendarOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (joiningDateRootRef.current?.contains(target)) return;
      setJoiningCalendarOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [isAddEmployeeOpen, joiningCalendarOpen]);

  useEffect(() => {
    if (!isAddContractorOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (contractorTypeOpen) {
        setContractorTypeOpen(false);
        return;
      }
      setIsAddContractorOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isAddContractorOpen, contractorTypeOpen]);

  useEffect(() => {
    if (!isAddEmployeeOpen || !departmentOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (departmentRootRef.current?.contains(target)) return;
      setDepartmentOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [isAddEmployeeOpen, departmentOpen]);

  useEffect(() => {
    if (!isAddContractorOpen || !contractorTypeOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (contractorTypeRootRef.current?.contains(target)) return;
      setContractorTypeOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [isAddContractorOpen, contractorTypeOpen]);

  useEffect(() => {
    if (!isCalendarOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (datePickerRootRef.current?.contains(target)) return;
      setIsCalendarOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [isCalendarOpen]);

  useEffect(() => {
    if (!isFullMonthReportOpen && !isMarkedSuccessOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isFullMonthReportOpen, isMarkedSuccessOpen]);

  useEffect(() => {
    if (!isFullMonthReportOpen || !reportStatusOpen) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (statusRootRef.current?.contains(target)) return;
      setReportStatusOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [isFullMonthReportOpen, reportStatusOpen]);

  useEffect(() => {
    if (!openAttendanceActionId) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest('[data-attendance-action-root="true"]')) return;
      setOpenAttendanceActionId(null);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [openAttendanceActionId]);

  useEffect(() => {
    if (!openContractorActionId) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest('[data-contractor-action-root="true"]')) return;
      setOpenContractorActionId(null);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [openContractorActionId]);

  useEffect(() => {
    if (!openPayrollActionId) return;
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest('[data-payroll-action-root="true"]')) return;
      setOpenPayrollActionId(null);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close, { passive: true });
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [openPayrollActionId]);

  useEffect(() => {
    if (!isFullMonthReportOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (reportStatusOpen) {
        setReportStatusOpen(false);
        return;
      }
      if (isCheckInPickerOpen) {
        setIsCheckInPickerOpen(false);
        return;
      }
      if (isCheckOutPickerOpen) {
        setIsCheckOutPickerOpen(false);
        return;
      }
      setIsFullMonthReportOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFullMonthReportOpen, reportStatusOpen, isCheckInPickerOpen, isCheckOutPickerOpen]);

  return (
    <div className="h-full overflow-y-auto bg-[#F3F4F6] p-5 sm:p-6 md:p-7">
      <div className="bg-transparent">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-[22px] font-semibold leading-tight text-[#111827] sm:text-[24px]">HRM</h1>
            <p className="text-[13px] text-[#64748B]">
              Manage employees, contractors, attendance, and payroll
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              resetAddEmployeeForm();
              setIsAddEmployeeOpen(true);
            }}
            className="inline-flex h-[52px] items-center justify-center gap-2 self-start rounded-[10px] bg-[#1D75F8] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#1569E8]"
          >
            <span className="text-[24px] leading-none">+</span>
            Add Employee
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {HR_SUMMARY.map((item) => (
            <div
              key={item.label}
              className="flex min-h-[95px] items-center justify-between rounded-[10px] bg-[#E5E7EB] px-4 py-3"
            >
              <div className="relative pl-3">
                <span className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-[#1D75F8]" />
                <p className="text-[13px] text-[#64748B]">{item.label}</p>
                <p className="mt-0.5 text-[22px] font-medium leading-none text-[#111827]">
                  {item.label === "Total Employees" ? employees.length : item.value}
                </p>
              </div>
              <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-[4px] bg-[#1D75F8] text-white">
                <SummaryIcon kind={item.icon} />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 inline-flex overflow-hidden rounded-[10px] border border-[#CBD5E1]">
          {HR_TABS.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
                className={`h-[40px] px-4 text-[14px] font-medium ${
                activeTab === tab
                  ? "bg-[#F8FAFC] text-[#1E293B]"
                  : "bg-white text-[#475569] hover:bg-[#F8FAFC]"
              } ${index !== HR_TABS.length - 1 ? "border-r border-[#CBD5E1]" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "Attendance" ? (
          <section className="mt-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="whitespace-nowrap text-[16px] font-semibold leading-tight text-[#1F2937] sm:text-[18px]">
                Today&apos;s Attendance - 20/02/2026
              </h2>
              <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
                <div className="relative" ref={datePickerRootRef}>
                  <button
                    type="button"
                    className="inline-flex h-[44px] items-center gap-2.5 rounded-[10px] border border-[#D1D5DB] bg-white px-4 text-[14px] text-[#6B7280] sm:min-w-[308px]"
                    onClick={() => setIsCalendarOpen((open) => !open)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-[#6B7280]">
                      <rect x="3.75" y="4.75" width="16.5" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M7.5 3v3.5M16.5 3v3.5M3.75 9.25h16.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                    <span>{formattedSelectedDate}</span>
                  </button>
                  {isCalendarOpen ? (
                    <div className="absolute left-0 top-full z-20 mt-2 w-[308px] rounded-[12px] border border-[#D1D5DB] bg-white p-3 shadow-[0_10px_25px_rgba(15,23,42,0.14)]">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <p className="text-[20px] font-semibold leading-none text-[#111827]">{monthLabel}</p>
                          <button
                            type="button"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[28px] leading-none text-[#1D75F8] hover:bg-[#EFF6FF]"
                            onClick={() =>
                              setCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
                            }
                            aria-label="Next month"
                          >
                            &gt;
                          </button>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[28px] leading-none text-[#1D75F8] hover:bg-[#EFF6FF]"
                            onClick={() =>
                              setCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
                            }
                            aria-label="Previous month"
                          >
                            &lt;
                          </button>
                          <button
                            type="button"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[28px] leading-none text-[#1D75F8] hover:bg-[#EFF6FF]"
                            onClick={() =>
                              setCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
                            }
                            aria-label="Next month"
                          >
                            &gt;
                          </button>
                        </div>
                      </div>
                      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[11px] text-[#94A3B8]">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                          <span key={day}>{day}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {calendarCells.map((day, idx) => {
                          if (!day) return <span key={`empty-${idx}`} className="h-8" />;
                          const month = `${calendarMonth.getMonth() + 1}`.padStart(2, "0");
                          const dayText = `${day}`.padStart(2, "0");
                          const value = `${calendarMonth.getFullYear()}-${month}-${dayText}`;
                          const isSelected = selectedDate === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => {
                                setSelectedDate(value);
                                setIsCalendarOpen(false);
                              }}
                              className={`h-8 rounded-md text-[12px] ${
                                isSelected
                                  ? "bg-[#1D75F8] text-white"
                                  : "text-[#334155] hover:bg-[#EFF6FF]"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="inline-flex h-[44px] items-center justify-center rounded-[10px] bg-[#1D75F8] px-6 text-[14px] font-medium text-white sm:min-w-[126px]"
                  onClick={() => setIsFullMonthReportOpen(true)}
                >
                  Full Month Report
                </button>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto bg-transparent">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-left text-[14px] font-medium text-[#6B7280]">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-4 py-4">Date</th>
                    <th className="px-4 py-4">Check In</th>
                    <th className="px-4 py-4">Check Out</th>
                    <th className="px-4 py-4">Total Working Hours</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ATTENDANCE_ROWS.map((row) => (
                    <tr key={row.id} className="border-b border-[#E5E7EB] last:border-b-0">
                      <td className="px-6 py-7 text-[16px] font-semibold text-[#111827]">{row.name}</td>
                      <td className="px-4 py-7 text-[12px] text-[#6B7280]">{row.date}</td>
                      <td className="px-4 py-7 text-[16px] text-[#6B7280]">{row.checkIn}</td>
                      <td className="px-4 py-7 text-[16px] text-[#6B7280]">{row.checkOut}</td>
                      <td className="px-4 py-7 text-[16px] text-[#6B7280]">{row.hours}</td>
                      <td className="px-4 py-7">
                        <span
                          className={`inline-flex min-w-[108px] items-center justify-center rounded-full px-4 py-[6px] text-[16px] font-medium leading-none ${
                            row.status === "Present"
                              ? "bg-[#166534] text-white"
                              : "bg-[#991B1B] text-white"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="relative px-4 py-7 text-right">
                        <div data-attendance-action-root="true" className="relative inline-flex">
                          <button
                            type="button"
                            className="text-[#6B7280]"
                            aria-label="Open row actions"
                            onClick={() =>
                              setOpenAttendanceActionId((prev) => (prev === row.id ? null : row.id))
                            }
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <circle cx="12" cy="5.5" r="1.5" fill="currentColor" />
                              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                              <circle cx="12" cy="18.5" r="1.5" fill="currentColor" />
                            </svg>
                          </button>

                          {openAttendanceActionId === row.id ? (
                            <div className="absolute right-6 top-[24px] z-10 w-[184px] overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
                              <Link
                                href="/human-resources/attendance/mark-attendance"
                                onClick={() => setOpenAttendanceActionId(null)}
                                className="flex w-full items-center gap-2 px-4 py-3 text-left text-[14px] text-[#4B5563] hover:bg-[#F9FAFB]"
                              >
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                                  <path d="M3.5 10.1 7.2 13.8 16.4 4.6" stroke="#69C7AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Mark Attendance
                              </Link>
                              <Link
                                href="/human-resources/attendance/mark-attendance"
                                onClick={() => setOpenAttendanceActionId(null)}
                                className="flex w-full items-center gap-2 border-t border-[#EEF2F7] px-4 py-3 text-left text-[14px] text-[#4B5563] hover:bg-[#F9FAFB]"
                              >
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                                  <path d="M4 14.2v1.8h1.8l7.7-7.8-1.8-1.8L4 14.2Zm10.6-6.6 1-1a1.3 1.3 0 0 0 0-1.8l-.4-.4a1.3 1.3 0 0 0-1.8 0l-1 1 2.2 2.2Z" fill="#1D75F8" />
                                </svg>
                                Edit
                              </Link>
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : activeTab === "Contractors" ? (
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-[#1F2937]">Active Contractors</h2>
              <button
                type="button"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-[10px] bg-[#1D75F8] px-5 text-[14px] font-medium text-white"
                onClick={() => {
                  setContractorType("Main Contractor");
                  setContractorTypeOpen(false);
                  setIsAddContractorOpen(true);
                }}
              >
                <span className="text-[20px] leading-none">+</span>
                Add Contractor
              </button>
            </div>

            <div className="overflow-x-auto bg-transparent">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-left text-[14px] font-medium text-[#6B7280]">
                    <th className="px-6 py-4">Contractor Name</th>
                    <th className="px-4 py-4">Project</th>
                    <th className="px-4 py-4">Type</th>
                    <th className="px-4 py-4">Contact</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTRACTOR_ROWS.map((row) => (
                    <tr key={row.id} className="border-b border-[#E5E7EB] last:border-b-0">
                      <td className="px-6 py-7 text-[16px] font-semibold text-[#111827]">{row.name}</td>
                      <td className="px-4 py-7 text-[12px] text-[#6B7280]">{row.project}</td>
                      <td className="px-4 py-7 text-[16px] text-[#6B7280]">{row.type}</td>
                      <td className="px-4 py-7 text-[16px] text-[#6B7280]">{row.contact}</td>
                      <td className="px-4 py-7">
                        <span
                          className={`inline-flex min-w-[116px] items-center justify-center rounded-full px-4 py-[6px] text-[16px] font-medium leading-none ${
                            row.status === "Active"
                              ? "bg-[#166534] text-white"
                              : "bg-[#E5E7EB] text-[#374151]"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="relative px-4 py-7 text-right">
                        <div data-contractor-action-root="true" className="relative inline-flex">
                          <button
                            type="button"
                            className="text-[#6B7280]"
                            aria-label="Open contractor row actions"
                            onClick={() =>
                              setOpenContractorActionId((prev) => (prev === row.id ? null : row.id))
                            }
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <circle cx="12" cy="5.5" r="1.5" fill="currentColor" />
                              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                              <circle cx="12" cy="18.5" r="1.5" fill="currentColor" />
                            </svg>
                          </button>
                          {openContractorActionId === row.id ? (
                            <div className="absolute right-6 top-[24px] z-10 w-[160px] overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
                              <button type="button" className="flex w-full items-center gap-2 px-4 py-3 text-left text-[14px] text-[#4B5563] hover:bg-[#F9FAFB]">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                                  <path d="M4 14.2v1.8h1.8l7.7-7.8-1.8-1.8L4 14.2Zm10.6-6.6 1-1a1.3 1.3 0 0 0 0-1.8l-.4-.4a1.3 1.3 0 0 0-1.8 0l-1 1 2.2 2.2Z" fill="#1D75F8" />
                                </svg>
                                Edit
                              </button>
                              <button type="button" className="flex w-full items-center gap-2 border-t border-[#EEF2F7] px-4 py-3 text-left text-[14px] text-[#4B5563] hover:bg-[#F9FAFB]">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                                  <path d="M6 6h8M7 6V4.8A.8.8 0 0 1 7.8 4h4.4a.8.8 0 0 1 .8.8V6m-6 0v8.2c0 .44.36.8.8.8h4.4a.8.8 0 0 0 .8-.8V6" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : activeTab === "Payroll" ? (
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[22px] font-semibold text-[#1F2937]">Payroll - February 2026</h2>
              <button
                type="button"
                className="inline-flex h-[44px] items-center justify-center rounded-[10px] bg-[#1D75F8] px-5 text-[14px] font-medium text-white"
              >
                Process Payroll
              </button>
            </div>

            <div className="overflow-x-auto bg-transparent">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-left text-[14px] font-medium text-[#6B7280]">
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-4 py-4">Role</th>
                    <th className="px-4 py-4">Basic Salary</th>
                    <th className="px-4 py-4">Allowances</th>
                    <th className="px-4 py-4">Deductions</th>
                    <th className="px-4 py-4">Net Salary</th>
                    <th className="px-4 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYROLL_ROWS.map((row) => (
                    <tr key={row.id} className="border-b border-[#E5E7EB] last:border-b-0">
                      <td className="px-6 py-7 text-[16px] font-semibold text-[#111827]">{row.employee}</td>
                      <td className="px-4 py-7 text-[12px] text-[#6B7280]">{row.role}</td>
                      <td className="px-4 py-7 text-[16px] text-[#6B7280]">{row.basicSalary}</td>
                      <td className="px-4 py-7 text-[16px] text-[#6B7280]">{row.allowances}</td>
                      <td className="px-4 py-7 text-[16px] text-[#6B7280]">{row.deductions}</td>
                      <td className="px-4 py-7 text-[16px] text-[#6B7280]">{row.netSalary}</td>
                      <td className="relative px-4 py-7 text-right">
                        <div data-payroll-action-root="true" className="relative inline-flex">
                          <button
                            type="button"
                            className="text-[#6B7280]"
                            aria-label="Open payroll row actions"
                            onClick={() => setOpenPayrollActionId((prev) => (prev === row.id ? null : row.id))}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <circle cx="12" cy="5.5" r="1.5" fill="currentColor" />
                              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                              <circle cx="12" cy="18.5" r="1.5" fill="currentColor" />
                            </svg>
                          </button>
                          {openPayrollActionId === row.id ? (
                            <div className="absolute right-6 top-[24px] z-10 w-[126px] overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
                              <button type="button" className="flex w-full items-center gap-2 px-4 py-3 text-left text-[14px] text-[#4B5563] hover:bg-[#F9FAFB]">
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                                  <path d="M4 14.2v1.8h1.8l7.7-7.8-1.8-1.8L4 14.2Zm10.6-6.6 1-1a1.3 1.3 0 0 0 0-1.8l-.4-.4a1.3 1.3 0 0 0-1.8 0l-1 1 2.2 2.2Z" fill="#1D75F8" />
                                </svg>
                                Edit
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-6 py-7 text-[16px] font-semibold text-[#111827]">Total Payroll</td>
                    <td className="px-4 py-7" />
                    <td className="px-4 py-7" />
                    <td className="px-4 py-7" />
                    <td className="px-4 py-7" />
                    <td className="px-4 py-7 text-[16px] text-[#6B7280]">PKR 370,500</td>
                    <td className="px-4 py-7" />
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <>
            <h2 className="mt-8 text-[22px] font-semibold text-[#1F2937]">Employee Directory</h2>

            <div className="mt-5 space-y-3">
              {employees.map((employee) => (
                <article
                  key={employee.id}
                  className="flex flex-col gap-3 rounded-[10px] border border-[#BDBDBD] bg-[#F9FAFB] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] bg-[#DDE6F3]">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-[#2563EB]/20">
                        <Image src={employee.avatarSrc} alt={`${employee.name} profile`} fill className="object-cover" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[18px] font-semibold text-[#1F2937]">{employee.name}</p>
                      <p className="truncate text-[14px] text-[#475569]">
                        {employee.role} • {employee.department}
                      </p>
                      <p className="truncate text-[12px] text-[#64748B]">
                        {employee.email} • {employee.phone}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-[14px] font-semibold text-[#1D75F8]">Salary: {employee.salary}</p>
                    <p className="text-[13px] text-[#64748B]">Joined: {employee.joined}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      {isAddEmployeeOpen ? (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/35 p-2 sm:items-center sm:p-4"
          onClick={() => {
            resetAddEmployeeForm();
            setIsAddEmployeeOpen(false);
          }}
          role="presentation"
        >
          <div
            className="w-full max-w-[600px] min-h-[min(90dvh,620px)] rounded-[22px] bg-white px-5 py-7 shadow-2xl sm:min-h-[680px] sm:px-10 sm:py-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-employee-title"
          >
            <div className="space-y-1.5">
              <h3 id="add-employee-title" className="text-[20px] font-semibold leading-tight text-[#1F2937] sm:text-[22px]">
                Add Employee
              </h3>
              <p className="text-[12px] text-[#64748B] sm:text-[13px]">Add a new employee</p>
            </div>

            <div className="mt-5 space-y-3.5 sm:space-y-4">
              <div className="space-y-2">
                <label className="text-[16px] font-medium leading-none text-[#111827] sm:text-[18px]">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g., Ahmed Khan"
                  value={newEmployeeName}
                  onChange={(e) => setNewEmployeeName(e.target.value)}
                  autoComplete="name"
                  className="h-[72px] w-full rounded-[12px] border border-[#E5E7EB] px-5 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:text-[17px]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium leading-none text-[#111827] sm:text-[18px]">
                    Email <span aria-hidden>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ahmed@gmail.com"
                    value={newEmployeeEmail}
                    onChange={(e) => setNewEmployeeEmail(e.target.value)}
                    autoComplete="email"
                    className="h-[72px] w-full rounded-[12px] border border-[#E5E7EB] px-5 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:text-[17px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[16px] font-medium leading-none text-[#111827] sm:text-[18px]">
                    Phone Number <span aria-hidden>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g, +92 3223234393"
                    value={newEmployeePhone}
                    onChange={(e) => setNewEmployeePhone(e.target.value)}
                    autoComplete="tel"
                    className="h-[72px] w-full rounded-[12px] border border-[#E5E7EB] px-5 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:text-[17px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium leading-none text-[#111827] sm:text-[18px]">
                    Role <span aria-hidden>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Engineer"
                    value={newEmployeeRole}
                    onChange={(e) => setNewEmployeeRole(e.target.value)}
                    autoComplete="organization-title"
                    className="h-[72px] w-full rounded-[12px] border border-[#E5E7EB] px-5 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:text-[17px]"
                  />
                </div>

                <div className="space-y-2" ref={departmentRootRef}>
                  <label className="text-[16px] font-medium leading-none text-[#111827] sm:text-[18px]">
                    Select Project <span aria-hidden>*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      aria-haspopup="listbox"
                      aria-expanded={departmentOpen}
                      aria-controls="employee-project-listbox"
                      onClick={() => {
                        setJoiningCalendarOpen(false);
                        setDepartmentOpen((o) => !o);
                      }}
                      className={`flex h-[72px] w-full items-center justify-between gap-3 rounded-[12px] border bg-white px-5 text-left text-[16px] outline-none transition-[border-color,box-shadow] sm:text-[17px] ${
                        departmentOpen
                          ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                          : "border-[#E5E7EB]"
                      }`}
                    >
                      <span className={department ? "text-[#111827]" : "text-[#A3A3A3]"}>
                        {department ?? "Select Project"}
                      </span>
                      <span className="shrink-0 text-[#1D75F8]">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>

                    {departmentOpen ? (
                      <ul
                        id="employee-project-listbox"
                        role="listbox"
                        className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                      >
                        {PROJECT_OPTIONS.map((option) => (
                          <li key={option} role="presentation" className="border-b border-[#F0F2F5] last:border-b-0">
                            <button
                              type="button"
                              role="option"
                              aria-selected={department === option}
                              onClick={() => {
                                setDepartment(option);
                                setDepartmentOpen(false);
                              }}
                              className={`w-full px-6 py-4 text-left text-[16px] transition-colors ${
                                department === option
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
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium leading-none text-[#111827] sm:text-[18px]">
                    Salary <span aria-hidden>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5500000"
                    inputMode="decimal"
                    value={newEmployeeSalary}
                    onChange={(e) => setNewEmployeeSalary(e.target.value)}
                    className="h-[72px] w-full rounded-[12px] border border-[#E5E7EB] px-5 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3] sm:text-[17px]"
                  />
                </div>
                <div className="space-y-2" ref={joiningDateRootRef}>
                  <label className="text-[16px] font-medium leading-none text-[#111827] sm:text-[18px]">
                    Joining Date <span aria-hidden>*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setDepartmentOpen(false);
                        setJoiningCalendarOpen((o) => !o);
                      }}
                      className="flex h-[72px] w-full items-center gap-2.5 rounded-[12px] border border-[#E5E7EB] bg-white px-5 text-left text-[16px] outline-none transition-[border-color,box-shadow] sm:text-[17px]"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        className="shrink-0 text-[#6B7280]"
                      >
                        <rect x="3.75" y="4.75" width="16.5" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                        <path d="M7.5 3v3.5M16.5 3v3.5M3.75 9.25h16.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                      <span className={formattedJoiningDate ? "text-[#111827]" : "text-[#A3A3A3]"}>
                        {formattedJoiningDate || "dd/mm/yyyy"}
                      </span>
                    </button>
                    {joiningCalendarOpen ? (
                      <div className="absolute left-0 top-full z-20 mt-2 w-[min(100%,308px)] rounded-[12px] border border-[#D1D5DB] bg-white p-3 shadow-[0_10px_25px_rgba(15,23,42,0.14)]">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <p className="text-[20px] font-semibold leading-none text-[#111827]">{joiningMonthLabel}</p>
                            <button
                              type="button"
                              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[28px] leading-none text-[#1D75F8] hover:bg-[#EFF6FF]"
                              onClick={() =>
                                setJoiningCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
                              }
                              aria-label="Next month"
                            >
                              &gt;
                            </button>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[28px] leading-none text-[#1D75F8] hover:bg-[#EFF6FF]"
                              onClick={() =>
                                setJoiningCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
                              }
                              aria-label="Previous month"
                            >
                              &lt;
                            </button>
                            <button
                              type="button"
                              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[28px] leading-none text-[#1D75F8] hover:bg-[#EFF6FF]"
                              onClick={() =>
                                setJoiningCalendarMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
                              }
                              aria-label="Next month"
                            >
                              &gt;
                            </button>
                          </div>
                        </div>
                        <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[11px] text-[#94A3B8]">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                            <span key={day}>{day}</span>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {joiningCalendarCells.map((day, idx) => {
                            if (!day) return <span key={`join-empty-${idx}`} className="h-8" />;
                            const month = `${joiningCalendarMonth.getMonth() + 1}`.padStart(2, "0");
                            const dayText = `${day}`.padStart(2, "0");
                            const value = `${joiningCalendarMonth.getFullYear()}-${month}-${dayText}`;
                            const isSelected = joiningDate === value;
                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() => {
                                  setJoiningDate(value);
                                  setJoiningCalendarOpen(false);
                                }}
                                className={`h-8 rounded-md text-[12px] ${
                                  isSelected
                                    ? "bg-[#1D75F8] text-white"
                                    : "text-[#334155] hover:bg-[#EFF6FF]"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2.5 sm:mt-6">
              <button
                type="button"
                onClick={() => {
                  resetAddEmployeeForm();
                  setIsAddEmployeeOpen(false);
                }}
                className="h-[52px] rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC] px-7 text-[15px] font-medium text-[#111827]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEmployee}
                className="h-[52px] rounded-[12px] bg-[#1D75F8] px-9 text-[15px] font-medium text-white transition-colors hover:bg-[#1569E8]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isAddContractorOpen ? (
        <div
          className="fixed inset-0 z-[72] flex items-center justify-center bg-black/35 p-3"
          onClick={() => setIsAddContractorOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[700px] rounded-[22px] bg-white px-6 pb-6 pt-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-contractor-title"
          >
            <div className="space-y-1">
              <h3 id="add-contractor-title" className="text-[20px] font-semibold leading-tight text-[#111827]">
                Add Contractor
              </h3>
              <p className="text-[13px] text-[#64748B]">Add a new Contractor</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[16px] font-medium leading-none text-[#111827]">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ahmed Khan"
                  className="h-[56px] w-full rounded-[12px] border border-[#E5E7EB] px-4 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium leading-none text-[#111827]">
                    Email <span aria-hidden>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ahmed@gmail.com"
                    className="h-[56px] w-full rounded-[12px] border border-[#E5E7EB] px-4 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[16px] font-medium leading-none text-[#111827]">
                    Phone Number <span aria-hidden>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g, +92 3223234393"
                    className="h-[56px] w-full rounded-[12px] border border-[#E5E7EB] px-4 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[16px] font-medium leading-none text-[#111827]">
                    Project <span aria-hidden>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Assigned Project"
                    className="h-[56px] w-full rounded-[12px] border border-[#E5E7EB] px-4 text-[16px] text-[#111827] outline-none placeholder:text-[#A3A3A3]"
                  />
                </div>
                <div className="space-y-2" ref={contractorTypeRootRef}>
                  <label className="text-[16px] font-medium leading-none text-[#111827]">
                    Type <span aria-hidden>*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setContractorTypeOpen((o) => !o)}
                      aria-haspopup="listbox"
                      aria-expanded={contractorTypeOpen}
                      aria-controls="contractor-type-listbox"
                      className={`flex h-[56px] w-full items-center justify-between rounded-[12px] border bg-white px-4 text-left text-[16px] outline-none transition-[border-color,box-shadow] ${
                        contractorTypeOpen
                          ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                          : "border-[#E5E7EB]"
                      }`}
                    >
                      <span className="text-[#111827]">{contractorType}</span>
                      <span className="text-[#1D75F8]">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                    {contractorTypeOpen ? (
                      <ul
                        id="contractor-type-listbox"
                        role="listbox"
                        className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                      >
                        {["Main Contractor", "Sub-Contractor"].map((option) => (
                          <li key={option} role="presentation" className="border-b border-[#F0F2F5] last:border-b-0">
                            <button
                              type="button"
                              role="option"
                              aria-selected={contractorType === option}
                              onClick={() => {
                                setContractorType(option);
                                setContractorTypeOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-left text-[15px] transition-colors ${
                                contractorType === option
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
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsAddContractorOpen(false)}
                className="h-[46px] rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-6 text-[15px] font-medium text-[#111827]"
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-[46px] rounded-[10px] bg-[#1D75F8] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#1569E8]"
                onClick={() => {
                  setIsAddContractorOpen(false);
                  setIsContractorAddedOpen(true);
                }}
              >
                Add Contractor
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isContractorAddedOpen ? (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/30 p-4"
          onClick={() => setIsContractorAddedOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[500px] rounded-[24px] bg-white px-7 pb-6 pt-7 shadow-[0_20px_50px_rgba(15,23,42,0.18)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contractor-added-title"
          >
            <div className="mx-auto flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#FAF8F6]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#0077FF]">
                <path
                  d="M5.2 12.4 10 17.2 18.8 7.8"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 id="contractor-added-title" className="mt-4 text-center text-[20px] font-semibold leading-tight text-[#111827]">
              Contractor Added
            </h3>

            <button
              type="button"
              onClick={() => setIsContractorAddedOpen(false)}
              className="mt-5 inline-flex h-[48px] w-full items-center justify-center rounded-[14px] bg-[#0077FF] text-[16px] font-medium text-white transition-colors hover:bg-[#0069E0]"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}

      {isFullMonthReportOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/30 p-4"
          onClick={() => setIsFullMonthReportOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[620px] rounded-[20px] bg-white px-6 pb-6 pt-5 shadow-[0_20px_50px_rgba(15,23,42,0.2)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="full-month-report-title"
          >
            <h3 id="full-month-report-title" className="text-[18px] font-semibold leading-tight text-[#1F2937] sm:text-[20px]">
              Ahmed Khan
            </h3>
            <p className="mt-1 text-[12px] text-[#64748B] sm:text-[13px]">Mark Attendance</p>

            <div className="mt-5 space-y-3.5">
              <div className="space-y-2.5" ref={statusRootRef}>
                <label className="text-[16px] font-medium text-[#111827] sm:text-[18px]">
                  Status <span aria-hidden>*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setReportStatusOpen((o) => !o)}
                    className={`flex h-[50px] w-full items-center justify-between rounded-[10px] border bg-white px-4 text-left text-[15px] transition-[border-color,box-shadow] sm:text-[16px] ${
                      reportStatusOpen
                        ? "border-[#1D75F8] shadow-[0_0_0_3px_rgba(29,117,248,0.15)]"
                        : "border-[#E5E7EB]"
                    }`}
                    aria-haspopup="listbox"
                    aria-expanded={reportStatusOpen}
                    aria-controls="attendance-status-listbox"
                  >
                    <span className={reportStatus ? "text-[#111827]" : "text-[#A3A3A3]"}>
                      {reportStatus || "Select Status"}
                    </span>
                    <span className="text-[#1D75F8]">
                      <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden>
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  {reportStatusOpen ? (
                    <ul
                      id="attendance-status-listbox"
                      role="listbox"
                      className="absolute left-0 right-0 top-full z-10 mt-1 overflow-hidden rounded-[10px] border border-[#D1D5DB] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                    >
                      {["Present", "Absent", "Leave"].map((status) => (
                        <li key={status} role="presentation" className="border-b border-[#F0F2F5] last:border-b-0">
                          <button
                            type="button"
                            role="option"
                            aria-selected={reportStatus === status}
                            onClick={() => {
                              setReportStatus(status);
                              setReportStatusOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-[15px] transition-colors ${
                              reportStatus === status
                                ? "bg-[#1D75F8] text-white"
                                : "bg-white text-[#4B5563] hover:bg-[#1D75F8] hover:text-white"
                            }`}
                          >
                            {status}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
                <div className="space-y-2.5">
                  <label className="text-[16px] font-medium text-[#111827] sm:text-[18px]">
                    Check In <span aria-hidden>*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckInPickerOpen((o) => !o);
                        setIsCheckOutPickerOpen(false);
                      }}
                      className="flex h-[50px] w-full items-center justify-between rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[15px] text-[#A3A3A3] sm:text-[16px]"
                    >
                      {`${checkInHour.padStart(2, "0")}:${checkInMinute} ${checkInMeridiem}`}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#9CA3AF]">
                        <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 7.5V12l3.2 1.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>

                    {isCheckInPickerOpen ? (
                      <div className="absolute left-2 top-full z-20 mt-2 flex overflow-hidden rounded-[10px] bg-[#F3F4F6] shadow-[0_8px_20px_rgba(15,23,42,0.15)]">
                        <div className="max-h-[210px] overflow-y-auto px-4 py-2">
                          {[...Array.from({ length: 10 }, (_, i) => (i + 1).toString())].map((hour) => (
                            <button
                              key={hour}
                              type="button"
                              onClick={() => setCheckInHour(hour)}
                              className={`my-1 block w-[34px] rounded-[7px] py-1 text-[14px] ${
                                checkInHour === hour ? "bg-[#1D75F8] text-white" : "text-[#111827]"
                              }`}
                            >
                              {hour}
                            </button>
                          ))}
                        </div>
                        <div className="max-h-[210px] overflow-y-auto px-4 py-2">
                          {["19", "20", "21", "22", "23", "24", "25", "26", "27", "28"].map((minute) => (
                            <button
                              key={minute}
                              type="button"
                              onClick={() => setCheckInMinute(minute)}
                              className={`my-1 block w-[34px] rounded-[7px] py-1 text-[14px] ${
                                checkInMinute === minute ? "bg-[#1D75F8] text-white" : "text-[#111827]"
                              }`}
                            >
                              {minute}
                            </button>
                          ))}
                        </div>
                        <div className="m-2 rounded-[18px] bg-[#EBEEF2] p-1">
                          {(["AM", "PM"] as const).map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setCheckInMeridiem(slot)}
                              className={`block w-[48px] rounded-[14px] py-2 text-[14px] ${
                                checkInMeridiem === slot ? "bg-[#1D75F8] text-white" : "text-[#111827]"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-[16px] font-medium text-[#111827] sm:text-[18px]">
                    Check Out <span aria-hidden>*</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckOutPickerOpen((o) => !o);
                        setIsCheckInPickerOpen(false);
                      }}
                      className="flex h-[50px] w-full items-center justify-between rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[15px] text-[#A3A3A3] sm:text-[16px]"
                    >
                      {`${checkOutHour.padStart(2, "0")}:${checkOutMinute} ${checkOutMeridiem}`}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#9CA3AF]">
                        <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 7.5V12l3.2 1.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>

                    {isCheckOutPickerOpen ? (
                      <div className="absolute left-2 top-full z-20 mt-2 flex overflow-hidden rounded-[10px] bg-[#F3F4F6] shadow-[0_8px_20px_rgba(15,23,42,0.15)]">
                        <div className="max-h-[210px] overflow-y-auto px-4 py-2">
                          {[...Array.from({ length: 10 }, (_, i) => (i + 1).toString())].map((hour) => (
                            <button
                              key={`out-h-${hour}`}
                              type="button"
                              onClick={() => setCheckOutHour(hour)}
                              className={`my-1 block w-[34px] rounded-[7px] py-1 text-[14px] ${
                                checkOutHour === hour ? "bg-[#1D75F8] text-white" : "text-[#111827]"
                              }`}
                            >
                              {hour}
                            </button>
                          ))}
                        </div>
                        <div className="max-h-[210px] overflow-y-auto px-4 py-2">
                          {["19", "20", "21", "22", "23", "24", "25", "26", "27", "28"].map((minute) => (
                            <button
                              key={`out-m-${minute}`}
                              type="button"
                              onClick={() => setCheckOutMinute(minute)}
                              className={`my-1 block w-[34px] rounded-[7px] py-1 text-[14px] ${
                                checkOutMinute === minute ? "bg-[#1D75F8] text-white" : "text-[#111827]"
                              }`}
                            >
                              {minute}
                            </button>
                          ))}
                        </div>
                        <div className="m-2 rounded-[18px] bg-[#EBEEF2] p-1">
                          {(["AM", "PM"] as const).map((slot) => (
                            <button
                              key={`out-${slot}`}
                              type="button"
                              onClick={() => setCheckOutMeridiem(slot)}
                              className={`block w-[48px] rounded-[14px] py-2 text-[14px] ${
                                checkOutMeridiem === slot ? "bg-[#1D75F8] text-white" : "text-[#111827]"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsFullMonthReportOpen(false)}
                className="h-[44px] rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-5 text-[14px] font-medium text-[#111827]"
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-[44px] rounded-[10px] bg-[#1D75F8] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#1569E8]"
                onClick={() => {
                  setIsFullMonthReportOpen(false);
                  setIsMarkedSuccessOpen(true);
                }}
              >
                Add Material
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isMarkedSuccessOpen ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30 p-4"
          onClick={() => setIsMarkedSuccessOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[470px] rounded-[22px] bg-white px-6 pb-5 pt-6 shadow-[0_20px_50px_rgba(15,23,42,0.18)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="marked-success-title"
          >
            <div className="mx-auto flex h-[102px] w-[102px] items-center justify-center rounded-full bg-[#FAF8F6]">
              <svg width="46" height="46" viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#0077FF]">
                <path
                  d="M5.2 12.4 10 17.2 18.8 7.8"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 id="marked-success-title" className="mt-3 text-center text-[18px] font-semibold leading-tight text-[#111827]">
              Marked
            </h3>

            <button
              type="button"
              onClick={() => setIsMarkedSuccessOpen(false)}
              className="mt-5 inline-flex h-[46px] w-full items-center justify-center rounded-[14px] bg-[#0077FF] text-[16px] font-medium text-white transition-colors hover:bg-[#0069E0]"
            >
              Continue
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}


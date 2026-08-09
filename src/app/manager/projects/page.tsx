"use client";

import AppToolbar from "@/components/common/AppToolbar";
import DashboardHeader from "@/components/common/dashboardHeader";
import { Filter, Plus } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type ProjectStatus = "ACTIVE" | "COMPLETED" | "INACTIVE";

interface Project {
  id: number;
  name: string;
  city: string;
  type: string;
  plotsSold: number;
  totalPlots: number;
  revenue: string;
  status: ProjectStatus;
}

// ── Data ───────────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    id: 1,
    name: "Green Valley Housing Society",
    city: "Lahore",
    type: "Residential",
    plotsSold: 145,
    totalPlots: 200,
    revenue: "PKR 250.0M",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Blue Sky Apartments",
    city: "Karachi",
    type: "Commercial",
    plotsSold: 32,
    totalPlots: 50,
    revenue: "PKR 180.0M",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Palm Heights",
    city: "Islamabad",
    type: "Residential",
    plotsSold: 150,
    totalPlots: 150,
    revenue: "PKR 320.0M",
    status: "COMPLETED",
  },
];

// ── Badge ──────────────────────────────────────────────────────────────────
const badgeStyles: Record<ProjectStatus, string> = {
  ACTIVE: "bg-gray-900 text-white",
  COMPLETED: "bg-gray-900 text-white",
  INACTIVE: "bg-gray-200 text-gray-600",
};

// ── Icons ──────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9ca3af"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const TrendIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22c55e"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ── Progress Bar ───────────────────────────────────────────────────────────
function ProgressBar({ sold, total }: { sold: number; total: number }) {
  const pct = Math.round((sold / total) * 100);
  return (
    <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 rounded-full transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Project Card ───────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col gap-3">
      {/* Title row */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-medium text-[#0A0A0A]">{project.name}</h3>
        <div className={`px-6 py-2 rounded-[8px] ${project.status === "COMPLETED" ? "bg-[#000000] text-[#FFFFFF]" : "bg-[#ECEEF2]"}  border border-[#00000000]`}>
          <h1 className={`text-sm font-medium ${project.status === "COMPLETED" ? "text-[#FFFFFF]" : "text-[#030213]"} `}>
            {project.status}
          </h1>
        </div>
      </div>

      {/* City */}
      <div className="flex items-center gap-1 ">
        <LocationIcon />
        <span className="text-sm font-normal text-[#45556C]">
          {project.city}
        </span>
      </div>

      {/* Type */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Type</span>
        <span className="text-sm font-medium text-[#0A0A0A]">
          {project.type}
        </span>
      </div>

      {/* Plots Sold */}
      <div className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Plots Sold</span>
          <span className="text-sm font-medium text-[#0A0A0A]">
            {project.plotsSold} / {project.totalPlots}
          </span>
        </div>
        <ProgressBar sold={project.plotsSold} total={project.totalPlots} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1">
          <TrendIcon />
          <span className="text-xs font-semibold text-green-500">
            {project.revenue}
          </span>
        </div>
        <button className="text-sm font-medium text-[#0A0A0A] ">
          View Details
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function ProjectsPage() {


  return (
    <div className="h-full  p-6 ">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
       <DashboardHeader
                 title="Projects"
                 description="Manage housing societies and commercial projects"
               buttonText="New Project"
               buttonIcon={<Plus className="h-4 w-4" />}
               onButtonClick={() => console.log("Create Project")}
               />

        <div className="my-6">
          <AppToolbar
          searchPlaceholder="Search projects"
          actions={[
            {
              id: "filter",
              label: "Filter",
              icon: <Filter size={16} />,
            },
          ]}
        />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

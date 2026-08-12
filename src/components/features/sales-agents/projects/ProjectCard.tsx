import { MapPin, TrendingUp } from "lucide-react";

export type ProjectStatus = "ACTIVE" | "COMPLETED";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  location: string;
  type: "Residential" | "Commercial";
  plotsSold: number;
  totalPlots: number;
  revenue: number;
}

interface ProjectCardProps {
  project: Project;
  onViewDetails?: (project: Project) => void;
}

export function ProjectCard({
  project,
  onViewDetails,
}: ProjectCardProps) {
  const progress =
    project.totalPlots > 0
      ? Math.min((project.plotsSold / project.totalPlots) * 100, 100)
      : 0;

  return (
    <div className="w-full rounded-xl border border-[#E4E4E7] bg-white p-[22px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <h3 className="text-lg font-medium leading-6 text-[#0A0A0A]">
            {project.name}
          </h3>

          <span
            className={`shrink-0 rounded-md px-2 py-[2px] text-xs font-medium leading-4 ${
              project.status === "COMPLETED"
                ? "bg-[#080414] text-white"
                : "bg-[#ECEEF2] text-[#030213]"
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Location */}
      <div className="mt-1 flex items-center gap-2 text-sm text-[#45556C]">
        <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.7} />
        <span>{project.location}</span>
      </div>

      {/* Project information */}
      <div className="mt-7 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#45556C]">Type</span>
          <span className="text-sm font-medium text-[#0A0A0A]">
            {project.type}
          </span>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#45556C]">Plots Sold</span>

            <span className="text-sm font-medium text-[#0A0A0A]">
              {project.plotsSold} / {project.totalPlots}
            </span>
          </div>

          {/* Progress */}
          <div className="mt-2 h-[7px] w-full overflow-hidden rounded-full bg-[#E2E8F0]">
            <div
              className="h-full rounded-full bg-[#155DFC] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[#EEEEEE] pt-5">
        <div className="flex items-center gap-1.5 text-sm font-medium text-[#00A63E]">
          <TrendingUp className="h-4 w-4" strokeWidth={1.8} />
          <span>
            PKR {project.revenue.toFixed(1)}M
          </span>
        </div>

        <button
          type="button"
          onClick={() => onViewDetails?.(project)}
          className="text-sm font-medium text-[#0A0A0A] transition-opacity hover:opacity-60"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;

  icon?: LucideIcon;

  iconColor?: string;
  subtitleColor?: string;

  className?: string;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "#2563EB",
  subtitleColor = "#64748B",
  className = "",
}: StatsCardProps) {
  return (
    <div
      className={`rounded-2xl border border-[#E2E8F0] bg-white p-6 ${className}`}
    >
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-medium text-[#0A0A0A]">
          {title}
        </h3>

        {Icon && 
        <Icon className="h-6 w-6"
              style={{ color: iconColor }}
        />}
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#0A0A0A]">
          {value}
        </h2>

        <p
          className="mt-1 text-xs"
          style={{ color: subtitleColor }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
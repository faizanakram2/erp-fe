import { LucideIcon } from "lucide-react";

interface HeaderProps {
  title: string;
  icon?: LucideIcon;
  description: string;

  badge?: string;

  buttonText?: string;
  onButtonClick?: () => void;
  buttonIcon?: React.ReactNode;
}

export default function DashboardHeader({
  title,
  icon: Icon,
  description,
  badge,
  buttonText,
  onButtonClick,
  buttonIcon,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon className="h-7 w-7 text-[#155DFC]" />
          )}
          <h1 className="text-3xl font-bold leading-tight text-[#0A0A0A]">
            {title}
          </h1>
        </div>

        <p className="mt-1 text-[#45556C]">
          {description}
        </p>

        {badge && (
          <span className="mt-3 inline-flex rounded-full border border-[#0000001A] px-2 py-1 text-xs font-semibold uppercase tracking-widest text-[#0A0A0A]">
            {badge}
          </span>
        )}
      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="flex items-center gap-2 rounded-md bg-[#030213] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1a1a2e]"
        >
          {buttonIcon}
          {buttonText}
        </button>
      )}
    </div>
  );
}
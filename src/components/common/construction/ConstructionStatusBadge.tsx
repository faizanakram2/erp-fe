import { cn } from "@/lib/utils";

interface Props {
  status:
    | "COMPLETED"
    | "IN PROGRESS"
    | "NOT STARTED"
    | "ON HOLD";
}

const styles = {
  COMPLETED: "bg-[#0F172A] text-white",
  "IN PROGRESS": "bg-[#F1F5F9] text-[#0F172A]",
  "NOT STARTED": "bg-[#F8FAFC] text-[#334155]",
  "ON HOLD": "bg-[#F8FAFC] text-[#334155]",
};

export default function ConstructionStatusBadge({
  status,
}: Props) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-1 text-[10px] font-semibold uppercase",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}
interface Props {
  value: number;
}

export default function ConstructionProgress({
  value,
}: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Progress</span>

        <span className="font-medium text-[#2563EB]">
          {value}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full bg-[#2563EB] transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
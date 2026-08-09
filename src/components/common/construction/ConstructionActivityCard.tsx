import ConstructionProgress from "./ConstructionProgress";
import ConstructionStatusBadge from "./ConstructionStatusBadge";
import { ConstructionActivity } from "./types";

interface Props {
  activity: ConstructionActivity;
}

export default function ConstructionActivityCard({
  activity,
}: Props) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">

      <div className="flex items-center gap-3">

        <h3 className="text-lg font-semibold">
          {activity.title}
        </h3>

        <ConstructionStatusBadge
          status={activity.status}
        />

      </div>

      <p className="mt-2 text-[#64748B]">
        {activity.project} - {activity.block}
      </p>

      <p className="text-sm text-[#94A3B8]">
        Engineer: {activity.engineer}
      </p>

      <div className="mt-4">
        <ConstructionProgress value={activity.progress} />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-6">

        <div>
          <p className="text-xs text-[#94A3B8]">
            Start Date
          </p>

          <p className="font-medium">
            {activity.startDate}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#94A3B8]">
            Est. Completion
          </p>

          <p className="font-medium">
            {activity.completionDate}
          </p>
        </div>

        <div>
          <p className="text-xs text-[#94A3B8]">
            Workers
          </p>

          <p className="font-medium">
            {activity.workers} assigned
          </p>
        </div>

      </div>
    </div>
  );
}
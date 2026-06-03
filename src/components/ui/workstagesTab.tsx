import Image from "next/image";
export default function WorkStages() {
  const workItems = [
    { name: "Site Preparation", progress: 100, done: true },
    { name: "Foundation Work", progress: 100, done: true },
    { name: "Infrastructure Development", progress: 82, done: false },
    { name: "Sewerage System", progress: 30, done: false },
    { name: "Boundary Wall", progress: 20, done: false },
    { name: "Landscaping", progress: 1, done: false },
  ];

  return (
    <section className="bg-[#F9FAFB] p-8 rounded-[6px]  space-y-4">
      {/* Top row */}
      <div className="flex items-center justify-end">
        <select className="h-10 w-[239px] rounded-[5px] border-[2px] border-[#0070FF] bg-white flex items-center justify-center text-[12px] text-[#9F9F9F] font-normal outline-none">
          <option>Select Project</option>
          <option>Green Valley Phase 1</option>
          <option>Green Valley Phase 2</option>
        </select>
      </div>

      {/* Card */}
      <div className="rounded-[10px] bg-[#FFFFFF] p-4 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Image
            src="../icons/construction_icon.svg"
            alt="Constructor Image"
            width={24}
            height={24}
          />
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-medium text-[#101828]">
              Work Stages - Green Valley Phase 1
            </h2>
            <p className="text-[14px] text-[#667085] font-normal">Sector 45</p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-5">
          {workItems.map((item) => (
            <div key={item.name} className="flex gap-3 items-center">
              {/* Left icon */}
              <div className="">
                {item.done ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2d77ff]">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-4 w-4 fill-none stroke-white stroke-[3]"
                    >
                      <path d="M4 10l4 4 8-8" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#2d77ff] bg-white">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5 fill-none stroke-[#2d77ff] stroke-[2]"
                    >
                      <circle cx="10" cy="10" r="7" />
                      <path d="M10 6v4l3 2" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Right content */}
              <div className="flex-1 flex flex-col  gap-1">
                {/* title and status */}
                <div className="mb-1 flex items-center justify-between gap-3">
                  <h3 className="text-[18px] font-medium text-[#101828]">
                    {item.name}
                  </h3>

                  {/* status */}
                  <span
                    className={`rounded-full px-3.5 py-2.5 text-[10px] font-medium ${
                      item.done
                        ? "bg-[#2d77ff] text-white"
                        : "bg-[#dbdbdb] text-[#555]"
                    }`}
                  >
                    {item.done ? "Complete" : "In Progress"}
                  </span>
                </div>

                {/* progress heading */}
                <div className="flex items-center justify-between">
                  <p className=" text-[15px] text-[#75738C] font-medium">
                    Progress
                  </p>
                  <p className=" text-[10px] text-[#6b7280]">
                    {item.progress}%
                  </p>
                </div>
                {/* progress bar */}
                <div className="h-2 w-full rounded-full bg-[#E9E9E9]">
                  <div
                    className="h-2 rounded-full bg-[#2d77ff] transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

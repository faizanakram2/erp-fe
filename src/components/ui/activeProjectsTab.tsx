import Image from "next/image";
const ActiveProjects = () => {
  const projects = [
    {
      id: "1",
      title: "Green Valley Phase 1",
      address: "Sector 45",
      bufferUtilization: 35,
      progress: 35,
      status: "On Track",
      projectId: "PRJ-001",
      contractor: "ABC Builders Ltd",
      startDate: "2024-01-01",
      targetEnd: "2024-12-31",
    },
    {
      id: "2",
      title: "Royal Palm Estate",
      address: "DHA Phase 8",
      bufferUtilization: 45,
      progress: 67,
      status: "Delayed",
      projectId: "PRJ-002",
      contractor: "ABC Builders Ltd",
      startDate: "2024-01-01",
      targetEnd: "2024-12-31",
    },
  ];
  return (
    <>
      {/* project cards wrapper */}
      <div className=" p-4 rounded-[6px] flex flex-col gap-6 bg-[#F9FAFB] p-4">
        {/* single project card */}
        {projects.map((project, index) => (
          <div className="bg-[#FFFFFF] rounded-[10px] p-4 flex flex-col gap-2.5 ">
            {/* description and Status */}
            <div className="flex w-full items-center justify-between">
              {/* description  and image */}
              <div className="flex gap-2 items-center">
                <Image
                  src="./icons/construction_icon.svg"
                  alt="status icon"
                  width={24}
                  height={24}
                />
                {/* desciption */}
                <div>
                  <h1 className="font-semibold text-[18px] text-[#101828]">
                    {project.title}
                  </h1>
                  <p className="text-[12px] text-[#667085] font-normal">
                    {project.address}
                  </p>
                </div>
              </div>
              {/* status */}
              <div className="h-[24px] w-[80px] px-1 rounded-[48px] bg-[#0070FF] flex items-center justify-center">
                <Image
                  src="./icons/status_icon.svg"
                  alt="status icon"
                  width={24}
                  height={24}
                />
                <p className="text-[10px] text-[#FFFFFF] font-normal">
                  {project.status}
                </p>
              </div>
            </div>

            <div
              className="w-[95%] flex items-center justify-between
              "
            >
              {/* left side  */}
              <div className="flex flex-col gap-4">
                {/* budget utilization */}
                <div className="w-[413px] flex flex-col gap-4">
                  <div className="flex w-full items-center justify-between">
                    <h1 className="font-semibold text-[12px] text-[#333B69]">
                      Budget Utilization
                    </h1>
                    <div className="w-[30px] h-[17px] rounded-[21px] bg-[#0044FFB2] flex items-center justify-center">
                      <h1 className="font-normal text-[9px] text-white">
                        {project.bufferUtilization}%
                      </h1>
                    </div>
                  </div>
                  <div className="bg-[#E9E9E9] w-full h-[8px] rounded-[100px] ">
                    <div
                      className="bg-[#307FE2]  h-full rounded-[100px] "
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                {/* construction progress */}
                <div className="w-[413px] flex flex-col gap-4">
                  <div className="flex w-full items-center justify-between">
                    <h1 className="font-semibold text-[12px] text-[#333B69]">
                      Construction Progress
                    </h1>
                    <div className="w-[30px] h-[17px] rounded-[21px] bg-[#0044FFB2] flex items-center justify-center">
                      <h1 className="font-normal text-[9px] text-white">
                        {project.progress}%
                      </h1>
                    </div>
                  </div>
                  <div className="bg-[#E9E9E9] w-full h-[8px] rounded-[100px] ">
                    <div
                      className="bg-[#307FE2]  h-full rounded-[100px] "
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* right side */}
              <div className="flex gap-16">
                <div className="flex flex-col items-center gap-4">
                  {/* project Id */}
                  <div className="w-[105px] h-[43px] rounded-[6px] bg-[#307FE242] flex flex-col items-center justify-center gap-1">
                    <h1 className="text-[10px] font-semibold text-[#000000]">
                      Project Id
                    </h1>
                    <h1 className="text-[10px] font-normal text-[#4D7CFF]">
                      {project.projectId}
                    </h1>
                  </div>
                  {/* start date */}
                  <div className="w-[105px] h-[43px] rounded-[6px] bg-[#307FE242] flex flex-col items-center justify-center gap-1">
                    <h1 className="text-[10px] font-semibold text-[#000000]">
                      Start Date
                    </h1>
                    <h1 className="text-[10px] font-normal text-[#4D7CFF]">
                      {project.startDate}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  {/* contratctor */}
                  <div className="w-[105px] h-[43px] rounded-[6px] bg-[#307FE242] flex flex-col items-center justify-center gap-1">
                    <h1 className="text-[10px] font-semibold text-[#000000]">
                      Contractor
                    </h1>
                    <h1 className="text-[10px] font-normal text-[#4D7CFF]">
                      {project.contractor}
                    </h1>
                  </div>
                  {/* target date */}
                  <div className="w-[105px] h-[43px] rounded-[6px] bg-[#307FE242] flex flex-col items-center justify-center gap-1">
                    <h1 className="text-[10px] font-semibold text-[#000000]">
                      Target End
                    </h1>
                    <h1 className="text-[10px] font-normal text-[#4D7CFF]">
                      {project.targetEnd}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActiveProjects;

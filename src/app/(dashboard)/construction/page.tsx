"use client";
import Image from "next/image";
import { useState } from "react";
import CreateProjectModal from "@/components/models/CreateNewProject";
import UpdateProjectModal from "@/components/models/UpdateProjectProgress";
import ActiveProjects from "@/components/ui/activeProjectsTab";
import WorkStages from "@/components/ui/workstagesTab";
import MaterailInvetory from "@/components/ui/materialnventoryTab";
export default function Construction() {
  const [toggleNewProject, setToggleNewProject] = useState<boolean>(false);
  const [toggleUpdateProject, setToggleUpdateProject] =
    useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("activeProjects");

  const handleTab = (val: string) => {
    setActiveTab(val);
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      {toggleNewProject && (
        <CreateProjectModal
          onClose={() => {
            setToggleNewProject(false);
          }}
        ></CreateProjectModal>
      )}
      {toggleUpdateProject && (
        <UpdateProjectModal
          onClose={() => {
            setToggleUpdateProject(false);
          }}
        ></UpdateProjectModal>
      )}
      {/*  top heading */}
      <div className="bg-white h-[80px] w-full flex  items-center justify-between px-8">
        {/* heading and description */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-[18px] text-[#101828]  ">
              Construction & Inventory
            </h1>
            <button
              onClick={() => {
                setToggleNewProject(true);
              }}
              className="cursor-pointer w-[42px] h-[42px] rounded-[16px] flex items-center justify-center bg-[#F7FAFF]"
            >
              <h1 className="font-semibold text-[12px] text-[#0070FF]">New</h1>
            </button>
          </div>
          <p className="text-[12px] font-normal text-[#667085]">
            Track construction progress, materials, and site management
          </p>
        </div>
        {/* refresh and add project updates button */}
        <div className="flex gap-2 items-center">
          {/* refresh button */}
          <button className="w-[142px] h-[40px] rounded-[8px] flex  gap-2 items-center justify-center bg-white border border-[#0070FF]">
            <Image
              src="./icons/refresh_icon.svg"
              alt="refresh icon"
              width={20}
              height={20}
            />
            <h1 className="font-normal text-[10px] text-[#0070FF]">
              {" "}
              Update Project
            </h1>
          </button>
          {/* add project updates button */}
          <button
            onClick={() => {
              setToggleUpdateProject(true);
            }}
            className="cursor-pointer w-[142px] h-[40px] rounded-[8px] flex  gap-2 items-center justify-center bg-[#0070FF]"
          >
            <Image
              src="./icons/add_icon.svg"
              alt="add icon"
              width={20}
              height={20}
            />
            <h1 className="font-normal text-[10px] text-white">
              {" "}
              Add Project Updates
            </h1>
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="w-[414px] rounded-[8px] border border-[#D0D5DD] ">
        <button
          onClick={() => handleTab("activeProjects")}
          className={`cursor-pointer h-[40px] w-[137px] ${activeTab === "activeProjects" ? "bg-[#F9FAFB]" : "bg-white"}  rounded-l-[8px]   border-r border-[#EBD0D0]  text-[14px] font-semibold text-[#1D2939]`}
        >
          Active Projects
        </button>
        <button
          onClick={() => handleTab("workStages")}
          className={`cursor-pointer h-[40px] w-[137px] ${activeTab === "workStages" ? "bg-[#F9FAFB]" : "bg-white"} border-r border-[#EBD0D0]  text-[14px] font-semibold text-[#1D2939]`}
        >
          Work Stages
        </button>
        <button
          onClick={() => handleTab("materialInventory")}
          className={`cursor-pointer h-[40px] w-[137px] ${activeTab === "materialInventory" ? "bg-[#F9FAFB]" : "bg-white"} rounded-r-[8px]   text-[14px] font-semibold text-[#1D2939]`}
        >
          Material Inventory
        </button>
      </div>

      {activeTab === "activeProjects" ? (
        <ActiveProjects></ActiveProjects>
      ) : activeTab === "workStages" ? (
        <WorkStages></WorkStages>
      ) : (
        <MaterailInvetory />
      )}
    </div>
  );
}

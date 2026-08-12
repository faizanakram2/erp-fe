"use client"
import AppToolbar from "@/components/common/AppToolbar";
import DashboardHeader from "@/components/common/dashboardHeader";
import { ProjectCard } from "@/components/features/sales-agents/projects/ProjectCard";
import { projects } from "@/data/sales-agents-data/projectsData";
import { Filter } from "lucide-react";

export default function Page() {
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto space-y-5">
                {/* Header */}
                <DashboardHeader
                    title="Projects"
                    description="Manage housing societies and commercial projects"
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

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    )
}
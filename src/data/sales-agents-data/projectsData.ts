import { Project } from "@/components/features/sales-agents/projects/ProjectCard";

export const projects: Project[] = [
  {
    id: "1",
    name: "Green Valley Housing Society",
    status: "ACTIVE",
    location: "Lahore",
    type: "Residential",
    plotsSold: 145,
    totalPlots: 200,
    revenue: 250,
  },
  {
    id: "2",
    name: "Blue Sky Apartments",
    status: "ACTIVE",
    location: "Karachi",
    type: "Commercial",
    plotsSold: 32,
    totalPlots: 50,
    revenue: 180,
  },
  {
    id: "3",
    name: "Palm Heights",
    status: "COMPLETED",
    location: "Islamabad",
    type: "Residential",
    plotsSold: 150,
    totalPlots: 150,
    revenue: 320,
  },
];
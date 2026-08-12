"use client";
import { useMemo, useState } from "react";
import AppToolbar from "@/components/common/AppToolbar";
import DashboardHeader from "@/components/common/dashboardHeader";
import StatsCard from "@/components/common/StatsCard";
import { CircleCheckBig, CircleX, Plus, User } from "lucide-react";
import UserCard, { Users } from "@/components/features/manager/users/UserCard";

const users: Users[] = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "admin@devlayers.org",
    phone: "+92-300-1234567",
    role: "ADMIN",
    department: "Management",
    joined: "2024-01-15",
    lastLogin: "2026-05-20 09:15 AM",
    active: true,
    permissions: ["All Access"],
  },

  {
    id: 2,
    name: "Sarah Khan",
    email: "manager@devlayers.org",
    phone: "+92-321-9876543",
    role: "MANAGER",
    department: "Operations",
    joined: "2024-03-20",
    lastLogin: "2026-05-20 08:45 AM",
    active: true,
    permissions: [
      "Projects",
      "Bookings",
      "Customers",
      "Reports",
    ],
  },

  {
    id: 3,
    name: "Ali Raza",
    email: "sales@devlayers.org",
    phone: "+92-333-4567890",
    role: "SALES AGENT",
    department: "Sales",
    joined: "2024-06-10",
    lastLogin: "2026-05-19 06:30 PM",
    active: true,
    permissions: [
      "Customers",
      "Bookings",
      "Payments",
    ],
  },

  {
    id: 4,
    name: "Fatima Malik",
    email: "accounts@devlayers.org",
    phone: "+92-300-7654321",
    role: "ACCOUNTANT",
    department: "Finance",
    joined: "2024-05-05",
    lastLogin: "2026-05-20 07:00 AM",
    active: true,
    permissions: [
      "Payments",
      "Accounting",
      "Payroll",
    ],
  },

  {
    id: 5,
    name: "Bilal Shah",
    email: "engineer@devlayers.org",
    phone: "+92-300-7654321",
    role: "SITE ENGINEER",
    department: "Engineer",
    joined: "2024-05-05",
    lastLogin: "2026-05-20 07:00 AM",
    active: true,
    permissions: [
      "Develope",
      "Debug",
      "Test",
    ],
  },

  {
  id: 6,
  name: "Usman Tariq",
  email: "usman@devlayers.org",
  phone: "+92-311-4567890",
  role: "SITE ENGINEER",
  department: "Engineering",
  joined: "2024-07-12",
  lastLogin: "2026-05-19 05:45 PM",
  active: true,
  permissions: [
    "Projects",
    "Site Visits",
    "Reports",
  ],
},

{
  id: 7,
  name: "Ayesha Malik",
  email: "ayesha@devlayers.org",
  phone: "+92-322-7890123",
  role: "ACCOUNTANT",
  department: "Finance",
  joined: "2024-08-01",
  lastLogin: "2026-05-18 04:20 PM",
  active: false,
  permissions: [
    "Accounting",
    "Payments",
    "Payroll",
  ],
},
];

const stats = [
  {
    id: 1,
    title: "Total Users",
    value: 8,
    icon: User,
    iconColor: "#155DFC",
    subtitle: "Team members",
    subtitleColor: "#45556C",
  },
  {
    id: 2,
    title: "Active Users",
    value: 7,
    icon: CircleCheckBig,
    iconColor: "#00A63E",
    subtitle: "Currently active",
    subtitleColor: "#45556C",
  },
  {
    id: 3,
    title: "Sales Team",
    value: 15,
    icon: User,
    iconColor: "#00A63E",
    subtitle: "Sales agents",
    subtitleColor: "#45556C",
  },
  {
    id: 4,
    title: "Inactive",
    value: 15,
    icon: CircleX,
    iconColor: "#45556C",
    subtitle: "Not active",
    subtitleColor: "#45556C",
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredUsers = useMemo(() => {
  return users.filter((user) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.department.toLowerCase().includes(searchTerm);

    const roleMap: Record<string, string> = {
      all: "",
      admin: "ADMIN",
      manager: "MANAGER",
      "sales-agent": "SALES AGENT",
      accountant: "ACCOUNTANT",
      "site-engineer": "SITE ENGINEER",
    };

    const matchesRole =
      activeFilter === "all" ||
      user.role === roleMap[activeFilter];

    return matchesSearch && matchesRole;
  });
}, [search, activeFilter]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <DashboardHeader
          title="Reports & Analytics"
          icon={User}
          description="Manage team members, roles, and permissions"
          buttonText="Add User"
          buttonIcon={<Plus className="h-4 w-4" />}
          onButtonClick={() => console.log("Add User")}
        />

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.iconColor}
              subtitle={stat.subtitle}
              subtitleColor={stat.subtitleColor}
            />
          ))}
        </div>

        <div className="my-6">
          <AppToolbar
          searchPlaceholder="Search by name, email, or department..."
          searchValue={search}
          onSearchChange={setSearch}
            actions={[
              {
                id: "all",
                label: "All",
                onClick: () => setActiveFilter("all"),
              },
              {
                id: "admin",
                label: "Admin",
                onClick: () => setActiveFilter("admin"),
              },
              {
                id: "manager",
                label: "Manager",
                onClick: () => setActiveFilter("manager"),
              },
              {
                id: "sales-agent",
                label: "Sales Agent",
                onClick: () => setActiveFilter("sales-agent"),
              },
              {
                id: "accountant",
                label: "Accountant",
                onClick: () => setActiveFilter("accountant"),
              },
              {
                id: "site-engineer",
                label: "Site Engineer",
                onClick: () => setActiveFilter("site-engineer"),
              },
            ]}
          />
        </div>

         <div className="space-y-3">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onPermissions={(user) => {
                console.log(
                  "Manage permissions:",
                  user
                );
              }}
              onEdit={(user) => {
                console.log("Edit user:", user);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

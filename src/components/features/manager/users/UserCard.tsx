"use client";

import { Mail, Phone, Shield, User, UserRound } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type UserRole =
  | "ADMIN"
  | "MANAGER"
  | "SALES AGENT"
  | "ACCOUNTANT"
  | "SITE ENGINEER";

export interface Users {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  joined: string;
  lastLogin: string;
  permissions: string[];
  active: boolean;
}

interface UserCardProps {
  user: Users;
  onPermissions?: (user: Users) => void;
  onEdit?: (user: Users) => void;
}

function getRoleStyles(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "border-red-100 bg-[#FEF2F2] text-[#E7000B]";

    case "MANAGER":
      return "border-blue-100 bg-[#EFF6FF] text-[#155DFC]";

    case "SALES AGENT":
      return "border-green-100 bg-[#F0FDF4] text-[#00A63E]";

    case "ACCOUNTANT":
      return "border-purple-100 bg-[#FAF5FF] text-[#9810FA]";

      case "SITE ENGINEER":
      return "border-red-100 bg-[#FFF7ED] text-[#F54900]";

    default:
      return "border-slate-100 bg-slate-50 text-slate-600";
  }
}

export default function UserCard({
  user,
  onPermissions,
  onEdit,
}: UserCardProps) {
  return (
    <Card className="rounded-xl border-[#E4E4E7] shadow-none">
      <CardContent className="p-4">
        {/* Main content */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE]">
            <User
              size={20}
              className="text-blue-600"
            />
          </div>

          {/* User information */}
          <div className="min-w-0 flex-1">
            {/* Name / badges */}
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-[#0A0A0A]">
                {user.name}
              </h3>

              {user.active && (
                <Badge className="h-6 rounded-md bg-[#030213] px-2 text-xs font-medium text-white hover:bg-black">
                  ACTIVE
                </Badge>
              )}

              <Badge
                variant="outline"
                className={`h-6 rounded-md px-2 text-xs font-medium ${getRoleStyles(
                  user.role
                )}`}
              >
                {user.role}
              </Badge>
            </div>

            {/* Email */}
            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#45556C]">
              <Mail size={14} />
              <span>{user.email}</span>
            </div>

            {/* Phone */}
            <div className="mt-1 flex items-center gap-1.5 text-sm text-[#45556C]">
              <Phone size={14} />
              <span>{user.phone}</span>
            </div>

            {/* User metadata */}
            <div className="mt-2 flex flex-wrap items-center gap-x-1 text-sm">
              <span className="text-[#62748E]">Department:</span>

              <span className="font-medium text-[#0A0A0A]">
                {user.department}
              </span>

              <span className="text-[#62748E]">Joined:</span>

              <span className="font-medium text-[#0A0A0A]">
                {user.joined}
              </span>

              <span className="text-[#62748E]">Last Login:</span>

              <span className="font-medium text-[#0A0A0A]">
                {user.lastLogin}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPermissions?.(user)}
              className="h-8 gap-1.5 rounded-lg border-[#E4E4E7] px-3 text-sm font-medium text-[#0A0A0A] shadow-none"
            >
              <Shield size={12} />
              Permissions
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(user)}
              className="h-8 rounded-lg border-[#E4E4E7] px-3 text-sm font-medium text-[#0A0A0A] shadow-none"
            >
              Edit
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-[#E4E4E7]" />

        {/* Permissions */}
        <div>
          <p className="text-xs text-[#62748E]">
            Permissions:
          </p>

          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {user.permissions.map((permission) => (
              <span
                key={permission}
                className="rounded-md border border-[#E4E4E7] bg-white px-1.5 py-0.5 text-xs font-medium text-[#0A0A0A]"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
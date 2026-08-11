
import { pageNames } from "@/data/pageNames";

export function getPageName(pathname: string): string {
  // Exact match first
  if (pageNames[pathname]) {
    return pageNames[pathname];
  }

  // Match nested routes
  const matchedRoute = Object.keys(pageNames)
    .filter((route) => route !== "/")
    .sort((a, b) => b.length - a.length)
    .find((route) => pathname.startsWith(`${route}/`));

  if (matchedRoute) {
    return pageNames[matchedRoute];
  }

  return "Dashboard";
}
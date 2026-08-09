export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface SidebarSection {
  id: string;
  title?: string;
  items: SidebarItem[];
}
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
export default function Home() {
  return (
    <div className="grid grid-cols-[280px_1fr] h-screen grid-rows-[auto_1fr]">
      <div className="  row-span-2">
        <Sidebar />
      </div>
      <div className="  ">
        <Navbar />
      </div>

      <div className=" ">
        <Dashboard />
      </div>
    </div>
  );
}

import { DataTable } from "@/components/common/DataTable/DataTable";
import { columns } from "./columns";
import { customers } from "./data";

export default function CustomerTable() {
  return (
    <DataTable
      title="All Customers"
      columns={columns}
      data={customers}
    />
  );
}
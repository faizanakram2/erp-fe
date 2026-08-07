import { DataTable } from "@/components/common/DataTable/DataTable";

import { columns } from "./columns";
import { payments } from "./data";

export default function PaymentsTable() {
    return (
        <DataTable
            title="Recent Payments"
            columns={columns}
            data={payments}
        />
    )
}

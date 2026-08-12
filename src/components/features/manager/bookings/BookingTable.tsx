import { DataTable } from "@/components/common/DataTable/DataTable";
import { columns } from "./columns";
import { bookings } from "./data";

export default function BookingTable() {
    return (
        <DataTable
            title="All Bookings"
            columns={columns}
            data={bookings}
        />
    )
}
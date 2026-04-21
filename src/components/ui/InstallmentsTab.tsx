export default function InstallmentSchedulePage() {
  const rows = [
    {
      customer: "Ahmed Khan",
      plot: "GV-A-45",
      installment: "#7",
      dueDate: "2024-06-15",
      amount: "PKR 500,000",
      totalPaid: "PKR 200,000",
      status: "Active",
      action: "delayed",
    },
    {
      customer: "Ahmed Khan",
      plot: "GV-A-45",
      installment: "#4",
      dueDate: "2024-06-15",
      amount: "PKR 500,000",
      totalPaid: "PKR 100,000",
      status: "Active",
      action: "onTime",
    },
    {
      customer: "Ahmed Khan",
      plot: "GV-A-45",
      installment: "#19",
      dueDate: "2024-06-15",
      amount: "PKR 100,000",
      totalPaid: "PKR 100,000",
      status: "Active",
      action: "pending",
    },
    {
      customer: "Ahmed Khan",
      plot: "GV-A-45",
      installment: "#13",
      dueDate: "2024-06-15",
      amount: "PKR 200,000",
      totalPaid: "PKR 200,000",
      status: "Paid",
      action: "clear",
    },
  ];

  return (
    <div className="min-h-screen bg-white ">
      <div className="w-full max-w-[980px] ] bg-white">
        <div className="px-5 pt-4 pb-3">
          <h2 className="text-[18px] font-medium leading-none text-[#101828]">
            Installment Schedule
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-[#EFEFEF] bg-[#FCFCFD]">
                {[
                  "Customer",
                  "Plot",
                  "Installment #",
                  "Due Date",
                  "Amount",
                  "Total Paid",
                  "Status",
                  "Action",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-5 py-3 text-left text-[12px] font-medium text-[#667085]"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={`${row.installment}-${idx}`}
                  className="border-b border-[#F1F1F1] last:border-b-0"
                >
                  <td className="px-5 py-4 text-[14px] font-medium text-[#101828]">
                    {row.customer}
                  </td>
                  <td className="px-5 py-4 text-[14px] font-medium text-[#101828]">
                    {row.plot}
                  </td>
                  <td className="px-5 py-4 text-[14px] text-[#667085]">
                    {row.installment}
                  </td>
                  <td className="px-5 py-4 text-[14px] text-[#667085]">
                    {row.dueDate}
                  </td>
                  <td className="px-5 py-4 text-[14px] font-medium text-[#101828]">
                    {row.amount}
                  </td>
                  <td className="px-5 py-4 text-[14px] font-medium text-[#101828]">
                    {row.totalPaid}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex min-w-[64px] items-center justify-center rounded-full px-3 py-[5px] text-[11px] font-semibold ${
                        row.status === "Active"
                          ? "bg-[#029A6780] text-white"
                          : "bg-[#00000080] text-white"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[18px]  ${row.action === "delayed" ? "border border-[#FF0000] text-[#FF0000]" : row.action === "onTime" ? " border border-[#00BC7D] text-[#00BC7D]" : row.action === "pending" ? "border border-[#0070FF] text-[#0070FF]" : "border border-[#808080] text-[#808080]"}`}
                    >
                      S
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const CustomerTab = () => {
  const rows = Array.from({ length: 5 }).map((_, i) => ({
    name: "Ahmed Khan",
    email: "ahmedkhan@gmail.com",
    phone: "+92 300-1234567",
    plot: "GV-A-45",
    project: "Green Valley Phase 1",
    amount: "70% Paid",
    joinDate: "2024-06-15",
    status: "Active",
    id: i,
  }));
  return (
    <>
      {/* Table */}
      <div className="overflow-hidden rounded-xl ">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#f9fafb]">
              <tr className="text-[12px] font-medium text-[#667085]">
                <th className="px-4 py-3">Name &amp; Contact</th>
                <th className="px-4 py-3">Plot &amp; Project</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Join Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-[#f0f2f5]">
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-[#111827]">
                      {row.name}
                    </p>
                    <p className="text-[11px] text-[#9ca3af]">{row.email}</p>
                    <p className="text-[11px] text-[#c0c4cc]">{row.phone}</p>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-[#374151]">
                      {row.plot}
                    </p>
                    <p className="text-[11px] text-[#c0c4cc]">{row.project}</p>
                  </td>

                  <td className="px-4 py-3 text-sm text-[#6b7280]">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6b7280]">
                    {row.joinDate}
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex min-w-[64px] justify-center rounded-full bg-[#029A6780] px-3 py-1 text-[14px] font-medium text-white">
                      {row.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right text-[#9ca3af]">
                    <button className="rounded-md p-1.5 hover:bg-[#f3f4f6]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="currentColor"
                      >
                        <circle cx="12" cy="5" r="1.8" />
                        <circle cx="12" cy="12" r="1.8" />
                        <circle cx="12" cy="19" r="1.8" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default CustomerTab;

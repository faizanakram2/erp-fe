const TransactionTab = () => {
  const rows = [
    {
      date: "2024-06-15",
      description: "Contractor Payment - ABC Builders",
      account: "Bank - HBL Main",
      amount: "PKR 5,000,000",
      type: "Income",
      id: "1",
    },
    {
      date: "2024-06-15",
      description: "Contractor Payment - ABC Builders",
      account: "Bank - HBL Main",
      amount: "PKR 5,000,000",
      type: "Expense",
      id: "2",
    },
  ];
  return (
    <>
      {/* Table */}
      <div className="overflow-hidden rounded-xl ">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-[#f9fafb]">
              <tr className="text-[12px] font-medium text-[#667085]">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Amount</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-[#f0f2f5]">
                  {/* date */}
                  <td className="px-4 py-3">
                    <p className="text-[14px] font-medium text-[#101828]">
                      {row.date}
                    </p>
                  </td>

                  {/* description */}
                  <td className="px-4 py-3">
                    <p className="text-[10px] font-normal text-[#787878]">
                      {row.description}
                    </p>
                  </td>

                  {/* type */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex min-w-[99px] justify-center rounded-full ${row.type === "Income" ? "bg-[#029A6780]" : "bg-[#A6A6A6]"}  px-3 py-1 text-[14px] font-medium text-white`}
                    >
                      {row.type}
                    </span>
                  </td>

                  {/* account */}
                  <td className="px-4 py-3">
                    <p className="text-[14px] font-normal text-[#667085]">
                      {row.account}
                    </p>
                  </td>
                  {/* amount */}
                  <td className="px-4 py-3">
                    <p className="text-[14px] font-normal text-[#787878]">
                      {row.amount}
                    </p>
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
export default TransactionTab;

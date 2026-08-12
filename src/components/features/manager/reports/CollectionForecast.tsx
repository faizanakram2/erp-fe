"use client";

import { Card, CardContent } from "@/components/ui/card";

interface ForecastItem {
  month: string;
  expected: string;
  actual: string;
  variance?: string;
  positive?: boolean;
}

const forecastData: ForecastItem[] = [
  {
    month: "Jan 2026",
    expected: "PKR 15.0M",
    actual: "PKR 14.2M",
    variance: "-5.3%",
    positive: false,
  },
  {
    month: "Feb 2026",
    expected: "PKR 18.0M",
    actual: "PKR 19.1M",
    variance: "+6.1%",
    positive: true,
  },
  {
    month: "Mar 2026",
    expected: "PKR 22.0M",
    actual: "PKR 21.5M",
    variance: "-2.3%",
    positive: false,
  },
  {
    month: "Apr 2026",
    expected: "PKR 20.0M",
    actual: "PKR 20.8M",
    variance: "+4.0%",
    positive: true,
  },
  {
    month: "May 2026",
    expected: "PKR 25.0M",
    actual: "PKR 23.5M",
    variance: "-6.0%",
    positive: false,
  },
  {
    month: "Jun 2026",
    expected: "PKR 28.0M",
    actual: "Pending",
  },
];

export default function CollectionForecast() {
  return (
    <Card className="rounded-2xl border-[#E4E4E7] shadow-none">
      <CardContent className="p-7">
        {/* Heading */}
        <h2 className="text-base font-medium text-[#0A0A0A]">
          Collection Forecast (Last 6 Months)
        </h2>

        {/* Rows */}
        <div className="mt-6">
          {forecastData.map((item, index) => (
            <div
              key={item.month}
              className={`grid grid-cols-1 items-center gap-4 py-4 sm:grid-cols-[1fr_1fr_1fr_auto] ${
                index !== forecastData.length - 1
                  ? "border-b border-[#E4E4E7]"
                  : ""
              }`}
            >
              {/* Month */}
              <div>
                <p className="text-base font-medium text-[#0A0A0A]">
                  {item.month}
                </p>
              </div>

              {/* Expected */}
              <div>
                <p className="text-sm text-[#62748E]">
                  Expected
                </p>

                <p className="mt-0.5 text-base font-medium text-[#0A0A0A]">
                  {item.expected}
                </p>
              </div>

              {/* Actual */}
              <div>
                <p className="text-sm text-[#62748E]">
                  Actual
                </p>

                <p className="mt-0.5 text-base font-medium text-[#0A0A0A]">
                  {item.actual}
                </p>
              </div>

              {/* Variance */}
              <div className="flex justify-start sm:justify-end">
                {item.variance && (
                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-medium ${
                      item.positive
                        ? "bg-[#030213] text-white"
                        : "bg-[#D4183D] text-white"
                    }`}
                  >
                    {item.variance}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
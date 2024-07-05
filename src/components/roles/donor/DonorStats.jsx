import { BarChart } from "@tremor/react";

const chartdata = [
  {
    month: "Jan",
    "Amount of leftover food saved": 24,
  },
  {
    month: "Feb",
    "Amount of leftover food saved": 14,
  },
  {
    month: "Mar",
    "Amount of leftover food saved": 7,
  },
  {
    month: "Apr",
    "Amount of leftover food saved": 2,
  },
  {
    month: "May",
    "Amount of leftover food saved": 5,
  },
  {
    month: "Jun",
    "Amount of leftover food saved": 2,
  },
  {
    month: "Jul",
    "Amount of leftover food saved": 9,
  },
  {
    month: "Aug",
    "Amount of leftover food saved": 9,
  },
  {
    month: "Sep",
    "Amount of leftover food saved": 9,
  },
  {
    month: "Oct",
    "Amount of leftover food saved": 30,
  },
  {
    month: "Nov",
    "Amount of leftover food saved": 9,
  },
  {
    month: "Dec",
    "Amount of leftover food saved": 9,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function DonorStats() {
  return (
    <div className="h-64 md:h-[260px] w-full md:w-[600px] bg-slate-200 border rounded-xl p-4 space-y-1">
      <h1 className="text-xl md:text-2xl font-semibold">Your Yearly Contributions</h1>
      <div>
        <BarChart
          className="h-[195px]"
          data={chartdata}
          index="month"
          categories={["Amount of leftover food saved"]}
          colors={["teal"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
          onValueChange={(v) => console.log(v)}
        />
      </div>
    </div>
  );
}

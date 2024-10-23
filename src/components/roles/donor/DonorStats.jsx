import { BarChart } from "@tremor/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

const DonorStats = () => {
  const [chartData, setChartData] = useState([]);
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_HOST}/donor/monthly-donations`)
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    socket.on("FoodDBChange", () => {
      fetch(`${import.meta.env.VITE_HOST}/donor/monthly-donations`)
        .then((response) => response.json())
        .then((data) => setChartData(data))
        .catch((error) => console.error(error));
    });
    return () => {
      socket.off("FoodDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-64 md:h-[260px] w-full md:w-full bg-slate-200 border rounded-xl p-4 space-y-1">
      <h1 className="text-xl md:text-2xl font-semibold">Your Contributions</h1>
      <div>
        <BarChart
          className="h-[195px]"
          data={chartData}
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
};

export default DonorStats;

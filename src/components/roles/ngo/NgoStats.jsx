import { LineChart } from "@tremor/react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

const NgoStats = () => {
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
    socket.on("MonthlyDonationDBChange", () => {
      fetch(`${import.meta.env.VITE_HOST}/donor/monthly-donations`)
        .then((response) => response.json())
        .then((data) => setChartData(data))
        .catch((error) => console.error(error));
    });
    return () => {
      socket.off("MonthlyDonationDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-64 md:h-[350px] w-full md:w-full bg-slate-100 border rounded-xl p-4 space-y-1">
      <h1 className="text-xl md:text-2xl font-semibold">Donation Statistics</h1>
      <div>
        <LineChart
          className="h-[250px]"
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

export default NgoStats;

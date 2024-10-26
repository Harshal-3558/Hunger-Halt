import { useSelector } from "react-redux";
import CreateDonation from "../donor/CreateDonation";
// import DonorUpdates from "./donor/DonorUpdates";
import Loader from "../../Loader";
import DonorStats from "../donor/DonorStats";
import LiveMap from "../../../map/LiveMap";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { LineChart, Card, Title, Text, AreaChart } from '@tremor/react';
import RecentActivity from "./RecentActivity";
import RequestCorpus from "./RequestCorpus";
import { FiAlertCircle } from "react-icons/fi";

const data = [
    { date: '01', value: 10 },
    { date: '02', value: 15 },
    { date: '03', value: 20 },
    { date: '04', value: 30 },
    { date: '05', value: 25 },
    { date: '06', value: 22 },
    { date: '07', value: 35 },
    { date: '08', value: 28 },
    { date: '09', value: 26 },
    { date: '10', value: 33 },
  ];
  
export default function BioDashboard() {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return (
    <div className="p-6">
      <div className="p-6 space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold">
          Welcome, {user?.name}
        </h1>
        <div className="grid md:grid-cols-custom md:grid-flow-col gap-4">
          <LiveMap />
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-1 h-full gap-4">
              <RequestCorpus/>
              <Link
                to={"/donationHistory"}
                className="h-32 md:h-full w-full md:w-full bg-slate-200 border rounded-xl flex flex-col justify-center items-center space-y-3"
              >
                <div>
                  <FiAlertCircle className="text-[30px]" />
                </div>
                <div>
                  <p className="text-base md:text-xl">Alerts And Notifications</p>
                </div>
              </Link>
            </div>
            {/* <div className="hidden md:flex">
              <DonorStats />
            </div> */}
          </div>
          <div className="md:hidden">
            <DonorStats />
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-100 min-h-screen">
      {/* Recent Activity Section */}


      {/* <RecentActivity/> */}

      {/* Biogas Production Metrics Section */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Biogas Production Metrics</h2>
        
        {/* Biogas Amount Generated Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-16">
            <div >
            <div className="flex justify-between ">
              <p className="text-lg font-medium my-auto">Biogas Amount Generated</p>
              <select className="mt-2 mb-2 border rounded">
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
                {/* Add more months here if needed */}
              </select>
            </div>
            <Card className="mt-4">
              <AreaChart
                data={data}
                dataKey="date"
                categories={["value"]}
                colors={["blue"]}
                showLegend={false}
                showGridLines={true}
                height="h-60"
                valueFormatter={(value) => `${value} Tons`}
              />
            </Card>
            </div>
            <div className="mb-4">
              <p className="text-lg">Daily</p>
              <LineChart
                data={data}
                dataKey="date"
                categories={["value"]}
                colors={["purple"]}
                showLegend={false}
                height="h-20"
                valueFormatter={(value) => `${value} Tons`}
              />
              <p className="text-right text-sm">1.5k Tons</p>
            </div>

          </div>

          {/* Additional Metrics - Daily, Monthly, Yearly */}
          <div className="flex flex-col justify-between">
           
            <div className="mb-4">
              <p className="text-lg">Monthly</p>
              <LineChart
                data={data}
                dataKey="date"
                categories={["value"]}
                colors={["blue"]}
                showLegend={false}
                height="h-20"
                valueFormatter={(value) => `${value} Tons`}
              />
              <p className="text-right text-sm">50k Tons</p>
            </div>

            <div>
              <p className="text-lg">Yearly</p>
              <LineChart
                data={data}
                dataKey="date"
                categories={["value"]}
                colors={["green"]}
                showLegend={false}
                height="h-20"
                valueFormatter={(value) => `${value} Tons`}
              />
              <p className="text-right text-sm">120k Tons</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    );
  }

  return (
    <div>
      <Loader />
    </div>
  );
}

import { useSelector } from "react-redux";
import CreateDonation from "./donor/CreateDonation";
// import DonorUpdates from "./donor/DonorUpdates";
import Loader from "../Loader";
import DonorStats from "./donor/DonorStats";
import LiveMap from "../../map/LiveMap";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function DonorHome() {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold">
          Welcome, {user?.name}
        </h1>
        <div className="grid md:grid-cols-2 md:grid-flow-col gap-4">
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-4">
              <CreateDonation />
              <Link
                to={"/donationHistory"}
                className="h-32 md:h-36 w-full md:w-full bg-slate-200 border rounded-xl flex flex-col justify-center items-center space-y-3"
              >
                <div>
                  <FaClockRotateLeft className="text-[30px]" />
                </div>
                <div>
                  <p className="text-base md:text-xl">Your recent donations</p>
                </div>
              </Link>
            </div>
            <div className="hidden md:flex">
              <DonorStats />
            </div>
          </div>
          <LiveMap />
          <div className="md:hidden">
            <DonorStats />
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

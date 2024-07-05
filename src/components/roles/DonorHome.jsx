import { useSelector } from "react-redux";
import CreateDonation from "./donor/CreateDonation";
import DonorUpdates from "./donor/DonorUpdates";
import Loader from "../Loader";
import DonorStats from "./donor/DonorStats";

export default function DonorHome() {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold">
          Welcome, {user?.name}
        </h1>
        <div className="md:flex justify-between space-y-5 md:space-y-0">
          <div className="flex flex-col justify-between">
            <CreateDonation />
            <div className="hidden md:flex">
              <DonorStats />
            </div>
          </div>
          <DonorUpdates user={user} />
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

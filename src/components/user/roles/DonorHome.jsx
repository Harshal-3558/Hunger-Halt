import { useSelector } from "react-redux";
import CreateDonation from "./donor/CreateDonation";
import DonorBadge from "./donor/DonorBadge";
import DonorUpdates from "./donor/DonorUpdates";

export default function DonorHome() {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        <div className="md:flex justify-between space-y-2 md:space-y-0">
          <div className="flex flex-col justify-between">
            <CreateDonation />
            <DonorBadge />
          </div>
          <DonorUpdates user={user} />
        </div>
      </div>
    );
  }

  return <div>Error loading user data.</div>;
}

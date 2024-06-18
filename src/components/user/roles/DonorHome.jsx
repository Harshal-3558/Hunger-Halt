import { useSelector } from "react-redux";
import CreateDonation from "./donor/CreateDonation";
import { Link } from "react-router-dom";
import DonorBadge from "./donor/DonorBadge";
import Status from "./donor/Status";
import { useEffect, useState } from "react";

export default function DonorHome() {
  const { user, status } = useSelector((state) => state.auth);
  const [updates, setUpdates] = useState();

  useEffect(() => {
    async function getDonationUpdates() {
      const response = await fetch(
        `${import.meta.env.VITE_HOST}/user/donationStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user?.email,
          }),
        }
      );
      const data = await response.json();
      setUpdates(data);
    }
    getDonationUpdates();
  }, [user]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Welcome, {user?.name}</h1>
        <div className="md:flex justify-between space-y-2 md:space-y-0">
          <div className="flex flex-col justify-between">
            <CreateDonation />
            <DonorBadge />
          </div>
          <div className="h-[300px] md:h-[400px] w-full md:w-[600px] bg-slate-200 border rounded-xl p-4 space-y-4">
            <h1 className="text-2xl font-semibold">
              Your Recent Donation Updates
            </h1>
            {updates &&
              updates.map((item) => (
                <div key={item._id}>
                  <Link to={"/notification"}>
                    <div className="py-2 px-5 bg-white rounded-lg">
                      <div className="font-semibold text-lg">
                        Food Name : {item.foodName}
                      </div>
                      <div className="font-semibold text-lg">
                        Food Quantiy : {item.qty} kg
                      </div>
                      <div className="flex space-x-3">
                        <div className="font-semibold text-lg">
                          Food Quality Status :
                        </div>
                        <Status updates={item.foodQualityStatus} />
                      </div>
                      <div className="flex space-x-3">
                        <div className="font-semibold text-lg">
                          Food Donation Status :
                        </div>
                        <Status updates={item.foodDonationStatus} />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return <div>Error loading user data.</div>;
}

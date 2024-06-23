import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Status from "./Status";

export default function DonorUpdates({ user }) {
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
  return (
    <div className="h-[300px] md:h-[400px] w-full md:w-[600px] bg-slate-200 border rounded-xl p-4 space-y-4 overflow-auto">
      <h1 className="text-2xl font-semibold">Your Recent Donation Updates</h1>
      <div className="space-y-4 overflow-auto"></div>
      {updates &&
        updates.map((item) => (
          <div key={item._id}>
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
          </div>
        ))}
    </div>
  );
}

DonorUpdates.propTypes = {
  user: PropTypes.object,
};

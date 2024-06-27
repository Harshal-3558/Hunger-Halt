import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CompleteDonationButton from "./CompleteDonationButton";

export default function HungerSpotDetails({ user }) {
  const [detail, setDetails] = useState(null);
  async function handleGetDetails() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/getAssignedHungerSpot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      }
    );
    const data = await response.json();
    setDetails(data);
  }
  useEffect(() => {
    handleGetDetails();
  }, []);
  return (
    <div className="h-32 md:h-[260px] w-full md:w-[600px] bg-slate-200 border rounded-xl p-4 space-y-3">
      <h1 className="text-2xl font-semibold">Hunger Spot To Visited</h1>
      {detail && (
        <div className="space-y-10">
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-lg">Assigned Address : </span>
              <span className="text-lg">{detail.address}</span>
            </div>
            <div>
              <span className="font-semibold text-lg">
                No. of beneficiary :{" "}
              </span>
              <span className="text-lg">{detail.totalBeneficiary}</span>
            </div>
          </div>
          <div className="float-end">
            <CompleteDonationButton
              id={detail._id}
              beneficiaryNO={detail.totalBeneficiary}
            />
          </div>
        </div>
      )}
    </div>
  );
}

HungerSpotDetails.propTypes = {
  user: PropTypes.object,
};

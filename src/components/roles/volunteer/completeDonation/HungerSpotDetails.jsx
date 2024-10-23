import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CompleteDonationButton from "./CompleteDonationButton";
import { io } from "socket.io-client";

export default function HungerSpotDetailsParent({ user }) {
  const [detail, setDetails] = useState({});
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });

  async function handleGetDetails() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/volunteer/getAssignedHungerSpot`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("FoodDBChange", () => {
      handleGetDetails();
    });
    return () => {
      socket.off("FoodDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {Object.keys(detail).length !== 0 && (
        <HungerSpotDetails detail={detail} />
      )}
    </div>
  );
}

function HungerSpotDetails({ detail }) {
  return (
    <div className="h-full md:h-full w-full md:w-full bg-slate-200 border rounded-xl p-2 md:p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Hunger Spot To Be Visited</h1>
      <div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-lg">Assigned Address : </span>
              <span className="text-lg text-pretty">{detail.address}</span>
            </div>
            <div>
              <span className="font-semibold text-lg">
                No. of beneficiary :{" "}
              </span>
              <span className="text-lg">{detail.totalBeneficiary}</span>
            </div>
          </div>
          <div>
            <CompleteDonationButton
              id={detail._id}
              beneficiaryNO={detail.totalBeneficiary}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

HungerSpotDetails.propTypes = {
  detail: PropTypes.shape({
    address: PropTypes.string,
    totalBeneficiary: PropTypes.number,
    _id: PropTypes.string,
  }),
};

HungerSpotDetailsParent.propTypes = {
  user: PropTypes.object,
};

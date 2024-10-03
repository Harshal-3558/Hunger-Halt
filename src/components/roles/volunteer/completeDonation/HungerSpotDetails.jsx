import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CompleteDonationButton from "./CompleteDonationButton";
import ViewHPModal from "./ViewHPModal";
import { io } from "socket.io-client";

export default function HungerSpotDetails({ user }) {
  const [detail, setDetails] = useState({});
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });

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
    <div className="h-32 md:h-[260px] w-[170px] md:w-[600px] bg-slate-200 border rounded-xl p-2 md:p-4 space-y-3">
      <h1 className="hidden md:block md:text-2xl font-semibold">
        Hunger Spot To Be Visited
      </h1>
      <div>
        {Object.keys(detail).length !== 0 ? (
          <div>
            <div className="hidden md:block space-y-10">
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-lg">
                    Assigned Address :{" "}
                  </span>
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
            <div className="h-20 flex justify-center items-center md:hidden">
              <ViewHPModal detail={detail} />
            </div>
          </div>
        ) : (
          <div className="md:h-36 h-20 flex flex-col md:flex-row md:space-x-2 justify-center items-center">
            <p className="md:text-lg">Hunger Spot</p>
            <p className="md:text-lg">not assigned yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

HungerSpotDetails.propTypes = {
  user: PropTypes.object,
};

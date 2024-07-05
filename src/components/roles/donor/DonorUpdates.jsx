import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@chakra-ui/react";
import DonationDetails from "./DonationDetails";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

export default function DonorUpdates({ user }) {
  const [updates, setUpdates] = useState([]);
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });

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
    const sortedData = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const recentUpdates = sortedData.slice(0, 2);
    setUpdates(recentUpdates);
  }

  useEffect(() => {
    getDonationUpdates();
    console.log(updates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("FoodDBChange", (change) => {
      console.log("Database change detected:", change);
      getDonationUpdates();
    });

    return () => {
      socket.off("FoodDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-[345px] md:h-[420px] w-full md:w-[600px] bg-slate-200 border rounded-xl p-4 space-y-2 md:space-y-4">
      <h1 className="text-xl md:text-2xl font-semibold">
        Your Recent Donation Updates
      </h1>
      <div className="space-y-2 h-[235px] md:h-[290px] overflow-auto">
        {updates.length != 0 ? (
          updates.map((item) => <DonationDetails key={item._id} item={item} />)
        ) : (
          <div className="h-56 md:h-72 flex justify-center items-center">
            <h1 className="md:text-lg">No updates yet</h1>
          </div>
        )}
      </div>
      {updates.length != 0 && (
        <Link to={"/donorUpdates"} className="flex justify-end">
          <Button colorScheme="blue">View all</Button>
        </Link>
      )}
    </div>
  );
}

DonorUpdates.propTypes = {
  user: PropTypes.object,
};

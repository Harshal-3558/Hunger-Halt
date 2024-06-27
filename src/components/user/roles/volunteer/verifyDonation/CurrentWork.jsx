import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import PropTypes from "prop-types";
import VerifyModal from "./VerifyModal";

export default function CurrentWork({ user }) {
  const [work, setWork] = useState(null);
  const [refresh, setRefresh] = useState(false);

  async function handleData() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/volunteerCurrentWork`,
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
    setWork(data);
  }

  useEffect(() => {
    handleData();
  }, [refresh]);

  return (
    <div>
      {work &&
        work
          .filter((items) => items.foodQualityStatus === "not verified")
          .map((items) => (
            <div key={items._id} className="bg-gray-300 w-full p-2 rounded-lg">
              {" "}
              {/* Ensure key is unique, using items._id */}
              <h1 className="text-2xl font-semibold">Your current work</h1>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">Location to be visited : </span>
                  <span>{items.address}</span>
                </div>
                <div className="space-x-2">
                  <Button
                    colorScheme="blue"
                    leftIcon={<FaLocationDot size={20} />}
                  >
                    Get Directions
                  </Button>
                  <VerifyModal
                    id={items._id}
                    onVerified={() => setRefresh(!refresh)}
                  />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

CurrentWork.propTypes = {
  user: PropTypes.object,
};

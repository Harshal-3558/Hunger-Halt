import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import PropTypes from "prop-types";
import VerifyModal from "./VerifyModal";
import { io } from "socket.io-client";

export default function CurrentWork({ user }) {
  const [work, setWork] = useState(null);
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });

  async function handleData() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/volunteer/volunteerCurrentWork`,
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
    console.log(data);
  }

  useEffect(() => {
    handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("FoodDBChange", () => {
      handleData();
    });
    return () => {
      socket.off("FoodDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {work &&
        work
          .filter((items) => items.foodQualityStatus === "not verified")
          .map((items) => (
            <div key={items._id} className="bg-gray-200 w-full p-3 rounded-lg">
              {" "}
              <h1 className="text-lg md:text-2xl font-semibold">
                Your current work
              </h1>
              <div className="md:flex justify-between items-center space-y-2">
                <div className="text-sm md:text-base md:w-[800px]">
                  <span className="font-medium">Location to be visited : </span>
                  <span>{items.address}</span>
                </div>
                <div className="flex justify-center md:block space-x-2">
                  <Button
                    colorScheme="blue"
                    leftIcon={<FaLocationDot className="text-lg md:text-2xl" />}
                    onClick={() => {
                      const address = encodeURIComponent(items.address); // Encode the address for URL
                      const isMobile = /iPhone|iPad|iPod|Android/i.test(
                        navigator.userAgent
                      );

                      if (isMobile) {
                        // Use geo: URL scheme for mobile devices
                        window.location.href = `geo:0,0?q=${address}`;
                      } else {
                        // Use Google Maps URL for desktop
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${address}`,
                          "_blank"
                        );
                      }
                    }}
                  >
                    Get Directions
                  </Button>

                  <VerifyModal id={items._id} />
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

CurrentWork.propTypes = {
  user: PropTypes.object,
  setFoodID: PropTypes.func,
};

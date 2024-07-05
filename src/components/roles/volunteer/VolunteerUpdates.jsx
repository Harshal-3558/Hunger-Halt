import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import WorkDetailsModal from "./details/WorkDetailsModal";

export default function VolunteerUpdates({ user }) {
  const [updates, setUpdates] = useState([]);
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleData() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/volunteerUpdates`,
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
    const value = await response.json();
    setUpdates(value);
  }

  async function handleSubmit(id, donationID) {
    console.log(id);
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/assignVolunteer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          id,
          donationID,
        }),
      }
    );
    if (response.ok) {
      toast({
        title: "Job is successfully assigned",
        status: "success",
        position: "top",
      });
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        position: "top",
      });
    }
  }

  useEffect(() => {
    handleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("WorkDBChange", () => {
      // console.log("Database change detected:", change);
      handleData();
    });
    return () => {
      socket.off("WorkDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-90 md:h-[450px] w-full md:w-[600px] bg-slate-200 border rounded-xl p-4 space-y-2 overflow-auto">
      <h1 className="text-lg md:text-2xl font-semibold">Your Work Updates</h1>
      {updates.length != 0 ? (
        updates.map((items) => (
          <div
            key={items._id}
            className="p-2 bg-white rounded-lg font-medium text-base space-y-4"
          >
            <div className="space-y-1">
              <div>Donor Name : {items.donorName}</div>
              <div>Donor Address : {items.donorAddress}</div>
            </div>
            <div className="flex space-x-2 justify-end">
              <Button onClick={onOpen}>View Details</Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleSubmit(items._id, items.donationID);
                }}
              >
                Take Job
              </Button>
            </div>
            <WorkDetailsModal
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              donationID={items.donationID}
            />
          </div>
        ))
      ) : (
        <div className="h-[330px] flex justify-center items-center">
          <h1 className="md:text-lg">No updates yet</h1>
        </div>
      )}
    </div>
  );
}

VolunteerUpdates.propTypes = {
  user: PropTypes.object,
};

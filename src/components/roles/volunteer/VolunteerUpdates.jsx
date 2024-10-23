import {
  Button,
  useDisclosure,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { FaListCheck } from "react-icons/fa6";
import WorkDetailsModal from "./details/WorkDetailsModal";

export default function VolunteerUpdates({ user }) {
  const [updates, setUpdates] = useState([]);
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();
  const [selectedDonationID, setSelectedDonationID] = useState();

  async function handleData() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/volunteer/volunteerUpdates`,
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
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/volunteer/assignVolunteer`,
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
      handleData();
    });
    return () => {
      socket.off("WorkDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        onClick={onOpen}
        className="h-32 md:h-36 w-full md:w-full bg-slate-200 border rounded-xl flex flex-col justify-center items-center space-y-3"
      >
        <div className="relative">
          <div className="absolute -top-1 -right-3">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-sky-500"></span>
            </span>
          </div>
          <FaListCheck className="text-[40px]" />
        </div>
        <div>
          <p className="text-base md:text-xl">Work Updates</p>
        </div>
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered={true}>
        <ModalOverlay />
        <ModalContent maxWidth="800px" width="95%">
          <ModalHeader>Work Updates</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-4">
            {updates.length != 0 ? (
              updates.map((items) => (
                <div
                  key={items._id}
                  className="p-2 bg-gray-200 rounded-lg font-medium text-base space-y-4"
                >
                  <div className="space-y-1">
                    <div>Donor Name : {items.donorName}</div>
                    <div>Donor Address : {items.donorAddress}</div>
                  </div>
                  <div className="flex space-x-2 justify-end">
                    <Button
                      colorScheme="teal"
                      onClick={() => {
                        setSelectedDonationID(items.donationID);
                        onDetailsOpen();
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        handleSubmit(items._id, items.donationID);
                      }}
                    >
                      Take Job
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-[330px] flex justify-center items-center">
                <h1 className="md:text-lg">No updates yet</h1>
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <WorkDetailsModal
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
        donationID={selectedDonationID}
      />
    </div>
  );
}

VolunteerUpdates.propTypes = {
  user: PropTypes.object,
};

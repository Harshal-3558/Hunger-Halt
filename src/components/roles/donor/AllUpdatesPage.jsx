import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Status from "./Status";
import {
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
} from "@chakra-ui/react";
import { io } from "socket.io-client";

export default function AllUpdatesPage() {
  const { user } = useSelector((state) => state.auth);
  const [updates, setUpdates] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState();
  const socket = io(`${import.meta.env.VITE_HOST}`, {
    withCredentials: true,
  });

  async function getDonationUpdates() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/donor/donationStatus`,
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
    setUpdates(sortedData);
    console.log(sortedData);
  }
  useEffect(() => {
    getDonationUpdates();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const formatShelfLife = (hours) => {
    const totalSeconds = hours * 3600;
    const h = Math.floor(hours);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);

    return `${h}h ${m}m ${s}s`;
  };

  useEffect(() => {
    socket.on("FoodDBChange", () => {
      getDonationUpdates();
    });
    return () => {
      socket.off("FoodDBChange");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="md:flex md:justify-center">
        <h1 className="text-xl md:text-3xl font-semibold">
          Your recent donations
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="space-y-4">
          {updates &&
            updates.map((item) => (
              <div key={item._id}>
                <div
                  onClick={() => handleOpenModal(item)}
                  className="py-2 px-5 w-[350px] md:w-[600px] bg-gray-100 rounded-lg cursor-pointer text-base md:text-lg"
                >
                  <div className="font-semibold">
                    Food Name : {item.foodName}
                  </div>
                  <div className="font-semibold">
                    Food Quantiy : {item.qty} kg
                  </div>
                  <div className="flex space-x-3">
                    <div className="font-semibold">Food Quality Status :</div>
                    <Status updates={item.foodQualityStatus} />
                  </div>
                  <div className="flex space-x-3">
                    <div className="font-semibold">Food Donation Status :</div>
                    <Status updates={item.foodDonationStatus} />
                  </div>
                  <div className="flex space-x-3">
                    <div className="font-semibold">
                      Food Donation Date : {formatDate(item.createdAt)}
                    </div>
                  </div>
                  {item.remainingShelfLife && (
                    <div className="flex space-x-3">
                      <div className="font-semibold">
                        Remaining Shelf Life :{" "}
                        {formatShelfLife(item.remainingShelfLife)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"} isCentered={true}>
        <ModalOverlay />
        <ModalContent maxWidth="500px" width="95%">
          <ModalHeader>Donation Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="space-y-2 text-base md:text-lg">
            <div>
              <span className="font-semibold">Assigned Volunteer</span> :{" "}
              {selectedItem?.donorName || "Not Assigned yet"}
            </div>
            <div>
              <span className="font-semibold">Volunteer Email</span> :{" "}
              {selectedItem?.donorEmail || "Not Assigned yet"}
            </div>
            <div>
              <span className="font-semibold">Assigned Hunger Spot</span> :{" "}
              {selectedItem?.address || "Not Assigned yet"}
            </div>
            <div>
              <span className="font-semibold">Food Qaulity Status</span> :{" "}
              {selectedItem?.foodQualityStatus || "Not Assigned yet"}
            </div>
            <div>
              <span className="font-semibold">Food Donation Status</span> :{" "}
              {selectedItem?.foodDonationStatus || "Not Assigned yet"}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

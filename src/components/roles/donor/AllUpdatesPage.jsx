import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Status from "./Status";
import { useDisclosure } from "@chakra-ui/react";
import DonationDetailsModal from "./DonationDetailsModal";

export default function AllUpdatesPage() {
  const { user } = useSelector((state) => state.auth);
  const [updates, setUpdates] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUpdates(sortedData);
    }
    getDonationUpdates();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  return (
    <div className="p-4 space-y-4">
      <div className="md:flex md:justify-center">
        <h1 className="text-xl md:text-3xl font-semibold">
          Your recent donations
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="space-y-4 h-[500px] overflow-auto">
          {updates &&
            updates.map((item) => (
              <div key={item._id}>
                <div
                  onClick={onOpen}
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
                </div>
                <DonationDetailsModal
                  isOpen={isOpen}
                  onClose={onClose}
                  item={item}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

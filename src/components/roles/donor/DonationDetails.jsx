import { useDisclosure } from "@chakra-ui/react";
import Status from "./Status";
import PropTypes from "prop-types";
import DonationDetailsModal from "./DonationDetailsModal";

export default function DonationDetails({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div
        onClick={onOpen}
        className="py-2 px-5 bg-white rounded-lg cursor-pointer"
      >
        <div className="font-semibold text-base md:text-lg">
          Food Name : {item.foodName}
        </div>
        <div className="font-semibold text-base md:text-lg">
          Food Quantiy : {item.qty} kg
        </div>
        <div className="flex space-x-3">
          <div className="font-semibold text-base md:text-lg">
            Food Quality Status :
          </div>
          <Status updates={item.foodQualityStatus} />
        </div>
        <div className="flex space-x-3">
          <div className="font-semibold text-base md:text-lg">
            Food Donation Status :
          </div>
          <Status updates={item.foodDonationStatus} />
        </div>
      </div>
      <DonationDetailsModal isOpen={isOpen} onClose={onClose} item={item} />
    </div>
  );
}

DonationDetails.propTypes = {
  item: PropTypes.object,
};

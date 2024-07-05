import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function DonationDetailsModal({ isOpen, onClose, item }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"sm"} isCentered={true}>
      <ModalOverlay />
      <ModalContent maxWidth="500px" width="95%">
        <ModalHeader>Donation Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="space-y-2 text-base md:text-lg">
          <div>
            <span className="font-semibold">Assigned Volunteer</span> :{" "}
            {item.donorName || "Not Assigned yet"}
          </div>
          <div>
            <span className="font-semibold">Volunteer Email</span> :{" "}
            {item.donorEmail || "Not Assigned yet"}
          </div>
          <div>
            <span className="font-semibold">Assigned Hunger Spot</span> :{" "}
            {item.address || "Not Assigned yet"}
          </div>
          <div>
            <span className="font-semibold">Food Qaulity Status</span> :{" "}
            {item.foodQualityStatus || "Not Assigned yet"}
          </div>
          <div>
            <span className="font-semibold">Food Donation Status</span> :{" "}
            {item.foodQualityStatus || "Not Assigned yet"}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

DonationDetailsModal.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

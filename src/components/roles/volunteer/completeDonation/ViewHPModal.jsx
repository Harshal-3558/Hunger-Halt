import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Button, useDisclosure } from "@chakra-ui/react";
import PropTypes from "prop-types";
import CompleteDonationButton from "./CompleteDonationButton";

export default function ViewHPModal({ detail }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>View Assigned HP</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent maxWidth="500px" width="95%">
          <ModalHeader>Hunger Spot Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-base">
                  Assigned Address :{" "}
                </span>
                <span className="text-lg">{detail.address}</span>
              </div>
              <div>
                <span className="font-semibold text-base">
                  No. of beneficiary :{" "}
                </span>
                <span className="text-lg">{detail.totalBeneficiary}</span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <CompleteDonationButton
              close={onClose}
              id={detail._id}
              beneficiaryNO={detail.totalBeneficiary}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

ViewHPModal.propTypes = {
  detail: PropTypes.object,
};

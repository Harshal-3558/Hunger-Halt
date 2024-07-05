import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

export default function CompleteDonationModal({
  isOpen,
  onClose,
  id,
  beneficiaryNO,
}) {
  const [beneficiary, setBeneficiary] = useState(0);
  const toast = useToast();
  async function handleSubmit() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/completeDonation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spotID: id,
          beneficiaryNO,
          beneficiary,
        }),
      }
    );
    if (response.ok) {
      toast({
        title: "Donation Process Completed",
        status: "success",
        position: "top",
      });
      onClose();
    }
  }
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent maxWidth="500px" width="95%">
          <ModalHeader>Complete Donation Process</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>No. of Beneficiary fullfilled</FormLabel>
              <Input
                type="number"
                onChange={(e) => {
                  setBeneficiary(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="green" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

CompleteDonationModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  id: PropTypes.string,
  beneficiaryNO: PropTypes.number,
};

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  useToast,
  FormLabel,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

export default function VerifyModal({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shelfLife, setShelfLife] = useState(0);
  const [beneficiaries, setBeneficiaries] = useState(0);
  const toast = useToast();

  async function handleSubmit() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/verifyFood`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          shelfLife,
          foodQualityStatus: "verified",
          beneficiaries,
        }),
      }
    );
    if (response.ok) {
      toast({
        title: "Verification completed",
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

  return (
    <>
      <Button
        colorScheme="green"
        onClick={onOpen}
        leftIcon={<FaCircleCheck className="text-lg md:text-2xl" />}
      >
        Verify Donation
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="500px" width="95%">
          <ModalHeader>Verify Donation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Shelf Life</FormLabel>
              <Input
                type="number"
                placeholder="in hours"
                onChange={(e) => {
                  setShelfLife(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>No. of beneficiaries can be fullfilled</FormLabel>
              <Input
                type="number"
                onChange={(e) => {
                  setBeneficiaries(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="green">
              Verify Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

VerifyModal.propTypes = {
  id: PropTypes.string,
};

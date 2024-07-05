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
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";

export default function VerifyModal({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shelfLife, setShelfLife] = useState(0);

  async function handleSubmit() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/verifyFood`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, shelfLife, foodQualityStatus: "verified" }),
      }
    );
    if (response.ok) {
      toast.success("Verification completed");
    } else {
      toast.error("Something went wrong");
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
          <ModalHeader>Verify Food Shelf Life</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                type="number"
                onChange={(e) => {
                  setShelfLife(e.target.value);
                }}
                placeholder="e.g 1 hr"
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

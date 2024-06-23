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
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

export default function VerifyModal({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [shelfLife, setShelfLife] = useState(0);
  const [foodQualityStatus, setFoodQualityStatus] = useState("");
  async function handleSubmit() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/verifyFood`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, shelfLife, foodQualityStatus }),
      }
    );
    const data = await response.json();
    console.log(data);
  }
  return (
    <>
      <Button
        colorScheme="green"
        onClick={onOpen}
        leftIcon={<FaCircleCheck size={20} />}
      >
        Proceed for Verification
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Verify Food Quality</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Shelf Life</FormLabel>
              <Input
                type="number"
                onChange={(e) => {
                  setShelfLife(e.target.value);
                }}
                placeholder="in hours"
              />
              <Input
                onChange={(e) => {
                  setFoodQualityStatus(e.target.value);
                }}
                placeholder="in hours"
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

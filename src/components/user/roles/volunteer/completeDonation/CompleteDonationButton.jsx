import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FaCircleCheck, FaLocationDot } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import CompleteDonationModal from "./CompleteDonationModal";

CompleteDonationButton.propTypes = {
  id: PropTypes.string,
  beneficiaryNO: PropTypes.number,
};

export default function CompleteDonationButton({ id, beneficiaryNO }) {
  const [location, setLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    if (!location && navigator.geolocation) {
      // Check if location is not already set
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocation({ longitude, latitude });
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    }
  }, [location]);

  async function handleSubmit() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/checkBeforeDonation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          location,
        }),
      }
    );
    const res = await response.json();
    console.log(res);
    if (res.message) {
      onOpen();
    } else {
      toast({
        title: "Please visit assigned Hunger Spot",
        status: "warning",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <div>
      <div className="space-x-3">
        <Button leftIcon={<FaLocationDot size={20} />} colorScheme="green">
          Get Directions
        </Button>
        <Button
          onClick={handleSubmit}
          leftIcon={<FaCircleCheck size={20} />}
          colorScheme="blue"
        >
          Complete Donation
        </Button>
      </div>
      <CompleteDonationModal
        isOpen={isOpen}
        onClose={onClose}
        beneficiaryNO={beneficiaryNO}
        id={id}
      />
    </div>
  );
}

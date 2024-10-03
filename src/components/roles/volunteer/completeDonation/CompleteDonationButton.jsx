import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FaCircleCheck, FaLocationDot } from "react-icons/fa6";
import PropTypes from "prop-types";
// import { useToast } from "@chakra-ui/react";
import CompleteDonationModal from "./CompleteDonationModal";

CompleteDonationButton.propTypes = {
  id: PropTypes.string,
  beneficiaryNO: PropTypes.number,
  close: PropTypes.func,
};

export default function CompleteDonationButton({ id, beneficiaryNO }) {
  const [location, setLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const toast = useToast();

  useEffect(() => {
    if (!location && navigator.geolocation) {
      // Check if location is not already set
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocation({ longitude, latitude });
          console.log(location)
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit() {
    console.log(location);
    // const response = await fetch(
    //   `${import.meta.env.VITE_HOST}/user/checkBeforeDonation`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       id,
    //       location,
    //     }),
    //   }
    // );
    // const res = await response.json();
    // console.log(res);
    // if (res.message) {
    //   onOpen();
    // } else {
    //   toast({
    //     title: "Please visit assigned Hunger Spot",
    //     status: "warning",
    //     position: "top",
    //     duration: 9000,
    //     isClosable: true,
    //   });
    // }
    onOpen();
  }

  return (
    <div>
      <div className="flex space-x-2 md:space-x-3">
        <Button
          leftIcon={<FaLocationDot className="text-lg md:text-2xl" />}
          colorScheme="green"
        >
          Get Directions
        </Button>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          leftIcon={<FaCircleCheck className="text-lg md:text-2xl" />}
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

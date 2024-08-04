import { Button, useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function SubmitButton({
  location,
  address,
  image,
  onClose,
  beneficiaries,
}) {
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  async function handleFunction() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/createHungerSpot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          location,
          address,
          beneficiaries,
          image,
        }),
      }
    );

    if (response.ok) {
      toast({
        title: "New Hunger Spot Registered",
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
    <div>
      <Button
        onClick={() => {
          handleFunction();
          onClose();
        }}
        colorScheme="blue"
        mr={3}
      >
        Save
      </Button>
    </div>
  );
}

SubmitButton.propTypes = {
  location: PropTypes.object,
  address: PropTypes.string,
  image: PropTypes.string,
  onClose: PropTypes.func,
  beneficiaries: PropTypes.number,
};

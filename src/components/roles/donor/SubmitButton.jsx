import { Button, useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function SubmitButton({
  location,
  address,
  foodName,
  qty,
  shelfLife,
  person,
  onClose,
}) {
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  async function handleFunction() {
    const response = await fetch(
      `${import.meta.env.VITE_HOST}/user/donateFood`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName,
          donorName: user.name,
          donorEmail: user.email,
          beneficiary: person,
          qty,
          shelfLife,
          location,
          address,
        }),
      }
    );

    if (response.ok) {
      toast({
        title: "Your donation created successful",
        description: "Our volunteer will visit to pick up",
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
  foodName: PropTypes.string,
  qty: PropTypes.string,
  shelfLife: PropTypes.string,
  person: PropTypes.string,
  onClose: PropTypes.func,
};

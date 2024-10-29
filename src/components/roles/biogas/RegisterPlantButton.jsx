import { Button, useToast } from "@chakra-ui/react";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";

export default function RegisterPlantButton({
  location,
  orgName,
  phoneno,
  regno,
  onClose,
}) {
  // const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  async function handleFunction() {
    const response = await fetch(`${import.meta.env.VITE_HOST}/biogas/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: orgName,
        phone: phoneno,
        regNo: regno,
        location,
      }),
    });

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
          window.location.href = '/biodash';
        }}
        colorScheme="blue"
        mr={3}
      >
        Save
      </Button>
    </div>  );
}

RegisterPlantButton.propTypes = {
  location: PropTypes.object,
  orgName: PropTypes.string,
  phoneno: PropTypes.number,
  regno: PropTypes.string,
  onClose: PropTypes.func,
};

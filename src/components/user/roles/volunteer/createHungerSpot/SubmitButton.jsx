import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function SubmitButton({
  location,
  address,
  image,
  onClose,
  requiredQTY,
}) {
  const user = useSelector((state) => state.auth.user);

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
          requiredQTY,
          image,
        }),
      }
    );

    if (response.ok) {
      toast.success("New Hunger Spot Registered");
    } else {
      toast.error("Something went wrong");
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
  requiredQTY: PropTypes.number,
};

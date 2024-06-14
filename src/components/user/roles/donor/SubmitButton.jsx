import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function SubmitButton({
  location,
  address,
  foodName,
  qty,
  shelfLife,
  onClose,
}) {
  const user = useSelector((state) => state.auth.user);

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
          qty,
          shelfLife,
          location,
          address,
        }),
      }
    );

    if (response.ok) {
      toast.success("Your food donation added");
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
  location: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  foodName: PropTypes.string.isRequired,
  qty: PropTypes.string.isRequired,
  shelfLife: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

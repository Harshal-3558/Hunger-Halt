import { Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

export default function GoogleButton() {
  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_HOST}/auth/google`; // Replace with your server URL
  };

  return (
    <>
      <Button
        w={"full"}
        size={{ base: "md", md: "lg" }}
        leftIcon={<FaGoogle size={25} />}
        onClick={handleGoogleAuth}
      >
        Sign in with Google
      </Button>
    </>
  );
}
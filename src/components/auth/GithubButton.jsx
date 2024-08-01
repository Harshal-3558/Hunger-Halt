import { Button } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";

export default function GithubButton() {
  const handleGithubAuth = () => {
    window.location.href = "http://localhost:3000/auth/github"; // Replace with your server URL
  };

  return (
    <>
      <Button
        w={"full"}
        size={{ base: "md", md: "lg" }}
        leftIcon={<FaGithub size={25} />}
        onClick={handleGithubAuth}
      >
        Sign in with GitHub
      </Button>
    </>
  );
}

import { Button } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa6";

export default function GithubButton() {
  return (
    <>
      <Button w={"full"} size={{base: "md", md: "lg"}} leftIcon={<FaGithub size={25} />}>
        Sign in with GitHub
      </Button>
    </>
  );
}

import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  return (
    <>
      <Button w={"full"} size={{base: "md", md: "lg"}} leftIcon={<FcGoogle size={25}/>}>
        Sign in with Google
      </Button>
    </>
  );
}

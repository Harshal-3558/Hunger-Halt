import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa6";

export default function EmailInput() {
  return (
    <InputGroup size={{ base: "md", md: "lg" }}>
      <InputLeftElement pointerEvents="none">
        <FaEnvelope className="text-gray-500" />
      </InputLeftElement>
      <Input variant="filled" placeholder="Enter Email" />
    </InputGroup>
  );
}

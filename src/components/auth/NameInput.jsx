import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa6";
import PropTypes from "prop-types";

export default function NameInput({ register, errors }) {
  return (
    <FormControl isInvalid={errors.Name}>
      <InputGroup size={{ base: "md", md: "lg" }}>
        <InputLeftElement pointerEvents="none">
          <FaUser className="text-gray-500" />
        </InputLeftElement>
        <Input
          variant="filled"
          placeholder="Enter Name"
          {...register("Name")}
        />
      </InputGroup>
      <FormErrorMessage>{errors.Name && errors.Name.message}</FormErrorMessage>
    </FormControl>
  );
}

NameInput.propTypes = {
  register: PropTypes.object,
  errors: PropTypes.object,
};

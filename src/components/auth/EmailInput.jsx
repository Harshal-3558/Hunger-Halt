import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa6";
import PropTypes from "prop-types";

export default function EmailInput({ register, errors }) {
  return (
    <FormControl isInvalid={errors.Email}>
      <InputGroup size={{ base: "md", md: "lg" }}>
        <InputLeftElement pointerEvents="none">
          <FaEnvelope className="text-gray-500" />
        </InputLeftElement>
        <Input
          variant="filled"
          placeholder="Enter Email"
          {...register("Email")}
        />
      </InputGroup>
      <FormErrorMessage>
        {errors.Email && errors.Email.message}
      </FormErrorMessage>
    </FormControl>
  );
}

EmailInput.propTypes = {
  register: PropTypes.object,
  errors: PropTypes.object,
};

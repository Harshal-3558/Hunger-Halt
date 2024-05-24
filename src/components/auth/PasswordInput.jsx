import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { FaLock } from "react-icons/fa6";
import PropTypes from "prop-types";

export default function PasswordInput({ register, errors }) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={errors.Password}>
      <InputGroup size={{ base: "md", md: "lg" }}>
        <InputLeftElement pointerEvents="none">
          <FaLock className="text-gray-500" />
        </InputLeftElement>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter Password"
          variant="filled"
          {...register("Password")}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>
        {errors.Password && errors.Password.message}
      </FormErrorMessage>
    </FormControl>
  );
}

PasswordInput.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
};

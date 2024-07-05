/* eslint-disable react/prop-types */
import {
  Box,
  HStack,
  useRadio,
  useRadioGroup,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaBuildingNgo,
  FaHandHoldingHeart,
  FaHandshakeAngle,
} from "react-icons/fa6";
import PropTypes from "prop-types";

function RadioBlock(props) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" width={useBreakpointValue({ base: "100%", md: "auto" })}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        px={7}
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Icon as={props.icon} boxSize={5} mr={2} />
        {props.children}
      </Box>
    </Box>
  );
}

export default function RadioCard({ setRole }) {
  const options = [
    { value: "donor", icon: FaHandHoldingHeart },
    { value: "volunteer", icon: FaHandshakeAngle },
    { value: "ngo", icon: FaBuildingNgo },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "donor",
    onChange: (value) => {
      setRole(value);
    },
  });

  const group = getRootProps();

  return (
    <HStack
      {...group}
      flexDirection={useBreakpointValue({ base: "column", md: "row" })}
      spacing={4}
    >
      {options.map((option) => {
        const radio = getRadioProps({ value: option.value });
        return (
          <RadioBlock key={option.value} {...radio} icon={option.icon}>
            {option.value}
          </RadioBlock>
        );
      })}
    </HStack>
  );
}

RadioCard.propTypes = {
  setRole: PropTypes.func.isRequired,
};

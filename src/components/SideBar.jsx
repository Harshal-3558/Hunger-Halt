import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaGear, FaHandHoldingHeart, FaHouse, FaRightFromBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <FaBars size={20} ref={btnRef} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Explore Hunger Halt</DrawerHeader>
          <DrawerBody>
            <Button
              as={Link}
              to="/"
              w="full"
              justifyContent="left"
              leftIcon={<FaHouse size={20} />}
              marginBottom={2}
              onClick={onClose}
            >
              Home
            </Button>
            <Button
              as={Link}
              to="/"
              w="full"
              justifyContent="left"
              leftIcon={<FaGear size={20} />}
              marginBottom={2}
              onClick={onClose}
            >
              Account Settings
            </Button>
            <Button
              as={Link}
              to="/"
              w="full"
              justifyContent="left"
              leftIcon={<FaHandHoldingHeart size={20} />}
              marginBottom={2}
              onClick={onClose}
            >
              Your Donations
            </Button>
            <Button
              as={Link}
              to="/logout"
              w="full"
              justifyContent="left"
              leftIcon={<FaRightFromBracket size={20} />}
              marginBottom={2}
              onClick={onClose}
            >
              Logout
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

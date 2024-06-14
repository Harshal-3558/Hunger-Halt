import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import {
  FaBars,
  FaGear,
  FaHandHoldingHeart,
  FaHouse,
  FaRightFromBracket,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef()

  return (
    <>
      <FaBars size={25} ref={btnRef} onClick={onOpen} />
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
        </DrawerContent>
      </Drawer>
    </>
  );
}

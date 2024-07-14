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
  FaChartSimple,
  FaClockRotateLeft,
  FaGear,
  FaHouse,
  FaRightFromBracket,
} from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.auth.user);
  const btnRef = useRef();
  const location = useLocation();

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

            {!user && (
              <Button
                as={Link}
                to="/profile"
                w="full"
                justifyContent="left"
                leftIcon={<FaGear size={20} />}
                marginBottom={2}
                onClick={onClose}
              >
                Profile Settings
              </Button>
            )}

            {user && (
              <Button
                as={Link}
                to="/profile"
                w="full"
                justifyContent="left"
                leftIcon={<FaGear size={20} />}
                marginBottom={2}
                onClick={onClose}
              >
                Profile Settings
              </Button>
            )}

            {user?.role === "donor" && location.pathname === "/donor" && (
              <div>
                <Button
                  as={Link}
                  to="/donationHistory"
                  w="full"
                  justifyContent="left"
                  leftIcon={<FaClockRotateLeft size={20} />}
                  marginBottom={2}
                  onClick={onClose}
                >
                  Donations History
                </Button>
                <Button
                  as={Link}
                  to="/donationHistory"
                  w="full"
                  justifyContent="left"
                  leftIcon={<FaChartSimple size={20} />}
                  marginBottom={2}
                  onClick={onClose}
                >
                  Donations Stats
                </Button>
              </div>
            )}

            {user?.role === "volunteer" &&
              location.pathname === "/volunteer" && (
                <div>
                  <Button
                    as={Link}
                    to="/donationHistory"
                    w="full"
                    justifyContent="left"
                    leftIcon={<FaChartSimple size={20} />}
                    marginBottom={2}
                    onClick={onClose}
                  >
                    Your Contributions
                  </Button>
                </div>
              )}

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

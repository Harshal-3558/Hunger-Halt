import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRightToBracket } from "react-icons/fa6";
import SideBar from "./SideBar";
import NavbarMenu from "./NavbarMenu";
export default function Navbar() {
  return (
    <>
      <div className="flex justify-between bg-white items-center shadow-xl p-3 z-50 sticky top-0">
        {/* SideBar */}
        <div className="md:hidden">
          <SideBar />
        </div>

        {/* Brand Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          Hunger Halt
        </h1>

        {/* Navigation Links */}
        <div className="space-x-5 items-center hidden md:flex">
          <div className="space-x-5 font-semibold">
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              Home
            </Link>
            <Link
              to={"/login"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              About Us
            </Link>
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              Contact Us
            </Link>
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              Services
            </Link>
          </div>
          {/* Login Button */}
          <div className="hidden md:block">
            <Button
              rightIcon={<FaRightToBracket size={20} />}
              colorScheme="teal"
              variant="solid"
            >
              Login
            </Button>
          </div>
        </div>

        <div className="md:hidden">
          <NavbarMenu />
        </div>
      </div>
    </>
  );
}

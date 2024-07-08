import { Button, IconButton, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import SideBar from "./navbar/SideBar";
import NavbarMenu from "./navbar/NavbarMenu";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <div className="flex justify-between bg-white items-center shadow-xl p-3 z-50 sticky top-0">
        {/* SideBar */}
        <div className="md:hidden">
          <SideBar />
        </div>

        {/* Brand Logo */}
        <div className="flex items-center justify-center space-x-2">
          <Image height={"30px"} src="/hunger1.png" alt="Dan Abramov" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
            Hunger Halt
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="space-x-5 items-center flex">
          <div className="space-x-5 font-semibold hidden md:flex">
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              Home
            </Link>
            <Link
              to={"/"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              About Us
            </Link>
            <Link
              to={"/notification"}
              className="hover:text-teal-500 transition ease-in duration-200"
            >
              Our Team
            </Link>
          </div>

          {/* Login Button & Avatar */}
          <div>
            {user ? (
              <div>
                <NavbarMenu />
              </div>
            ) : (
              <div>
                <Link className="hidden md:block" to="/login">
                  <Button
                    rightIcon={<FaHeart size={20} />}
                    colorScheme="teal"
                    variant="solid"
                  >
                    Donate Now
                  </Button>
                </Link>
                <Link className="md:hidden" to="/login">
                  <IconButton
                    icon={<FaHeart size={20} />}
                    colorScheme="teal"
                    variant="solid"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

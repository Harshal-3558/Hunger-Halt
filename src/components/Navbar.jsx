import { Button, IconButton, Image } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaCircleRight, FaDisplay } from "react-icons/fa6";
import SideBar from "./navbar/SideBar";
import NavbarMenu from "./navbar/NavbarMenu";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
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
          {location.pathname === "/" && (
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
          )}

          {user?.role === "donor" && location.pathname === "/donor" && (
            <div className="space-x-5 font-semibold hidden md:flex">
              <Link
                to={"/"}
                className="hover:text-teal-500 transition ease-in duration-200"
              >
                Home
              </Link>
              <Link
                to={"/donationHistory"}
                className="hover:text-teal-500 transition ease-in duration-200"
              >
                Donation History
              </Link>
              <Link
                to={"/notification"}
                className="hover:text-teal-500 transition ease-in duration-200"
              >
                Donation Stats
              </Link>
            </div>
          )}

          {user?.role === "volunteer" && location.pathname === "/volunteer" && (
            <div className="space-x-5 font-semibold hidden md:flex">
              <Link
                to={"/"}
                className="hover:text-teal-500 transition ease-in duration-200"
              >
                Home
              </Link>
              <Link
                to={"/donationHistory"}
                className="hover:text-teal-500 transition ease-in duration-200"
              >
                Your Contributions
              </Link>
            </div>
          )}

          {user && location.pathname === "/" && (
            <div>
              <div className="hidden md:block">
                <Button
                  as={Link}
                  to={`/${user?.role}`}
                  rightIcon={<FaDisplay size={20} />}
                  colorScheme="teal"
                  variant="solid"
                >
                  Dashboard
                </Button>
              </div>
              <div className="md:hidden">
                <IconButton
                  as={Link}
                  to={`/${user?.role}`}
                  icon={<FaDisplay size={20} />}
                  colorScheme="teal"
                  variant="solid"
                />
              </div>
            </div>
          )}

          {!user && location.pathname === "/" && (
            <div>
              <div className="hidden md:block">
                <Button
                  as={Link}
                  to="/signup"
                  rightIcon={<FaCircleRight size={20} />}
                  colorScheme="teal"
                  variant="solid"
                >
                  Join Us Now
                </Button>
              </div>
              <div className="md:hidden">
                <IconButton
                  as={Link}
                  to="/login"
                  icon={<FaCircleRight size={20} />}
                  colorScheme="teal"
                  variant="solid"
                />
              </div>
            </div>
          )}

          {(location.pathname === "/donor" ||
            location.pathname === "/ngo" ||
            location.pathname === "/volunteer") && <NavbarMenu />}
        </div>
      </div>
    </>
  );
}

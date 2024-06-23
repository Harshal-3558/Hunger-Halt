import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { FaRightFromBracket, FaUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAuthStatus } from "../../reduxStore/auth/authSlice";

export default function NavbarMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit() {
    const response = await fetch(`${import.meta.env.VITE_HOST}/auth/logout`, {
      method: "POST",
      credentials: "include", // Include cookies in the request
    });
    if (response.ok) {
      toast.success("Successfully logged out");
      dispatch(fetchAuthStatus());
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error("Something went wrong");
    }
  }
  return (
    <Menu>
      <MenuButton
        as={Avatar}
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
        size="sm"
        cursor={"pointer"}
      ></MenuButton>
      <MenuList>
        <MenuItem icon={<FaUser size={17} />}>My Profile</MenuItem>
        <MenuItem onClick={onSubmit} icon={<FaRightFromBracket size={17} />}>
          logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa6";

export default function NavbarMenu() {
  return (
    <Menu>
      <MenuButton
        as={Avatar}
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
        size="sm"
      ></MenuButton>
      <MenuList>
        <MenuItem icon={<FaUser size={17} />}>My Account</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}

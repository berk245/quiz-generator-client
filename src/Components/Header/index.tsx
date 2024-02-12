import "./header.css";
import Flex from "../../Ui/Flex";
import NavbarLink from "./NavbarLink";
import { Button } from "@mui/material";
import { SignOut } from "../../Api/auth";
import ResponsiveAppBar from "./LogoAppBar";

function Header() {
  return (
    <Flex dir="row" className="header-container">
      <ResponsiveAppBar></ResponsiveAppBar>
    </Flex>
  );
}

export default Header;

import "./header.css";
import Flex from "../../Ui/Flex";
import NavbarLink from "./NavbarLink";
import { Button } from "@mui/material";
import { SignOut } from "../../Api/auth";

function Header() {
  return (
    <Flex
      dir="row"
      className="header-container flex-items-center flex-justify-space-between"
    >
      <Flex dir="row" className="header-left-section flex-items-center">
        <HeaderNavbar />
      </Flex>

      <div className="signout-section">
        <Button variant="outlined" size="small" onClick={SignOut}>
          Sign Out
        </Button>
      </div>
    </Flex>
  );
}

export default Header;

const HeaderNavbar = () => {
  return (
    <Flex dir="row" className="navbar-links-container">
      <NavbarLink to="/dashboard">Dashboard</NavbarLink>
      <NavbarLink to="/quizzes">Quizzes</NavbarLink>
    </Flex>
  );
};

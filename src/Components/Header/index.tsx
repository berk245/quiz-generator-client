import "./header.css";
import Flex from "../../Ui/Flex";
import ResponsiveAppBar from "./LogoAppBar";

function Header() {
  return (
    <Flex dir="row" className="header-container">
      <ResponsiveAppBar></ResponsiveAppBar>
    </Flex>
  );
}

export default Header;

import { PropsWithChildren } from "react";

import { Link } from "@mui/material";
import { useLocation } from "react-router-dom";

interface NavbarLinkProps extends PropsWithChildren {
  to: string;
}
const NavbarLink = ({ to, children }: NavbarLinkProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = () => {
    return currentPath === to;
  };

  const linkClass = `navbar-link ${isActive() ? "active-link" : ""}`;

  return (
    <Link
      underline="hover"
      className={linkClass}
      href={to}
      aria-label={`Link to ${to} page`}
    >
      {children}
    </Link>
  );
};

export default NavbarLink;

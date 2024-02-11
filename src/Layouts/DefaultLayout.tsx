import { PropsWithChildren } from "react";
import Header from "../Components/Header";
import "./layouts.css";

interface DefaultLayoutProps {
  className?: string;
}

function DefaultLayout({
  className,
  ...props
}: PropsWithChildren<DefaultLayoutProps>) {
  return (
    <div className="layout-default">
      <Header />
      <main
        className={`view-content-container ${className ?? ""}`}
        {...props}
      />
    </div>
  );
}

export default DefaultLayout;

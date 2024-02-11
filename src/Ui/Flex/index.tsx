import { PropsWithChildren, forwardRef } from "react";
import "./flex.css";

interface FlexProps extends PropsWithChildren {
  dir?: "row" | "column";
  className?: string;
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { dir, className, ...props },
  ref
) {
  const directionClassName = dir ? `flex-dir-${dir}` : "";
  return (
    <div
      className={`flex ${directionClassName} ${className ?? ""}`}
      ref={ref}
      {...props}
    />
  );
});

export default Flex;

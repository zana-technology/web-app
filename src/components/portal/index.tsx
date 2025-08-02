import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
  isPositioned?: boolean; // Add this prop to control visibility
}

export const Portal = ({ children, isOpen, isPositioned = true }: PortalProps) => {
  if (!isOpen) return null;

  // Add a wrapper with a data attribute to mark portal contents
  return ReactDOM.createPortal(
    <div
      data-portal="true"
      style={{
        position: "relative",
        // Hide until properly positioned to prevent flash
        visibility: isPositioned ? "visible" : "hidden",
      }}
    >
      {children}
    </div>,
    document.body
  ) as React.ReactNode;
};

export default Portal;

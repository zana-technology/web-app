import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
}

export const Portal = ({ children, isOpen }: PortalProps) => {
  if (!isOpen) return null;

  // Add a wrapper with a data attribute to mark portal contents
  return ReactDOM.createPortal(
    <div data-portal="true" style={{ position: "relative" }}>
      {children}
    </div>,
    document.body
  ) as React.ReactNode;
};

export default Portal;

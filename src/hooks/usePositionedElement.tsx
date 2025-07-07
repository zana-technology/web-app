import { useEffect, useRef, useState } from "react";

interface PositionedElementOptions {
  triggerId: string;
  isOpen: boolean;
  onClose?: () => void;
  topOffset?: number;
  rightOffset?: number;
}

interface PositionedElementResult {
  elementRef: React.RefObject<HTMLDivElement | null>;
  position: {
    top: number;
    right: number;
    width?: number | string;
  };
  positionAbove: boolean;
}

export const usePositionedElement = ({
  triggerId,
  isOpen,
  onClose,
  topOffset = 0,
  rightOffset = 0,
}: PositionedElementOptions): PositionedElementResult => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [positionAbove, setPositionAbove] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    right: number;
    width?: number | string;
  }>({ top: 0, right: 0 });

  // Calculate and set position when opened
  useEffect(() => {
    if (isOpen) {
      const trigger = document.getElementById(triggerId);

      if (trigger) {
        const triggerRect = trigger.getBoundingClientRect();
        const containerElement = trigger.parentElement as HTMLElement;
        const width = containerElement?.offsetWidth || "auto";

        setTimeout(() => {
          if (elementRef.current) {
            const elementHeight = elementRef.current.offsetHeight;
            const windowHeight = window.innerHeight;
            const spaceBelow = windowHeight - triggerRect.bottom;

            if (spaceBelow < elementHeight + 10) {
              // Position above the trigger
              setPositionAbove(true);
              setPosition({
                top: triggerRect.top - elementHeight - topOffset * 16,
                right: window.innerWidth - triggerRect.right + rightOffset,
                width,
              });
            } else {
              // Position below the trigger
              setPositionAbove(false);
              setPosition({
                top: triggerRect.bottom + topOffset * 16,
                right: window.innerWidth - triggerRect.right + rightOffset,
                width,
              });
            }
          }
        }, 0);
      }
    }
  }, [isOpen, triggerId, topOffset, rightOffset]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && elementRef.current) {
        const trigger = document.getElementById(triggerId);

        if (trigger) {
          const triggerRect = trigger.getBoundingClientRect();
          const containerElement = trigger.parentElement as HTMLElement;
          const width = containerElement?.offsetWidth || "auto";
          const elementHeight = elementRef.current.offsetHeight;

          if (positionAbove) {
            setPosition({
              top: triggerRect.top - elementHeight - topOffset * 16,
              right: window.innerWidth - triggerRect.right + rightOffset,
              width,
            });
          } else {
            setPosition({
              top: triggerRect.bottom + topOffset * 16,
              right: window.innerWidth - triggerRect.right + rightOffset,
              width,
            });
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, triggerId, positionAbove, topOffset, rightOffset]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInsideAnyPortal = event.composedPath().some((element) => {
        if (element instanceof HTMLElement) {
          return element.closest('[data-portal="true"]');
        }
        return false;
      });

      if (
        !isInsideAnyPortal &&
        elementRef.current &&
        !elementRef.current.contains(event.target as Node) &&
        onClose
      ) {
        onClose();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return {
    elementRef,
    position,
    positionAbove,
  };
};

export default usePositionedElement;

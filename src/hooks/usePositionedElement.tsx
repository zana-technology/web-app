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
  isPositioned: boolean; // Add this to track positioning state
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
  const [isPositioned, setIsPositioned] = useState(false); // Track if positioned
  const [position, setPosition] = useState<{
    top: number;
    right: number;
    width?: number | string;
  }>({ top: 0, right: 0 });

  // Function to calculate position
  const calculatePosition = () => {
    const trigger = document.getElementById(triggerId);

    if (trigger && elementRef.current) {
      const triggerRect = trigger.getBoundingClientRect();
      const containerElement = trigger.parentElement as HTMLElement;
      const width = containerElement?.offsetWidth || "auto";
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

      setIsPositioned(true); // Mark as positioned
    }
  };

  // Calculate and set position when opened
  useEffect(() => {
    if (isOpen) {
      setIsPositioned(false); // Reset positioning state

      // Position immediately without delay for better responsiveness
      calculatePosition();
    } else {
      setIsPositioned(false);
    }
  }, [isOpen, triggerId, topOffset, rightOffset]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && elementRef.current) {
        calculatePosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, triggerId, positionAbove, topOffset, rightOffset]);

  // Handle scroll events to close dropdown when trigger goes out of view
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      // Use requestAnimationFrame to throttle scroll events for better performance
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        if (isOpen && onClose) {
          const trigger = document.getElementById(triggerId);
          if (trigger) {
            const triggerRect = trigger.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Close if trigger is completely out of view
            if (triggerRect.bottom < 0 || triggerRect.top > windowHeight) {
              onClose();
            } else {
              // Recalculate position if still visible
              calculatePosition();
            }
          }
        }
      });
    };

    if (isOpen) {
      // Listen to scroll on window and all scrollable ancestors
      window.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, triggerId, onClose]);

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
    isPositioned, // Return positioning state
  };
};

export default usePositionedElement;

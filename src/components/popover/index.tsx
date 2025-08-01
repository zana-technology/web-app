import { usePositionedElement } from "@/hooks";
import Portal from "../portal";
import { Action } from "@/types";

type PopoverProps<T> = {
  openPopover: boolean;
  closePopover: () => void;
  content: Action<T>[];
  row?: T;
  topOffset?: number;
  rightOffset?: number;
  buttonId?: string;
};

const Popover = <T,>({
  openPopover,
  content,
  closePopover,
  row,
  topOffset = 0,
  rightOffset = 0,
  buttonId = "popover-trigger",
}: PopoverProps<T>) => {
  // Using our custom hook with all the improvements
  const { elementRef, position, isPositioned } = usePositionedElement({
    triggerId: buttonId,
    isOpen: openPopover,
    onClose: closePopover,
    topOffset,
    rightOffset,
  });

  const handleItemClick = (item: Action<T>, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      item.onClick(row);
    } catch (error) {
      console.error("Error executing popover action:", error);
    } finally {
      // Always close popover, even if action fails
      closePopover();
    }
  };

  return (
    <Portal isOpen={openPopover} isPositioned={isPositioned}>
      <div
        ref={elementRef}
        className="fixed z-10 flex flex-col bg-white border border-zana-grey-300 shadow-[0px_2px_2px_rgba(0,0,0,0.03)] rounded-lg whitespace-nowrap min-w-[12.5rem] text-sm"
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        {content.map((item, i) => (
          <div
            key={item.title || i} // Better key using title when available
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={(e) => handleItemClick(item, e)}
            className={`
              px-3.5 py-2.5 cursor-pointer flex gap-2 items-center
              hover:text-zana-primary-normal hover:bg-gray-50 transition-colors
              ${i === 0 ? "hover:rounded-t-lg" : ""}
              ${i === content.length - 1 ? "hover:rounded-b-lg" : ""}
              ${item.disabled ? "opacity-50 cursor-not-allowed hover:text-inherit hover:bg-transparent" : ""}
            `}
            style={{
              pointerEvents: item.disabled ? "none" : "auto",
            }}
          >
            {item?.icon ? (
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                {typeof item.icon === "string" ? (
                  <img
                    src={item.icon}
                    alt={`${item.title} icon`}
                    className="w-5 h-5 object-contain"
                  />
                ) : (
                  item.icon
                )}
              </div>
            ) : null}
            <p className="flex-1 truncate">{item.title}</p>
          </div>
        ))}
      </div>
    </Portal>
  );
};

export default Popover;

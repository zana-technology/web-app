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
  // Using our custom hook instead of repeating the positioning logic
  const { elementRef, position } = usePositionedElement({
    triggerId: buttonId,
    isOpen: openPopover,
    onClose: closePopover,
    topOffset,
    rightOffset,
  });

  return (
    <Portal isOpen={openPopover}>
      <div
        ref={elementRef}
        className="fixed z-10 flex flex-col bg-white border border-zana-grey-300 shadow-[0px_2px_2px_rgba(0,0,0,0.03)] rounded-lg whitespace-nowrap min-w-[12.5rem] text-sm"
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {content.map((item, i) => (
          <div
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick(row);
              closePopover();
            }}
            className={`
              px-3.5 py-2.5 cursor-pointer flex gap-2
               hover:text-zana-primary-normal
              ${i === 0 ? "hover:rounded-t-lg" : ""}
              ${i === content.length - 1 ? "hover:rounded-b-lg" : ""}
            `}
          >
            {item?.icon ? (
              typeof item.icon === "string" ? (
                <img src={item.icon} alt="icon" className="w-5" />
              ) : (
                item.icon
              )
            ) : null}{" "}
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </Portal>
  );
};

export default Popover;

import { Option } from "@/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const TabMenu = ({
  menu,
  onClick,
}: {
  menu: Option[];
  onClick?: (key: string, index?: number) => void;
}) => {
  const [searchParams] = useSearchParams();

  const currentTab = searchParams.get("tab") ?? menu[0]?.value;
  const navigate = useNavigate();

  console.log("currentTab", currentTab);

  const switchTab = (key: string, index: number) => {
    const url = new URL(window.location.href);

    const fullPath = `${url.pathname}?tab=${key}`;

    if (onClick) {
      onClick(key, index);
    }

    return navigate(fullPath);
  };

  return (
    <div className="flex h-10 overflow-x-scroll">
      {menu?.map((x, i) => (
        <div
          key={i}
          onClick={() => {
            switchTab(x?.value, i);
          }}
          className={twMerge(
            "text-dark-400 px-3 py-2 text-sm cursor-pointer hover:text-zana-primary-normal whitespace-nowrap",
            currentTab === x?.value
              ? "text-zana-primary-normal bg-zana-primary-light rounded-lg"
              : ""
          )}
        >
          {x?.label}
        </div>
      ))}
    </div>
  );
};

export default TabMenu;

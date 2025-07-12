import { twMerge } from "tailwind-merge";
import { RiExpandUpDownLine } from "react-icons/ri";
import { avatar } from "@/assets";

const SidebarBottom = () => {
  const creditsLeft = 100;
  const creditsBought = 200;

  const percentageLeft = (creditsLeft / creditsBought) * 100;
  return (
    <div className="mb-4 flex flex-col items-center">
      <div className="w-full border border-zana-grey-300 p-4 flex flex-col gap-3 mb-6 rounded-xl">
        <div className="flex justify-between items-center">
          <p className="font-semibold">Job count</p>
          <p className="text-zana-grey-700">
            {creditsLeft}/{creditsBought}
          </p>
        </div>
        <div className="h-2 rounded w-full bg-diagonal-stripes">
          <div
            style={{ width: `${percentageLeft}%` }}
            className={twMerge(
              "h-2 bg-zana-primary-normal",
              percentageLeft < 100 ? "rounded-l" : "rounded"
            )}
          ></div>
        </div>
      </div>

      <div className="w-full border border-zana-grey-300 p-4 flex gap-2 justify-between mb-5 rounded-xl bg-zana-grey-500">
        <div className="flex gap-2">
          <div className="border border-zana-grey-300 rounded-full p-[5px]">
            <img
              src={avatar}
              alt="Zana Avatar"
              className="w-[30px] h-[30px] object-cover rounded-full grayscale"
            />
          </div>
          <div className="text-sm">
            <p className="text-dark-900 font-medium">User Name</p>
            <p className="text-dark-400">User Email</p>
          </div>
        </div>
        <RiExpandUpDownLine size={24} className="text-zana-grey-400 cursor-pointer" />
      </div>

      <p className="text-xs text-zana-grey-600">&copy; 2025 Zana, Inc. v.1.02</p>
    </div>
  );
};

export default SidebarBottom;

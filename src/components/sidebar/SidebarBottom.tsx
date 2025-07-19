import { twMerge } from "tailwind-merge";
import { RiExpandUpDownLine } from "react-icons/ri";
import { avatar } from "@/assets";
import { profileApi } from "@/libs";
import { useMemo, useState } from "react";
import SidebarExtraMenu from "./SidebarExtraMenu";

const SidebarBottom = () => {
  const creditsLeft = 100;
  const creditsBought = 200;

  const percentageLeft = (creditsLeft / creditsBought) * 100;

  const { data } = profileApi.useGetProfile();

  const user = useMemo(() => {
    if (data?.success) {
      const profile = data?.data;

      const user = {
        name: profile?.full_name,
        email: profile?.platform_email,
        avatar: profile?.avatar_url,
      };

      return user;
    }
  }, [data]);

  const [showExtra, setShowExtra] = useState(false);

  const trimmedEmail = (email: string) => {
    if (email.length > 25) {
      return `${email.slice(0, 6)}...${email.slice(-12)}`;
    }
    return email;
  };

  return (
    <div
      className="mb-4 flex flex-col items-center relative"
      onClick={() => {
        setShowExtra(!showExtra);
      }}
    >
      {showExtra && <SidebarExtraMenu setShowExtra={setShowExtra} />}
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
          <div className="border border-zana-grey-300 rounded-full p-[5px]w-[35px] h-[35px] flex-shrink-0">
            <img
              src={user?.avatar ?? avatar}
              alt="Zana Avatar"
              className="w-[30px] h-[30px] object-cover rounded-full grayscale"
            />
          </div>
          <div className="text-sm">
            <p className="text-dark-900 font-medium">{user?.name}</p>
            <p className="text-dark-400">{trimmedEmail(user?.email as string)}</p>
          </div>
        </div>
        <RiExpandUpDownLine size={24} className="text-zana-grey-400 cursor-pointer" />
      </div>

      <p className="text-xs text-zana-grey-600">&copy; 2025 Zana, Inc. v.1.02</p>
    </div>
  );
};

export default SidebarBottom;

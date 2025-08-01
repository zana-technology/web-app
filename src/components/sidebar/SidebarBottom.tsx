import { twMerge } from "tailwind-merge";
import { RiExpandUpDownLine } from "react-icons/ri";
import { avatar } from "@/assets";
import { jobsApi, profileApi } from "@/libs";
import { useMemo, useState } from "react";
import SidebarExtraMenu from "./SidebarExtraMenu";
import { CreditInfo } from "@/types";
import { Button } from "../button";
import { useNavigate } from "react-router-dom";
import { routes } from "@/router";
import ProgressBar from "./ProgressBar";

const SidebarBottom = () => {
  const { data } = profileApi.useGetProfile();

  const { data: creditData } = jobsApi.useGetJobCredit();

  const creditInfo = useMemo(() => {
    if (creditData?.success) {
      return creditData?.data;
    }
  }, [creditData?.data, creditData?.success]) as CreditInfo;

  const creditsLeft = creditInfo?.credits_used ?? 0;
  const creditsBought = creditInfo?.credits_purchased ?? 0;

  const percentageLeft = (creditsLeft / creditsBought) * 100;

  const user = useMemo(() => {
    if (data?.success) {
      const profile = data?.data;

      const user = {
        name: profile?.full_name,
        email: profile?.email,
        avatar: profile?.avatar_url,
      };

      return user;
    }
  }, [data]);

  const [showExtra, setShowExtra] = useState(false);

  const trimmedEmail = (email: string) => {
    if (email?.length > 18) {
      return `${email.slice(0, 6)}...${email.slice(-12)}`;
    }
    return email ?? "";
  };

  const navigate = useNavigate();

  return (
    <div
      className="mb-4 flex flex-col items-center relative"
      onClick={() => {
        setShowExtra(!showExtra);
      }}
    >
      {showExtra && <SidebarExtraMenu setShowExtra={setShowExtra} />}
      <div className="w-full border border-zana-grey-300 p-4 flex flex-col gap-3 mb-6 rounded-xl">
        <div className="flex justify-between items-center text-sm">
          <p className="font-semibold">Auto Apply Credits</p>
          <p className="text-zana-grey-700">
            {creditsLeft}/{creditsBought}
          </p>
        </div>
        <ProgressBar percentagWidth={percentageLeft} />
        {creditsBought === 0 && (
          <Button
            title="Subscribe"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              navigate(`${routes.app.settings}?tab=billing`);
            }}
          />
        )}
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

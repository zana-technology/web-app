import { constant, profileApi } from "@/libs";
import { useMemo } from "react";

export const useProfilePreview = () => {
  const { isLoading, data } = profileApi.useGetProfile();

  const profile = useMemo(() => {
    if (data?.success) {
      return data?.data;
    }
  }, [data?.data, data?.success]);

  const personalInformation = useMemo(() => {
    if (profile?.uid) {
      return [
        {
          label: "Full Name",
          value: profile?.full_name,
        },
        {
          label: "Email Address",
          value: profile?.platform_email ?? constant.notAdded,
        },
        {
          label: "Phone Number",
          value: profile?.phone_number ?? constant.notAdded,
        },
        {
          label: "Location",
          value: profile?.current_location ?? constant.notAdded,
        },
        {
          label: "LinkedIn",
          value: profile?.linkedin_url ?? constant.notAdded,
        },
        {
          label: "Portfolio",
          value: profile?.portfolio_url ?? constant.notAdded,
        },
      ];
    }

    return [];
  }, []);

  console.log("profile", profile);
  return { isLoading, profile, personalInformation };
};

export default useProfilePreview;

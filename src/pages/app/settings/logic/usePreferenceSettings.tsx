import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { profileApi, refreshQuery, removeEmptyKeys } from "@/libs";
import { OnboardingProfileFormValues, SettingsPreference } from "@/types";
import { apiQueryKeys } from "@/libs/api/config";

export const usePreferenceSettings = () => {
  const { isLoading, data } = profileApi.useGetProfile();

  const profile = useMemo(() => {
    if (data?.success) {
      return data?.data;
    }
  }, [data?.data, data?.success]);

  const initialValues: SettingsPreference = useMemo(() => {
    return {
      auto_apply_enabled: profile?.auto_apply_enabled ?? true,
      preferred_employment_types: profile?.preferred_employment_types ?? [],
      preferred_work_regions: profile?.preferred_work_regions ?? [],
      visa_regions: profile?.visa_regions ?? [],
    };
  }, [profile]);

  const validationSchema = yup.object().shape({
    auto_apply_enabled: yup.boolean().required("Auto apply decision is required"),
    preferred_employment_types: yup
      .array(yup.string())
      .min(1, "At least one employment type is required"),
  });

  const formik = useFormik<SettingsPreference>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = { ...profile, ...values };

      removeEmptyKeys(payload);

      const { success } = await profileApi.updateProfile(payload as OnboardingProfileFormValues);

      if (success) {
        refreshQuery({ queryKey: [apiQueryKeys?.getProfile] });
      }
    },
  });

  useEffect(() => {
    if (profile?.uid) {
      formik.setValues(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.uid, initialValues]);

  return { isLoading, formik };
};

export default usePreferenceSettings;

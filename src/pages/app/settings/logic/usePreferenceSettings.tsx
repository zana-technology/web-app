import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { profileApi } from "@/libs";
import { SettingsPreference } from "@/types";

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
      preferred_locations: profile?.preferred_locations ?? [],
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
      console.log("values", values);
      //   const { success, data } = await authApi.login(values);

      //   if (success) {
      //     handleAuthSuccess(data as SignupDto);
      //     navigate(routes.app.feed);
      //   }
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

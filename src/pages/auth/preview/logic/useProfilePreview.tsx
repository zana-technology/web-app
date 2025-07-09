import { constant, profileApi, refreshQuery, removeEmptyKeys } from "@/libs";
import { apiQueryKeys } from "@/libs/api/config";
import { OnboardingProfileFormValues } from "@/types";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";

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
  }, [profile]);

  const [showForm, setShowForm] = useState({
    personalInfo: false,
    skills: false,
    languages: false,
    professionalSummary: false,
    workExperience: false,
    education: false,
    certifications: false,
  });

  const showFormHandler = (obj: Partial<typeof showForm>) => {
    setShowForm((prev) => ({ ...prev, ...obj }));
  };

  const initialValues: OnboardingProfileFormValues = useMemo(() => {
    return {
      //Personal information
      full_name: profile?.full_name ?? "",
      platform_email: profile?.platform_email ?? "",
      phone_number: profile?.phone_number ?? "",
      current_location: profile?.current_location ?? "",
      linkedin_url: profile?.linkedin_url ?? "",
      portfolio_url: profile?.portfolio_url ?? "",

      //Skills languages summary
      skills: profile?.skills ?? [],
      languages: profile?.languages ?? [],
      professional_summary: profile?.professional_summary ?? "",

      //Work experience
      work_experiences:
        profile?.work_experiences && profile?.work_experiences?.length > 0
          ? profile?.work_experiences
          : [
              {
                company_name: "",
                job_title: "",
                location: "",
                description: "",
                start_date: "",
                end_date: "",
                is_current: null,
                extras: {},
              },
            ],

      //Educational
      educational_qualifications:
        profile?.educational_qualifications && profile?.educational_qualifications?.length > 0
          ? profile?.educational_qualifications
          : [
              {
                institution_name: "",
                location: "",
                degree: "",
                field_of_study: "",
                description: "",
                grade: "",
                start_date: "",
                end_date: "",
                extras: {},
              },
            ],

      //Certifications
      certifications:
        profile?.certifications && profile?.certifications?.length > 0
          ? profile?.certifications
          : [
              {
                name: "",
                issuing_organization: "",
                issue_date: "",
                expiration_date: null,
                credential_id: "",
                credential_url: "",
                extras: {},
              },
            ],
    };
  }, [profile]);

  const formik = useFormik<OnboardingProfileFormValues>({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);

      const payload = { ...values };
      removeEmptyKeys(payload);

      const { success } = await profileApi.updateProfile(payload);

      if (success) {
        refreshQuery({ queryKey: [apiQueryKeys?.getProfile] });
        setShowForm({
          personalInfo: false,
          skills: false,
          languages: false,
          professionalSummary: false,
          workExperience: false,
          education: false,
          certifications: false,
        });
      }
    },
  });

  useEffect(() => {
    if (profile?.uid) {
      console.log("profile?.uid", profile?.uid);
      console.log("initialValues", initialValues);
      formik.setValues(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.uid]);

  console.log("profile", profile);
  return { isLoading, profile, personalInformation, formik, showForm, showFormHandler };
};

export default useProfilePreview;

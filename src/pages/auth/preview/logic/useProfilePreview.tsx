import { constant, phoneNumberRegex, profileApi, refreshQuery, removeEmptyKeys } from "@/libs";
import { apiQueryKeys } from "@/libs/api/config";
import { routes } from "@/router";
import { OnboardingProfileFormValues } from "@/types";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

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
                completion_year: null,
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
      completed: false,
    };
  }, [profile]);

  const validationSchema = yup.object().shape({
    full_name: yup
      .string()
      .trim()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters")
      .test(
        "is-full-name",
        "Please enter your full name (first and last)",
        (value) => !!value && value.trim().split(" ").length >= 2
      ),
    platform_email: yup.string().email("Invalid email format").nullable(),
    phone_number: yup.string().matches(phoneNumberRegex, "Invalid phone number").nullable(),
    current_location: yup.string().max(100),
    linkedin_url: yup
      .string()
      .url("Enter a valid url starting with http:// or https://")
      .nullable(),
    portfolio_url: yup
      .string()
      .url("Enter a valid url starting with http:// or https://")
      .nullable(),

    skills: yup.array().of(yup.string().trim().max(50)).nullable(),
    languages: yup.array().of(
      yup.object().shape({
        language: yup.string().trim().required("Language is required"),
        proficiency: yup.string().trim().required("Proficiency is required"),
      })
    ),

    professional_summary: yup.string().max(1000),

    work_experiences: yup.array().of(
      yup.object().shape({
        company_name: yup.string().max(100),
        job_title: yup.string().max(100),
        location: yup.string().max(100),
        description: yup.string().max(1000),
        start_date: yup.string().nullable(),
        end_date: yup.string().nullable(),
        is_current: yup.boolean().nullable(),
        extras: yup.object().shape({}),
      })
    ),

    educational_qualifications: yup.array().of(
      yup.object().shape({
        institution_name: yup.string().max(100),
        location: yup.string().max(100),
        degree: yup.string().max(100),
        field_of_study: yup.string().max(100),
        grade: yup.string().max(50),
        completion_year: yup.number().nullable().min(1900, "Too old"),
      })
    ),

    certifications: yup.array().of(
      yup.object().shape({
        name: yup.string().max(100),
        issuing_organization: yup.string().max(100),
        issue_date: yup.string().nullable(),
        expiration_date: yup.string().nullable(),
        credential_id: yup.string().max(100),
      })
    ),
  });

  const formik = useFormik<OnboardingProfileFormValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = { ...values };

      delete payload?.completed;

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

        if (values?.completed) {
          navigate(routes.auth.complete);
        }
      }
    },
  });

  useEffect(() => {
    if (profile?.uid) {
      formik.setValues(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.uid, initialValues]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(`${routes.auth.onboarding}?step=6`);
  };
  return { isLoading, profile, personalInformation, formik, showForm, showFormHandler, goBack };
};

export default useProfilePreview;

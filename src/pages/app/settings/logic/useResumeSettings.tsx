import { showToast } from "@/components";
import { convertUrlsToFiles, handleUpload, profileApi, refreshQuery } from "@/libs";
import { apiQueryKeys } from "@/libs/api/config";
import { FileWithPreview, UploadedResume } from "@/types";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";

export const useResumeSettings = () => {
  const { isLoading, data, setFilters } = profileApi.useGetProfile();
  const [updateResume, setUpdateResume] = useState(false);

  useEffect(() => {
    setFilters({
      include_resumes: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resumes = useMemo(() => {
    if (data?.success) {
      return data?.data?.resumes?.map((x) => ({
        url: x.file_url,
        fileName: x.file_name,
        id: x.uid,
      }));
    }
  }, [data?.data, data?.success]) as { url: string; fileName: string }[];

  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const initialValues = {
    resume: [],
  };

  const validationSchema = yup.object().shape({
    resume: yup.array().required("CV/Resume is required").min(1, "CV/Resume is required"),
  });

  const formik = useFormik<{ resume: FileWithPreview[] }>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { success, data } = await handleUpload(values?.resume);

      if (success) {
        const resumePayload = {
          file_name: data?.[0]?.name as string,
          file_type: data?.[0]?.type as string,
          is_primary: true,
          file_url: data?.[0]?.url as string,
        };

        if (resumePayload?.file_url) {
          const { success, title, message } = await profileApi.addResume(
            resumePayload as UploadedResume
          );

          if (success) {
            showToast({
              title: title ?? "Successful",
              message: message,
            });
            refreshQuery({ queryKey: [apiQueryKeys.getProfile] });
            setUpdateResume(false);
          }
        }
      }
    },
  });

  useEffect(() => {
    const fetchDocs = async () => {
      const docs = await convertUrlsToFiles(resumes);
      formik.setFieldValue("resume", docs);
      setLoading(false);
    };

    fetchDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumes]);

  const deleteResume = async (id: string) => {
    setLoadingDelete(true);
    const { success, title, message } = await profileApi.deleteResume(id);
    setLoadingDelete(false);

    if (success) {
      showToast({
        title: title ?? "Successful",
        message: message ?? "Resume Deleted",
      });
      refreshQuery({ queryKey: [apiQueryKeys.getProfile] });
      setUpdateResume(false);
    }
  };

  return { isLoading, loading, formik, updateResume, setUpdateResume, deleteResume, loadingDelete };
};

export default useResumeSettings;

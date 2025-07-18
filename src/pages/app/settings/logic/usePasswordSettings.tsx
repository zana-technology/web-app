import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { passwordRegex } from "@/libs";

export const usePasswordSettings = () => {
  const [success, setSuccess] = useState(false);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required("Current Password is required"),
    newPassword: yup
      .string()
      .matches(
        passwordRegex,
        "Password must include at least 1 Uppercase, 1 Lowercase, 1 number and 1 special character "
      )
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik<{
    currentPassword: string;
    newPassword: string;
    confirmPassword?: string;
  }>({
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

  return { formik, success };
};

export default usePasswordSettings;

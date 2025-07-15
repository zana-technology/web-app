import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { routes } from "@/router";
import { useState } from "react";
import { passwordRegex } from "@/libs";

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .matches(
        passwordRegex,
        "Password must include at least 1 Uppercase, 1 Lowercase, 1 number and 1 special character "
      )
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik<{ password: string; confirmPassword?: string }>({
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

  const goToLogin = () => {
    navigate(routes.auth.login);
  };

  return { formik, goToLogin, success };
};

export default useResetPassword;

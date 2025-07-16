import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { routes } from "@/router";
import { useState } from "react";

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik<{ email: string }>({
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

export default useForgotPassword;

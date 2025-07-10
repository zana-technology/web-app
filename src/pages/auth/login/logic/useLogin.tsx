import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { LoginFormValues, SignupDto } from "@/types";
import { authApi, handleAuthSuccess } from "@/libs";
import { routes } from "@/router";

export const useLogin = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { success, data } = await authApi.login(values);

      if (success) {
        handleAuthSuccess(data as SignupDto);
        navigate(routes.app.feed);
      }
    },
  });

  return { formik };
};

export default useLogin;

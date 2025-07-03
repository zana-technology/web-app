import { passwordRegex } from "@/libs";
import { routes } from "@/router/routes";
import { SignupFormValues } from "@/types";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export const useSignup = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
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

  const formik = useFormik<SignupFormValues>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      navigate(`${routes.auth.verify.replace(":id", values?.email)}`);
    },
  });
  return { formik };
};

export default useSignup;

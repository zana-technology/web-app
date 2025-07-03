import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { routes } from "@/router";
import { useEffect, useState } from "react";

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    code: "",
  };

  const validationSchema = yup.object().shape({
    code: yup
      .string()
      .required("Verification code is required")
      .matches(/^\d{5}$/, "Verification code must be exactly 5 digits"),
  });

  const formik = useFormik<{ code: string }>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
    },
  });

  const changeEmailHandler = () => {
    navigate(routes.auth.signup);
  };

  const RESEND_TIMEOUT = 30;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [secondsLeft]);

  const restartCountdown = () => {
    setSecondsLeft(RESEND_TIMEOUT);
    setCanResend(false);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const timeLeft = `${minutes}m:${seconds.toString().padStart(2, "0")}s`;

  return {
    formik,
    id,
    changeEmailHandler,
    canResend,
    restartCountdown,
    timeLeft,
  };
};

export default useVerifyEmail;

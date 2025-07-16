import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { routes } from "@/router";
import { useEffect, useState } from "react";
import { authApi } from "@/libs";
import { VerifyEmailFormValues } from "@/types";
import { showToast } from "@/components";

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
      .matches(/^\d{4}$/, "Verification code must be exactly 4 digits"),
  });

  const formik = useFormik<{ code: string }>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        email: id,
        token: values.code,
      } as VerifyEmailFormValues;

      const { success } = await authApi.verifyEmail(payload);

      if (success) {
        navigate(routes.auth.onboarding);
      }
    },
  });

  const changeEmailHandler = () => {
    navigate(routes.auth.signup);
  };

  const RESEND_TIMEOUT = 3 * 60;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [secondsLeft]);

  const restartCountdown = async () => {
    setLoading(true);
    const { success, title, message } = await authApi.resendVerificationEmail();

    if (success) {
      showToast({
        title: title,
        message: message,
      });
      setSecondsLeft(RESEND_TIMEOUT);
      setCanResend(false);
    }
    setLoading(false);
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
    secondsLeft,
    loading,
  };
};

export default useVerifyEmail;

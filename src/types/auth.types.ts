export type LoginFormValues = {
  email: string;
  password: string;
};
export type SignupFormValues = LoginFormValues & {
  confirmPassword: string;
};

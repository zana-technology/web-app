export type LoginFormValues = {
  username: string;
  password: string;
};
export type SignupFormValues = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type SignupDto = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type VerifyEmailFormValues = {
  email: string;
  token: string;
};

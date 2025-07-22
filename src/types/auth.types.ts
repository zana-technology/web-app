export type LoginFormValues = {
  username: string;
  password: string;
};
export type SignupFormValues = {
  email: string;
  password: string;
  confirmPassword?: string;
};
export type TokenDto = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_at: number;
};

export type SignupDto = {
  token: TokenDto;
  is_verified: boolean;
};

export type VerifyEmailFormValues = {
  email: string;
  token: string;
};

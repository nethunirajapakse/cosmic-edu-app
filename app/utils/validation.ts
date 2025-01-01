// utils/validations.ts

//Login validations
export interface ValidationErrors {
  email: string;
  password: string;
}

export const validateEmail = (email: string): string => {
  if (!email) return "Email is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

export const validateForm = (
  email: string,
  password: string
): ValidationErrors => {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
};

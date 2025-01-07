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

//Register validations

// Password Validation
export const validatePasswordInRegister = (password: string): string => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/[0-9]/.test(password))
    return "Password must contain at least one number";
  return "";
};

// First Name Validation
export const validateFirstName = (firstName: string): string => {
  return !firstName.trim() ? "First name is required" : "";
};

// Last Name Validation
export const validateLastName = (lastName: string): string => {
  return !lastName.trim() ? "Last name is required" : "";
};

// Confirm Password Validation
export const validateConfirmPassword = (
  confirmPassword: string,
  password: string
): string => {
  if (!confirmPassword) return "Please confirm your password";
  if (confirmPassword !== password) return "Passwords do not match";
  return "";
};

// Form Validation for Register Form
export const validateRegisterForm = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return {
    firstName: validateFirstName(firstName),
    lastName: validateLastName(lastName),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(confirmPassword, password),
  };
};

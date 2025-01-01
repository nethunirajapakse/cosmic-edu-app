// RegisterForm.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Button from "../common/Button";

interface RegisterFormProps {
  onSubmit: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
}

interface ValidationState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState<ValidationState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (
    field: keyof typeof formData,
    value: string
  ): string => {
    switch (field) {
      case "firstName":
        return !value.trim() ? "First name is required" : "";
      case "lastName":
        return !value.trim() ? "Last name is required" : "";
      case "email":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/[0-9]/.test(value))
          return "Password must contain at least one number";
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const newError = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: newError }));

      // Special case: also validate confirmPassword when password changes
      if (field === "password" && touched.confirmPassword) {
        const confirmError = validateField(
          "confirmPassword",
          formData.confirmPassword
        );
        setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
      }
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: ValidationState = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate all fields
    Object.keys(formData).forEach((field) => {
      const key = field as keyof typeof formData;
      const error = validateField(key, formData[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.confirmPassword
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              touched.firstName && errors.firstName ? styles.inputError : null,
            ]}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(value) => handleChange("firstName", value)}
            onBlur={() => handleBlur("firstName")}
          />
          {touched.firstName && errors.firstName ? (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              touched.lastName && errors.lastName ? styles.inputError : null,
            ]}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleChange("lastName", value)}
            onBlur={() => handleBlur("lastName")}
          />
          {touched.lastName && errors.lastName ? (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              touched.email && errors.email ? styles.inputError : null,
            ]}
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            onBlur={() => handleBlur("email")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {touched.email && errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              touched.password && errors.password ? styles.inputError : null,
            ]}
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            onBlur={() => handleBlur("password")}
            secureTextEntry
          />
          {touched.password && errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              touched.confirmPassword && errors.confirmPassword
                ? styles.inputError
                : null,
            ]}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
            onBlur={() => handleBlur("confirmPassword")}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
        </View>

        <Button title="Register" onPress={handleSubmit} variant="secondary" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff", // Match with overlay
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  inputError: {
    borderColor: "#ff0000",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default RegisterForm;

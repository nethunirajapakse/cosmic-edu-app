import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../common/Button";
import {
  ValidationErrors,
  validateEmail,
  validatePassword,
  validateForm,
} from "../../utils/validation";
import AlertModal from "../common/AlertModal"; // Import your AlertModal component

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState<ValidationErrors>({
    email: "",
    password: "",
  });

  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State to hold the modal message

  const checkUserExists = async (email: string) => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (!storedUserData) return false;

      const userData = JSON.parse(storedUserData);
      return userData.email === email;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  const handleBlur = async (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "email") {
      const emailError = validateEmail(email);
      if (!emailError) {
        const userExists = await checkUserExists(email);
        if (!userExists) {
          setErrors((prev) => ({
            ...prev,
            email: "User not found. Please register first.",
          }));
          return;
        }
      }
      setErrors((prev) => ({ ...prev, email: emailError }));
    } else if (field === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(text) }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(text) }));
    }
  };

  const handleLogin = async () => {
    try {
      const formErrors = validateForm(email, password);
      setErrors(formErrors);
      setTouched({ email: true, password: true });

      if (formErrors.email || formErrors.password) {
        return;
      }

      const storedUserData = await AsyncStorage.getItem("userData");

      if (!storedUserData) {
        setModalMessage("User not found. Please register first.");
        setModalVisible(true);
        return;
      }

      const userData = JSON.parse(storedUserData);

      if (userData.email === email && userData.password === password) {
        await AsyncStorage.setItem("authToken", "dummy-auth-token");
        router.push("./home");
      } else {
        setModalMessage("Invalid email or password");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("Login failed. Please try again.");
      setModalVisible(true);
      console.error(error);
    }
  };

  return (
    <View style={styles.inputSection}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            touched.email && errors.email ? styles.inputError : null,
          ]}
          placeholder="Enter your email"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={email}
          onChangeText={handleEmailChange}
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
          placeholder="Enter your password"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={password}
          onChangeText={handlePasswordChange}
          onBlur={() => handleBlur("password")}
          secureTextEntry
        />
        {touched.password && errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>

      <Button
        title="Sign In"
        onPress={handleLogin}
        variant="secondary"
        style={styles.loginButton}
      />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don’t have an account? </Text>
        <Pressable onPress={() => router.push("./register")}>
          <Text style={styles.registerLink}>Sign Up</Text>
        </Pressable>
      </View>

      {/* Render AlertModal when modalVisible is true */}
      <AlertModal
        visible={modalVisible}
        title="Login Error"
        message={modalMessage}
        onConfirm={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
    color: "#fff",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff3b30",
    borderWidth: 1,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  loginButton: {
    marginTop: 10,
    height: 50,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  registerText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  registerLink: {
    fontSize: 14,
    color: "#E3A538",
    fontWeight: "600",
  },
});

// Register.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import RegisterForm from "../components/auth/RegisterForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
  const router = useRouter();

  const handleRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      // Store user data
      const userData = {
        firstName,
        lastName,
        email,
        password,
        id: Date.now().toString(),
      };

      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("authToken", "dummy-auth-token");

      Alert.alert("Success", "Registration successful!", [
        {
          text: "OK",
          onPress: () => router.push("./login"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/login_cover.jpg")}
      style={styles.backgroundImage} // Use a separate background image style
    >
      <View style={styles.overlay}>
        <RegisterForm onSubmit={handleRegister} />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable onPress={() => router.push("./login")}>
            <Text style={styles.loginLink}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#fff",
  },
  loginLink: {
    fontSize: 16,
    color: "#1976d2",
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
});

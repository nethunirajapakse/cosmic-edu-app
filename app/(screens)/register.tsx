import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import RegisterForm from "../components/auth/RegisterForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertModal from "../components/common/AlertModal";

const { height } = Dimensions.get("window");

export default function Register() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = React.useState(false);
  const handleRegister = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        id: Date.now().toString(),
      };

      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("authToken", "dummy-auth-token");

      setModalVisible(true); // Show modal on success
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/tel.jpg")}
        style={styles.container}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <View style={styles.overlay}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Join the Cosmos</Text>
              <Text style={styles.subtitle}>Begin Your Space Journey</Text>
            </View>

            <View style={styles.bottomSection}>
              <RegisterForm onSubmit={handleRegister} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>

      {/* Render AlertModal */}
      <AlertModal
        visible={modalVisible}
        title="Success"
        message="Registration successful!"
        onConfirm={() => {
          setModalVisible(false);
          router.push("./login"); // Navigate to login screen
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.30)",
    justifyContent: "space-between",
  },
  headerContainer: {
    paddingTop: height * 0.1, // Reduced from 0.15 to give more space
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 8,
  },
  bottomSection: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

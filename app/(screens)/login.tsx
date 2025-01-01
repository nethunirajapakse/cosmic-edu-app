import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import LoginForm from "../components/auth/LoginForm";

const { height } = Dimensions.get("window");

export default function Login() {
  return (
    <ImageBackground
      source={require("../../assets/images/tel.jpg")}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
        enabled
      >
        <View style={styles.overlay}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Explore The Cosmos</Text>
            <Text style={styles.subtitle}>Your Gateway to the Universe</Text>
          </View>

          <View style={styles.bottomSection}>
            <LoginForm />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    paddingTop: height * 0.15,
    alignItems: "center",
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
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
});

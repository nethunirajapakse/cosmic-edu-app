import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import Button from "../components/common/Button";
import { LinearGradient } from "expo-linear-gradient";

export default function Landing() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/welcome.jpg")} // Update this path to match your image location
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            {/*<View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>EA</Text>
              </View>
            </View>*/}

            <View style={styles.textContainer}>
              <Text style={styles.title}>Explore the Universe</Text>
              <Text style={styles.subtitle}>
                Discover celestial wonders and embark on an astronomical journey
                through space and time
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {/*<Button
              title="Begin Your Journey"
              onPress={() => router.push("/login")}
              style={styles.mainButton}
              variant="primary"
            />*/}
            <Button
              title="Begin Your Journey"
              onPress={() => router.push("./login")}
              style={styles.secondaryButton}
              variant="secondary"
              textStyle={{ color: "#fff" }} // Set text color to white
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginBottom: 48,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 32,
    paddingHorizontal: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 50 : 40,
    gap: 12,
  },
  mainButton: {
    height: 56,
    backgroundColor: "#7C3AED",
    borderRadius: 28,
  },
  secondaryButton: {
    //height: 56,
    borderRadius: 28,
    borderWidth: 1, // Add white border
    borderColor: "#fff", // White border color
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "#fff", // Make text white
  },
});

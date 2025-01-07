import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { fetchImage, fetchGalaxyData } from "../services/api";
import { useClickStore } from "../store/useClickStore";
import { FloatingCounter } from "../components/home/FloatingCounter";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Import the icon library

const { width } = Dimensions.get("window");

interface ImageData {
  url: string;
  title: string;
  date: string;
  explanation: string;
}

interface GalaxyData {
  links: Array<{ href: string }>;
  data: Array<{
    title: string;
    date_created: string;
    description: string;
  }>;
}

export default function Home() {
  const router = useRouter();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [galaxyData, setGalaxyData] = useState<GalaxyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const [expandedGalaxyIndexes, setExpandedGalaxyIndexes] = useState<number[]>(
    []
  );
  const increment = useClickStore((state) => state.increment);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setFirstName(userData.firstName || "User");
        }

        const [imageResponse, galaxyResponse] = await Promise.all([
          fetchImage(),
          fetchGalaxyData(),
        ]);

        setImageData(imageResponse);
        setGalaxyData(galaxyResponse);
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to load data. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      router.replace("./login");
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  const toggleGalaxyDescription = (index: number) => {
    setExpandedGalaxyIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E3A538" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <LinearGradient
          colors={["rgba(0,0,0,0.9)", "rgba(0,0,0,0.6)", "transparent"]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.greeting}>Welcome back,</Text>
                <Text style={styles.name}>{firstName}</Text>
              </View>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="exit-outline" // Sign out icon from Ionicons
                  size={32}
                  color="#E3A538"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.headerDecoration} />
          </View>
        </LinearGradient>

        {/* Today's Cosmic Wonder Section */}
        <View style={styles.wonderSection}>
          <Text style={styles.sectionTitle}>Today's Cosmic Wonder</Text>
          {imageData && (
            <View style={styles.wonderCard}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: imageData.url }}
                  style={styles.wonderImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(0,0,0,0.85)",
                    "rgba(0,0,0,0.95)",
                  ]}
                  style={styles.wonderOverlay}
                  locations={[0.4, 0.7, 1]}
                >
                  <View style={styles.titleContainer}>
                    <Text style={styles.wonderTitle}>{imageData.title}</Text>
                    <Text style={styles.wonderDate}>{imageData.date}</Text>
                  </View>
                </LinearGradient>
              </View>
              <View style={styles.wonderContent}>
                <Text style={styles.wonderDescription}>
                  {showFullDescription
                    ? imageData.explanation
                    : `${imageData.explanation.slice(0, 150)}...`}
                </Text>
                <TouchableOpacity
                  style={styles.wonderButton}
                  onPress={() => {
                    setShowFullDescription(!showFullDescription);
                    if (!showFullDescription) increment();
                  }}
                >
                  <Text style={styles.wonderButtonText}>
                    {showFullDescription ? "Show Less" : "Read More"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Discover Galaxies Section */}
        <View style={styles.galaxiesSection}>
          <Text style={styles.sectionTitle}>Discover Galaxies</Text>
          <View style={styles.galaxiesGrid}>
            {galaxyData.map((item, index) => (
              <View key={index} style={styles.galaxyCard}>
                <Image
                  source={{ uri: item.links[0].href }}
                  style={styles.galaxyImage}
                  resizeMode="cover"
                />
                <View style={styles.galaxyContent}>
                  <Text style={styles.galaxyTitle}>{item.data[0].title}</Text>
                  <Text style={styles.galaxyDate}>
                    {new Date(item.data[0].date_created).toLocaleDateString(
                      "en-CA"
                    )}
                  </Text>
                  <Text style={styles.galaxyDescription}>
                    {expandedGalaxyIndexes.includes(index)
                      ? item.data[0].description
                      : `${item.data[0].description.slice(0, 100)}...`}
                  </Text>
                  <TouchableOpacity
                    style={styles.galaxyButton}
                    onPress={() => {
                      toggleGalaxyDescription(index);
                      if (!expandedGalaxyIndexes.includes(index)) increment();
                    }}
                  >
                    <Text style={styles.galaxyButtonText}>
                      {expandedGalaxyIndexes.includes(index)
                        ? "Show Less"
                        : "Read More"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <FloatingCounter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 15,
    marginHorizontal: 20,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },
  wonderSection: {
    marginBottom: 30,
  },

  wonderCard: {
    marginHorizontal: 10,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imageContainer: {
    position: "relative",
    height: 400,
  },
  wonderImage: {
    width: "100%",
    height: "100%",
  },
  wonderOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%", // Gradient covers only bottom half
    justifyContent: "flex-end",
  },
  titleContainer: {
    padding: 16,
  },
  wonderTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },
  wonderDate: {
    fontSize: 14,
    color: "#E3A538",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  wonderContent: {
    padding: 16,
    backgroundColor: "rgb(0, 0, 0)",
  },
  wonderDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  wonderButton: {
    backgroundColor: "#E3A538",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  wonderButtonText: {
    color: "#000",
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },
  galaxiesSection: {
    paddingBottom: 30,
  },
  galaxiesGrid: {
    paddingHorizontal: 10,
  },
  galaxyCard: {
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(227, 165, 56, 0.3)",
  },
  galaxyImage: {
    width: "100%",
    height: 200,
  },
  galaxyContent: {
    padding: 16,
  },
  galaxyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },
  galaxyDate: {
    fontSize: 12,
    color: "#E3A538",
    marginBottom: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  galaxyDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 12,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
  },
  galaxyButton: {
    backgroundColor: "rgba(227, 165, 56, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#E3A538",
  },
  galaxyButtonText: {
    color: "#E3A538",
    fontWeight: "600",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  // Add/update these styles in the StyleSheet:
  headerGradient: {
    paddingTop: Platform.OS === "ios" ? 60 : 50,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    color: "rgba(227, 165, 56, 0.9)",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif",
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 4,
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
    letterSpacing: 0.5,
    textShadowColor: "rgba(227, 165, 56, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  logoutButton: {
    overflow: "hidden",
    borderRadius: 25,
    elevation: 8,
    shadowColor: "#E3A538",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoutGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  logoutText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: Platform.OS === "ios" ? "System" : "sans-serif-medium",
    letterSpacing: 0.5,
  },
  headerDecoration: {
    height: 2,
    width: 60,
    backgroundColor: "#E3A538",
    marginTop: 20,
    borderRadius: 1,
    opacity: 0.7,
  },
});

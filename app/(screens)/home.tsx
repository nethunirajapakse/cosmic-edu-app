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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { fetchImage, fetchGalaxyData } from "../services/api";

export default function Home() {
  const router = useRouter();
  const [imageData, setImageData] = useState<any>(null);
  const [galaxyData, setGalaxyData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);
  const [expandedGalaxyIndexes, setExpandedGalaxyIndexes] = useState<number[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setFirstName(userData.firstName || "User");
        }

        const imageResponse = await fetchImage();
        setImageData(imageResponse);

        const galaxyResponse = await fetchGalaxyData();
        setGalaxyData(galaxyResponse);
      } catch (error) {
        Alert.alert("Error", "Failed to load data.");
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
      Alert.alert("Error", "Failed to logout.");
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
        <ActivityIndicator size="large" color="#2a4a7b" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.name}>{firstName}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Astronomy Picture of the Day</Text>
      {imageData && (
        <View style={styles.card}>
          <Image
            source={{ uri: imageData.url }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.cardContent}>
            <Text style={styles.imageTitle}>{imageData.title}</Text>
            <Text style={styles.imageDate}>{imageData.date}</Text>
            <Text style={styles.imageDescription}>
              {showFullDescription
                ? imageData.explanation
                : `${imageData.explanation.slice(0, 150)}...`}
            </Text>
            <TouchableOpacity
              style={styles.seeMoreButton}
              onPress={() => setShowFullDescription(!showFullDescription)}
            >
              <Text style={styles.seeMoreText}>
                {showFullDescription ? "Show Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Text style={styles.title}>Galaxies Around</Text>
      {galaxyData.length > 0 &&
        galaxyData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: item.links[0].href }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.imageTitle}>{item.data[0].title}</Text>
              <Text style={styles.imageDate}>{item.data[0].date_created}</Text>
              <Text style={styles.imageDescription}>
                {expandedGalaxyIndexes.includes(index)
                  ? item.data[0].description
                  : `${item.data[0].description.slice(0, 150)}...`}
              </Text>
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={() => toggleGalaxyDescription(index)}
              >
                <Text style={styles.seeMoreText}>
                  {expandedGalaxyIndexes.includes(index)
                    ? "Show Less"
                    : "Read More"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 16,
    color: "#94A3B8",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F1F5F9",
    marginTop: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#F1F5F9",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 300,
  },
  cardContent: {
    padding: 16,
  },
  imageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F1F5F9",
    marginBottom: 8,
  },
  imageDate: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 12,
  },
  imageDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#CBD5E1",
    marginBottom: 12,
  },
  seeMoreButton: {
    alignSelf: "flex-start",
  },
  seeMoreText: {
    color: "#7C3AED",
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: "#F1F5F9",
    fontWeight: "600",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F172A",
  },
});

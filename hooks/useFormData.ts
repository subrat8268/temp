import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { fetchUserData, fetchSubProjects } from "@/api/apiUtils";
import { Alert } from "react-native";

interface SubProject {
  id: string;
  name: string;
}

export const useFormData = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [subProjectOptions, setSubProjectOptions] = useState<SubProject[]>([]);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Failed to fetch location.");
    }
  };

  const fetchAgentId = async () => {
    try {
      const userData = await fetchUserData();
      setAgentId(userData.id);
    } catch (error) {
      console.error("Failed to fetch agent ID:", error);
      Alert.alert("Error", "Failed to fetch agent information.");
    }
  };

  const fetchSubProjectsData = async () => {
    try {
      const subProjects = await fetchSubProjects();
      setSubProjectOptions(subProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      Alert.alert("Error", "Failed to fetch sub-projects.");
      setSubProjectOptions([]);
    }
  };

  const fetchFormData = () => {
    fetchLocation();
    fetchAgentId();
    fetchSubProjectsData();
  };

  return { location, agentId, subProjectOptions, fetchFormData };
};

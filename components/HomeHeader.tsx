import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import InstallationForm from "./InstallationForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserData, logoutUser } from "@/api/apiUtils";
import InitialsImage from "./InitialsImage";
import Typography from "./Typography";

interface Props {
  navigation: any;
  reRenderFunction: () => void;
}

const HomeHeader = ({ navigation, reRenderFunction }: Props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUserName(userData.name);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleAddItem = (values: any) => {
    console.log("New item:", values);
    setIsFormVisible(false);
    reRenderFunction();
  };
  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      await AsyncStorage.removeItem("access_token");
      navigation.replace("Login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const initials = userName
    ? userName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <>
      <View className="flex-row items-center justify-between px-4 bg-gray-700 h-16">
        <View className="flex-row items-center">
          <InitialsImage
            initials={initials}
            size={40}
            backgroundColor={"bg-white"}
          />
          <Typography className="text-white text-lg ml-2">
            {userName || "Loading..."}
          </Typography>
        </View>
        <View className="flex-row items-center">
          <Pressable className="mr-5" onPress={reRenderFunction}>
            <Icon name="refresh" size={24} color="#fff" />
          </Pressable>
          <Pressable onPress={() => setIsFormVisible(true)} className="mr-5">
            <Icon name="plus" size={24} color="#fff" />
          </Pressable>
          <Pressable onPress={() => handleLogout()}>
            <Icon name="sign-out" size={24} color="#fff" />
          </Pressable>
        </View>
      </View>

      <InstallationForm
        isVisible={isFormVisible}
        onClose={() => handleFormClose()}
        onSubmit={handleAddItem}
      />
    </>
  );
};

export default HomeHeader;

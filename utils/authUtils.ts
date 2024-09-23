import { RootStackParamList } from "../app/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const TOKEN_EXPIRATION_TIME = 30 * 60 * 1000;

export const storeToken = async (token: string) => {
  const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;
  await AsyncStorage.setItem("access_token", token);
  await AsyncStorage.setItem("token_expiration", expirationTime.toString());
};

export const checkTokenExpiration = async () => {
  const expirationTime = await AsyncStorage.getItem("token_expiration");
  if (expirationTime) {
    const currentTime = new Date().getTime();
    if (currentTime > parseInt(expirationTime)) {
      // Token has expired
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("token_expiration");
      return true;
    }
  }
  return false;
};

export const useAuthNavigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToLogin = () => {
    navigation.replace("Login");
  };

  return { navigateToLogin };
};

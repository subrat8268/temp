import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, Text, ActivityIndicator } from "react-native";
import Typography from "./Typography";

interface Props {
  title: string;
  onPress?: () => void;
  navigateTo?: string;
  color?: string;
  textColor?: string;
  paddingY?: string;
  paddingX?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({
  title,
  onPress,
  navigateTo,
  color = "bg-yellow-300",
  textColor = "text-gray-700",
  paddingY = "py-2",
  paddingX = "px-4",
  disabled = false,
  isLoading = false,
  ...props
}: Props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigateTo) {
      navigation.navigate(navigateTo as never);
    }
  };

  const disabledColor = "bg-gray-400";
  const activeColor = disabled ? disabledColor : color;

  return (
    <Pressable
      className={`${activeColor} ${paddingY} ${paddingX} rounded-xl flex-row justify-center items-center`}
      onPress={handlePress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" style={{ marginRight: 8 }} />
      ) : null}
      <Typography
        fontWeight={"SemiBold"}
        className={`${textColor} text-center text-lg ${isLoading ? "ml-2" : ""}`}
      >
        {isLoading ? "Loading..." : title}
      </Typography>
    </Pressable>
  );
};

export default Button;

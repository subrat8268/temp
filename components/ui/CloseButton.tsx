import React from "react";
import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

interface Props {
  onPress: () => void;
  size?: number;
  color?: string;
  style?: any;
}

const CloseButton = ({ onPress, size = 28, color = "black", style }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="absolute top-0 right-0 p-4 z-10"
      style={style}
    >
      <Icon name="close" size={size} color={color} />
    </Pressable>
  );
};

export default CloseButton;

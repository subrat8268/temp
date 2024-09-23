import React from "react";
import { View } from "react-native";
import Typography from "./Typography";

interface Props {
  initials: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

const InitialsImage = ({ initials, size = 40 }: Props) => {
  return (
    <View
      className="justify-center items-center rounded-full bg-white"
      style={{ width: size, height: size }}
    >
      <Typography
        className="text-gray-700 font-bold text-center"
        style={{ fontSize: size / 2.5 }}
      >
        {initials}
      </Typography>
    </View>
  );
};

export default InitialsImage;

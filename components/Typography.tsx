import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  fontSize?: number;
  fontWeight?: "Regular" | "SemiBold" | "Bold" | "ExtraBold" | "Black";
  style?: object;
}

const Typography = ({
  children,
  fontWeight = "Regular",
  style,
  ...rest
}: TypographyProps) => {
  const getFontFamily = () => {
    switch (fontWeight) {
      case "SemiBold":
        return "PoppinsSemiBold";
      case "Bold":
        return "PoppinsBold";
      case "ExtraBold":
        return "PoppinsExtraBold";
      case "Black":
        return "PoppinsBlack";
      default:
        return "PoppinsRegular";
    }
  };

  return (
    <Text
      style={[styles.text, { fontFamily: getFontFamily() }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#000",
  },
});

export default Typography;

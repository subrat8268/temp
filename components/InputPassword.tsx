import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TextInputProps, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Typography from "./Typography";

interface InputPasswordProps extends TextInputProps {
  error?: string | false;
}

const InputPassword = ({
  value,
  onChangeText,
  onBlur,
  error,
  ...props
}: InputPasswordProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [displayedError, setDisplayedError] = useState<string | null>(
    error || null
  );
  const [isTemporarilyVisible, setIsTemporarilyVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    setIsTemporarilyVisible(true);

    setTimeout(() => {
      setIsPasswordVisible(false);
      setIsTemporarilyVisible(false);
    }, 500);
  };

  useEffect(() => {
    if (error) {
      setDisplayedError(error);
      const timer = setTimeout(() => {
        setDisplayedError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <View className="mb-2">
      <View className="border-2 border-gray-400 focus:bg-[#05060f0a] focus:border-[#05060f] hover:border-[#05060f] focus:outline-none transition-all duration-300 ease-in-out rounded-xl flex-row items-center p-2">
        <Icon name="lock" size={20} color="gray" style={{ marginLeft: 5 }} />
        <TextInput
          className="flex-1 mt-1 ml-2 text-[16px] text-gray-700 p-2"
          placeholder="Enter your password"
          style={{ fontFamily: "PoppinsRegular" }}
          secureTextEntry={!isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          {...props}
        />
        <Pressable onPress={togglePasswordVisibility}>
          <Icon
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={20}
            color="gray"
            style={{ marginRight: 10 }}
          />
        </Pressable>
      </View>
      {displayedError && (
        <Typography className="text-red-500 mt-1 text-[13px]">
          {displayedError}
        </Typography>
      )}
    </View>
  );
};

export default InputPassword;

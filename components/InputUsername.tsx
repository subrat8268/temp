import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import Typography from "./Typography";

interface InputUsernameProps extends TextInputProps {
  error?: string | false;
}

const InputUsername = ({
  value,
  onChangeText,
  onBlur,
  error,
  ...props
}: InputUsernameProps) => {
  const [displayedError, setDisplayedError] = useState<string | null>(
    error || null
  );

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
    <View className="mb-4">
      <View className="border-2 border-gray-400 focus:bg-[#05060f0a] focus:border-[#05060f] hover:border-[#05060f] focus:outline-none transition-all duration-300 ease-in-out rounded-xl flex-row items-center p-2">
        <Icon name="user" size={20} color="gray" style={{ marginLeft: 5 }} />
        <TextInput
          className="flex-1 ml-2 mt-1 text-[16px] text-gray-700 p-2 "
          style={{ fontFamily: "PoppinsRegular" }}
          placeholder="Enter your Username"
          keyboardType="default"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          {...props}
        />
      </View>
      {displayedError && (
        <Typography className="text-red-500 mt-1 text-[13px]">
          {displayedError}
        </Typography>
      )}
    </View>
  );
};

export default InputUsername;

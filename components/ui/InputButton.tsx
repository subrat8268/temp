import React from "react";
import { View, Text, TextInput } from "react-native";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  error?: string;
  touched?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  keyboardType = "default",
}: InputProps) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-bold text-[#05060f99] mb-1">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#a0a0a0"
        className="border-2 bg-[#05060f0a] rounded-xl border-gray-300 focus:border-[#05060f] hover:border-[#05060f] focus:outline-none transition-all duration-300 ease-in-out py-2 px-3 text-base"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={keyboardType}
      />
      {touched && error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

export default Input;

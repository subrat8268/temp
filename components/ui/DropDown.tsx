import React from "react";
import { View, Text } from "react-native";
import { Dropdown as RNEDropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/Entypo";

interface DropdownProps {
  label: string;
  options: { value: string; label: string; type?: string }[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
}

const Dropdown = ({
  label,
  options,
  placeholder,
  value,
  onChange,
  error,
  touched,
}: DropdownProps) => {
  const renderItem = (item: { label: string; type?: string }) => {
    return (
      <View className="px-4 py-2 flex flex-row justify-between items-center">
        <Text className="text-[16px]">{item.label}</Text>
      </View>
    );
  };

  return (
    <View className="mb-4">
      <Text className="text-sm font-bold text-[#05060f99] mb-1">{label}</Text>
      <RNEDropdown
        style={{
          borderWidth: 2,
          borderColor: error && touched ? "red" : "#D1D5DB",
          borderRadius: 10,
          backgroundColor: "#05060f0a",
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
        placeholderStyle={{ color: "#a0a0a0" }}
        selectedTextStyle={{ fontSize: 16 }}
        iconStyle={{ marginRight: 10 }}
        data={options}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={(item) => onChange(item.value)}
        renderItem={renderItem}
        renderRightIcon={() => (
          <Icon name="chevron-down" size={20} color="gray" />
        )}
      />
      {touched && error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

export default Dropdown;

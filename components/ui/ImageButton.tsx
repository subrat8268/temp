import React from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CloseButton from "./CloseButton";
import { File } from "@/constants/formTypes";

type ImageField = "installationPhotos" | "customerSignature" | "agentSignature";

interface Props {
  field: ImageField;
  value: File[] | File | string[] | string | null;
  label: string;
  color: string;
  onUpload: (field: ImageField) => Promise<void>;
}

const ImageButton: React.FC<Props> = ({
  field,
  value,
  label,
  color,
  onUpload,
}) => {
  const renderFileName = (file: File | string, index?: number) => {
    const fileName = typeof file === "string" ? file : file.name;
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ flex: 1, color: "gray", fontSize: 14 }}>{fileName}</Text>
      </View>
    );
  };

  return (
    <View className="py-2">
      <Text
        style={{
          color: "gray",
          fontWeight: "bold",
          fontSize: 14,
          marginBottom: 4,
        }}
      >
        {label}
      </Text>
      <View className="border border-gray-400 p-2 rounded-lg">
        <Pressable
          onPress={() => onUpload(field)}
          className="bg-gray-400 w-24 py-2 px-4 rounded-lg flex-row items-center justify-center"
        >
          <Icon name="cloud-upload" size={18} color="white" />
          <Text className="text-white font-semibold ml-1">Upload</Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
        {Array.isArray(value)
          ? value.map((item, index) => renderFileName(item, index))
          : value && renderFileName(value)}
      </View>
    </View>
  );
};

export default ImageButton;

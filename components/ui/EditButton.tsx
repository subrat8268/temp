import React from "react";
import { Pressable, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Typography from "../Typography";

interface Props {
  onPress: () => void;
}

const EditButton = ({ onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex bg-blue-400 flex-row items-center justify-center p-3 rounded-lg mt-3 "
    >
      <Typography className="text-white mr-2">Edit</Typography>
      <Feather name="edit" size={24} color="white" />
    </Pressable>
  );
};

export default EditButton;

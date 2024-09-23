import React from "react";
import { View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

interface Props {
  navigation: any;
}

const DetailHeader = ({ navigation }: Props) => {
  return (
    <View className="flex-row items-center px-4 bg-gray-800 h-16">
      <Pressable onPress={() => navigation.goBack()} className="mr-4">
        <Icon
          name="arrowleft"
          style={{ fontWeight: "normal" }}
          size={24}
          color="#fff"
        />
      </Pressable>
      <Text className="text-white text-lg font-semibold">Detail Page</Text>
    </View>
  );
};

export default DetailHeader;

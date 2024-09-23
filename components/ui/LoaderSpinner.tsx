import React from "react";
import { View, ActivityIndicator } from "react-native";

const LoadingSpinner = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#023047" />
    </View>
  );
};

export default LoadingSpinner;

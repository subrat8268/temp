import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProjectCard from "@/components/ui/ProjectCard";
import { useText } from "@/constants/useText";
import LoadingSpinner from "@/components/ui/LoaderSpinner";
import useForms from "../hooks/useLoadForms";
import HomeHeader from "@/components/HomeHeader";
import { useFocusEffect } from "expo-router";
import Typography from "@/components/Typography";

const Home = () => {
  const navigation = useNavigation();
  const { forms, loading, reRenderFunction } = useForms();

  const handleCardPress = (formId: string) => {
    navigation.navigate("DetailPage", { formId });
  };

  useFocusEffect(
    useCallback(() => {
      reRenderFunction();
    }, [])
  );

  return (
    <View className="flex-1 bg-[#FBFAF3]">
      <HomeHeader navigation={navigation} reRenderFunction={reRenderFunction} />

      <View className="flex-1 p-5">
        <Typography fontWeight={"SemiBold"} className="text-xl mb-3">
          {useText.submittedFormsTitle}
        </Typography>

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <LoadingSpinner />
          </View>
        ) : (
          <ScrollView>
            {forms.length > 0 ? (
              forms.map((form) => {
                const createdAt = new Date(form.createdAt);
                const date = createdAt.toLocaleDateString();
                const time = createdAt.toLocaleTimeString();

                return (
                  <ProjectCard
                    key={form.id}
                    customerName={form.customerName}
                    projectName={form.subProject?.name}
                    date={date}
                    time={time}
                    onPress={() => handleCardPress(form.id)}
                    formId={form.id}
                  />
                );
              })
            ) : (
              <Typography className="text-center mt-10 text-lg text-gray-400">
                No forms available.
              </Typography>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Home;

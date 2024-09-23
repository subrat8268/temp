import React from "react";
import { View, Pressable } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import Typography from "../Typography";
import moment from "moment";
interface ProjectCardProps {
  formId: string;
  customerName: string;
  projectName: string;
  date: string;
  time: string;
  onPress: () => void;
}

const ProjectCard = ({
  formId,
  customerName,
  projectName,
  date,
  time,
  onPress,
}: ProjectCardProps) => {
  const formatDateAndTime = (dateString: string, timeString: string) => {
    const dateTimeString = `${dateString} ${timeString}`;

    const formattedDateTime = moment(
      dateTimeString,
      "DD-MM-YYYY HH:mm:ss"
    ).format("Do MMMM YYYY [at] h:mm A");

    return formattedDateTime;
  };

  return (
    <Pressable
      onPress={onPress}
      className="mb-2 p-2 bg-[#C7F4C2] rounded-xl shadow-2xl shadow-gray-300 flex flex-row items-center"
    >
      <View className="border-2 border-gray-400 px-2 py-1.5 ml-1 mr-5 rounded-xl">
        <Octicons name="person" size={34} color="gray" />
      </View>
      <View className="flex flex-col gap-[-6]">
        <Typography
          fontWeight={"SemiBold"}
          className="text-[16px] pt-1.5 mb-[-2] text-gray-700 font-medium"
        >
          {customerName}
        </Typography>

        <Typography className="text-[12px] text-gray-700">
          Project name: {projectName}
        </Typography>
        <Typography className="text-[10px] text-gray-700">
          {formatDateAndTime(date, time)}
        </Typography>
      </View>
    </Pressable>
  );
};

export default ProjectCard;

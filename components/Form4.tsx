import { useText } from "@/constants/useText";
import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { FormikProps } from "formik";
import * as ImagePicker from "expo-image-picker";
import { File, FormValues } from "@/constants/formTypes";
import ImageButton from "./ui/ImageButton";

type ImageField = "installationPhotos" | "customerSignature" | "agentSignature";

interface Props {
  formikProps: FormikProps<FormValues>;
}

const Form4 = ({ formikProps }: Props) => {
  const { values, setFieldValue, errors } = formikProps;

  console.log({ formikProps });

  const handleImageUpload = async (field: ImageField) => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
      aspect: [4, 3],
    };
  
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Sorry, we need camera permissions to make this work!"
        );
        return;
      }
  
      const response = await ImagePicker.launchCameraAsync(options);
  
      if (response.canceled) {
        Alert.alert("Cancelled", "User cancelled camera picker");
      } else if (response.assets && response.assets.length > 0) {
        const { uri, fileName, mimeType } = response.assets[0];
        const file: File = {
          uri: uri || "",
          name: fileName || "image",
          type: mimeType ?? "image/*",
        };
  
        if (field === "installationPhotos") {
          const currentPhotos = values.installationPhotos || [];
          if (currentPhotos.length >= 3) {
            Alert.alert("Limit Reached", "You can only upload up to 3 photos.");
            return;
          }
          setFieldValue(field, [...currentPhotos, file]);
        } else {
          setFieldValue(field, file);
        }
      }
    } catch (error) {
      console.log("An unexpected error occurred:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };
  

  useEffect(() => {
    console.log("Form4 Errors:", errors);
  }, [errors]);

  return (
    <View className="pb-6">
      <ImageButton
        field="installationPhotos"
        value={values.installationPhotos ?? []}
        label={useText.form4.uploadImageButton}
        color="blue"
        onUpload={handleImageUpload}
      />

      <ImageButton
        field="customerSignature"
        value={values.customerSignature ?? null}
        label={useText.form4.uploadConsumerSignatureButton}
        color="green"
        onUpload={handleImageUpload}
      />

      <ImageButton
        field="agentSignature"
        value={values.agentSignature ?? null}
        label={useText.form4.uploadAgentSignatureButton}
        color="orange"
        onUpload={handleImageUpload}
      />
    </View>
  );
};

export default Form4;

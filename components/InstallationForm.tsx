import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Modal, Alert } from "react-native";
import { Formik, FormikProps } from "formik";
import * as Location from "expo-location";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import Button from "./Button";
import CloseButton from "./ui/CloseButton";
import { initialValues } from "@/constants/formInitialValues";
import { File, FormValues } from "@/constants/formTypes";
import { formValidationSchema } from "@/constants/ValidationSchema";
import {
  createForm,
  updateFormById,
  fetchUserData,
  fetchSubProjects,
} from "@/api/apiUtils";
import LoaderSpinner from "./ui/LoaderSpinner";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  initialEditValues?: FormValues;
  formId?: string;
}

const InstallationForm = ({
  isVisible,
  onClose,
  onSubmit,
  initialEditValues,
  formId,
}: Props) => {
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subProjectOptions, setSubProjectOptions] = useState<any[]>([]);

  useEffect(() => {
    if (isVisible) {
      setStep(0);
      fetchLocation();
      fetchAgentId();
    }
  }, [isVisible]);

  const fetchAgentId = async () => {
    try {
      const userData = await fetchUserData();
      setAgentId(userData.id);
    } catch (error) {
      console.error("Failed to fetch agent ID:", error);
      Alert.alert("Error", "Failed to fetch agent information.");
    }
  };

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Failed to fetch location.");
    }
  };

  const getUpdatedValues = (
    initialValues: FormValues,
    updatedValues: FormValues
  ) => {
    const updatedFields: Partial<FormValues> = {};

    for (const key in updatedValues) {
      if (key === "agent" || key === "subProject") {
        continue;
      }
      if (
        updatedValues[key as keyof FormValues] !==
        initialValues[key as keyof FormValues]
      ) {
        updatedFields[key as keyof FormValues] =
          updatedValues[key as keyof FormValues];
      }
    }

    return updatedFields;
  };

  const appendFileToFormData = async (formData: FormData, field: string, file: File) => {
    try {
      const response = await fetch(file.uri);
      const blob = await response.blob();
      formData.append(field, file as unknown as Blob);
    } catch (error) {
      console.error(`Error appending file to FormData: ${error}`);
      throw new Error("Failed to append file to FormData.");
    }
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      if (!agentId) {
        throw new Error("Agent ID is missing.");
      }

      const formData = new FormData();

      if (location) {
        formData.append(
          "location",
          `${location.latitude},${location.longitude}`
        );
      }

      if (!formId) {
        formData.append("agentId", agentId);
      }

      if (formId && initialEditValues) {
        const updatedValues = getUpdatedValues(initialEditValues, values);

        for (const key in updatedValues) {
          if (key === "installationPhotos" && Array.isArray(updatedValues[key])) {
            // Append new installation photos
            for (const file of updatedValues[key]) {
              await appendFileToFormData(formData, "installationPhotos", file);
            }
          } else if (key === "customerSignature" || key === "agentSignature") {
            if (updatedValues[key]) {
              await appendFileToFormData(formData, key, updatedValues[key] as File);
            }
          } else {
            formData.append(key, updatedValues[key as keyof FormValues] as any);
          }
        }
        await updateFormById(formId, formData);
        Alert.alert("Success", "Form updated successfully!");
      } else {
        for (const key of Object.keys(values)) {
          const value = values[key as keyof FormValues];

          if (key === "installationPhotos" && Array.isArray(value)) {
            for (const file of value) {
              await appendFileToFormData(formData, "installationPhotos", file);
            }
          } else if (key === "customerSignature" || key === "agentSignature") {
            if (value) {
              await appendFileToFormData(formData, key, value as File);
            }
          } else {
            formData.append(key, value as any);
          }
        }
        const newForm = await createForm(formData);
        onSubmit(newForm);
        Alert.alert("Success", "Form submitted successfully!");
      }

      setStep(0);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", `Failed to submit the form: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getSubProjects = async () => {
      try {
        const subProjects = await fetchSubProjects();
        setSubProjectOptions(subProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getSubProjects();
  }, []);

  return (
    <Modal visible={isVisible} animationType="slide">
      <View className="flex-1 bg-gray-100">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center p-5">
            <Formik
              key={isVisible ? "form" : "form-hidden"}
              initialValues={initialEditValues || initialValues}
              validationSchema={formValidationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps: FormikProps<FormValues>) => (
                <View className="bg-white px-6 py-3 rounded-lg shadow-lg">
                  <CloseButton onPress={onClose} />
                  <Text className="text-xl font-bold text-gray-800 mb-4">
                    {formId ? "Edit Installation Form" : "Installation Form"}
                  </Text>
                  {step === 0 && (
                    <Form1
                      subProjectOptions={subProjectOptions}
                      formikProps={formikProps}
                    />
                  )}
                  {step === 1 && <Form2 formikProps={formikProps} />}
                  {step === 2 && <Form3 formikProps={formikProps} />}
                  {step === 3 && <Form4 formikProps={formikProps} />}

                  <View className="flex-row justify-between">
                    {step > 0 && (
                      <Button
                        title="Previous"
                        color="bg-[#023047]"
                        textColor="text-white"
                        onPress={() => setStep(step - 1)}
                      />
                    )}

                    {step < 3 ? (
                      <View className="flex-1 flex-row justify-end">
                        <Button
                          title="Next"
                          paddingX="px-8"
                          textColor="text-white"
                          color="bg-[#023047]"
                          onPress={() => setStep(step + 1)}
                        />
                      </View>
                    ) : (
                      <Button
                        title="Submit"
                        color="bg-green-400"
                        textColor="text-white"
                        onPress={() => {
                          if (!formikProps.isValid || !formikProps.dirty) {
                            Alert.alert(
                              "Error",
                              "Please fill in the required fields before submitting."
                            );
                          } else {
                            formikProps.handleSubmit();
                          }
                        }}
                      />
                    )}
                  </View>
                </View>
              )}
            </Formik>
            {isSubmitting && <LoaderSpinner />}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default InstallationForm;
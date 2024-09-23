import { Alert } from "react-native";
import { File, FormValues } from "@/constants/formTypes";

export const isFile = (value: any): value is File =>
  value && typeof value === "object" && "uri" in value;

export const appendFile = async (
  formData: FormData,
  field: string,
  file: File
) => {
  try {
    const response = await fetch(file.uri);
    const blob = await response.blob();
    formData.append(field, file as unknown as Blob);
  } catch (error) {
    console.error(`Error appending file to FormData: ${error}`);
    Alert.alert("Error", "Failed to append file to FormData.");
  }
};

export const appendFormData = async (
  formData: FormData,
  values: FormValues,
  initialValues?: FormValues
) => {
  for (const [key, value] of Object.entries(values)) {
    if (
      initialValues &&
      JSON.stringify(value) ===
        JSON.stringify(initialValues[key as keyof FormValues])
    ) {
      continue;
    }

    if (key === "installationPhotos" && Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (isFile(value[i])) {
          await appendFile(formData, `${key}[${i}]`, value[i]);
        }
      }
    } else if (
      (key === "customerSignature" || key === "agentSignature") &&
      isFile(value)
    ) {
      await appendFile(formData, key, value);
    } else {
      formData.append(key, value as string);
    }
  }
};

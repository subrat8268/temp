import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Pressable } from "react-native";
import { FormikProps } from "formik";
import Dropdown from "./ui/DropDown";
import Input from "./ui/InputButton";
import Button from "./Button";
import { FormValues } from "@/constants/formTypes";
import { useText } from "@/constants/useText";

interface Props {
  formikProps: FormikProps<FormValues>;
  subProjectOptions: any[];
}

const Form1 = ({ formikProps, subProjectOptions }: Props) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const text = useText.addressForm;

  const connectionStatusOptions = [
    { value: "GROUP", label: "Group" },
    { value: "INDIVIDUAL", label: "Individual" },
  ];

  const connectUseOptions = [
    { value: "RESIDENTIAL", label: "Residential" },
    { value: "COMMERCIAL", label: "Commercial" },
  ];

  useEffect(() => {
    console.log("Formik Errors:", formikProps.errors);
    console.log("Formik Touched:", formikProps.touched);
    console.log("Formik Values:", formikProps.values);
  }, [formikProps.errors, formikProps.touched, formikProps.values]);

  if (!formikProps.values) {
    return <Text>Loading...</Text>; // or some loading indicator
  }

  return (
    <ScrollView>
      <Dropdown
        label={useText.form1.projectLabel}
        options={subProjectOptions}
        placeholder={useText.form1.projectPlaceholder}
        value={formikProps.values?.subProjectId}
        onChange={(value) => formikProps.setFieldValue("subProjectId", value)}
        error={formikProps.errors.subProjectId}
        touched={formikProps.touched.subProjectId}
      />

      <Input
        label={useText.form1.customerNameLabel}
        placeholder={useText.form1.customerNamePlaceholder}
        value={formikProps.values.customerName}
        onChangeText={formikProps.handleChange("customerName")}
        onBlur={formikProps.handleBlur("customerName")}
        error={formikProps.errors.customerName}
        touched={formikProps.touched.customerName}
      />

      <Input
        label={useText.form1.mobileNumberLabel}
        placeholder={useText.form1.mobileNumberPlaceholder}
        value={formikProps.values.mobileNo}
        onChangeText={formikProps.handleChange("mobileNo")}
        onBlur={formikProps.handleBlur("mobileNo")}
        keyboardType="phone-pad"
        error={formikProps.errors.mobileNo}
        touched={formikProps.touched.mobileNo}
      />

      <Dropdown
        label={useText.form1.connectionStatusLabel}
        options={connectionStatusOptions}
        placeholder={useText.form1.connectionStatusPlaceholder}
        value={formikProps.values.connectionStatus}
        onChange={(value) =>
          formikProps.setFieldValue("connectionStatus", value)
        }
        error={formikProps.errors.connectionStatus}
        touched={formikProps.touched.connectionStatus}
      />

      <Input
        label={useText.form1.aadharNumberLabel}
        placeholder={useText.form1.aadharNumberPlaceholder}
        value={formikProps.values.aadharNo}
        onChangeText={formikProps.handleChange("aadharNo")}
        keyboardType="numeric"
        onBlur={formikProps.handleBlur("aadharNo")}
        error={formikProps.errors.aadharNo}
        touched={formikProps.touched.aadharNo}
      />

      <Dropdown
        label={useText.form1.connectUseLabel}
        options={connectUseOptions}
        placeholder={useText.form1.connectUsePlaceholder}
        value={formikProps.values.connectionUse}
        onChange={(value) => {
          formikProps.setFieldValue("connectionUse", value);
        }}
        error={formikProps.errors.connectionUse}
        touched={formikProps.touched.connectionUse}
      />

      {/* Add Address Button */}
      <View className="mb-4">
        <Button
          title={
            showAddressForm
              ? useText.form1.hideAddressButton
              : useText.form1.addAddressButton
          }
          textColor="text-white"
          color="bg-[#219ebc]"
          onPress={() => setShowAddressForm(!showAddressForm)}
        />
      </View>

      {/* Address Fields - Hidden/Shown based on button press */}
      {showAddressForm && (
        <View>
          <Text className="text-lg font-bold mb-4">{text.title}</Text>

          <Input
            label={text.labels.plotFlatNo}
            placeholder={text.labels.plotFlatNo}
            value={formikProps.values.plotFlatNo}
            onChangeText={formikProps.handleChange("plotFlatNo")}
            onBlur={formikProps.handleBlur("plotFlatNo")}
            error={formikProps.errors.plotFlatNo}
            touched={formikProps.touched.plotFlatNo}
          />

          <Input
            label={text.labels.buildingName}
            placeholder={text.labels.buildingName}
            value={formikProps.values.buildingName}
            onChangeText={formikProps.handleChange("buildingName")}
            onBlur={formikProps.handleBlur("buildingName")}
            error={formikProps.errors.buildingName}
            touched={formikProps.touched.buildingName}
          />

          <Input
            label={text.labels.areaName}
            placeholder={text.labels.areaName}
            value={formikProps.values.areaName}
            onChangeText={formikProps.handleChange("areaName")}
            onBlur={formikProps.handleBlur("areaName")}
            error={formikProps.errors.areaName}
            touched={formikProps.touched.areaName}
          />

          <Input
            label={text.labels.nearLandmark}
            placeholder={text.labels.nearLandmark}
            value={formikProps.values.nearLandmark}
            onChangeText={formikProps.handleChange("nearLandmark")}
            onBlur={formikProps.handleBlur("nearLandmark")}
            error={formikProps.errors.nearLandmark}
            touched={formikProps.touched.nearLandmark}
          />

          <Input
            label={text.labels.pinCodeNo}
            placeholder={text.labels.pinCodeNo}
            value={formikProps.values.pinCodeNo}
            onChangeText={formikProps.handleChange("pinCodeNo")}
            onBlur={formikProps.handleBlur("pinCodeNo")}
            keyboardType="numeric"
            error={formikProps.errors.pinCodeNo}
            touched={formikProps.touched.pinCodeNo}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Form1;

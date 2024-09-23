import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { FormikProps } from "formik";
import Input from "./ui/InputButton";
import { FormValues } from "@/constants/formTypes";
import { useText } from "@/constants/useText";

interface Props {
  formikProps: FormikProps<FormValues>;
}

const Form2 = ({ formikProps }: Props) => {
  useEffect(() => {
    console.log("Form2 Errors:", formikProps.errors);
  }, [formikProps.errors]);

  return (
    <ScrollView>
      <Input
        label={useText.form2.meterMakeLabel}
        placeholder={useText.form2.meterMakePlaceholder}
        value={formikProps.values.meterMake}
        onChangeText={formikProps.handleChange("meterMake")}
        onBlur={formikProps.handleBlur("meterMake")}
        error={formikProps.errors.meterMake}
        touched={formikProps.touched.meterMake}
      />

      <Input
        label={useText.form2.meterSerialNoLabel}
        placeholder={useText.form2.meterSerialNoPlaceholder}
        value={formikProps.values.meterSerialNo}
        onChangeText={formikProps.handleChange("meterSerialNo")}
        onBlur={formikProps.handleBlur("meterSerialNo")}
        error={formikProps.errors.meterSerialNo}
        touched={formikProps.touched.meterSerialNo}
      />

      <Input
        label={useText.form2.remarkLabel}
        placeholder={useText.form2.remarkPlaceholder}
        value={formikProps.values.remark}
        onChangeText={formikProps.handleChange("remark")}
        onBlur={formikProps.handleBlur("remark")}
        error={formikProps.errors.remark}
        touched={formikProps.touched.remark}
      />

      <Input
        label={useText.form2.emailLabel}
        placeholder={useText.form2.emailPlaceholder}
        value={formikProps.values.email}
        onChangeText={formikProps.handleChange("email")}
        onBlur={formikProps.handleBlur("email")}
        error={formikProps.errors.email}
        touched={formikProps.touched.email}
        keyboardType="email-address"
      />

      <Input
        label={useText.form2.consumerNumberLabel}
        placeholder={useText.form2.consumerNumberPlaceholder}
        value={formikProps.values.consumerNumber}
        onChangeText={formikProps.handleChange("consumerNumber")}
        onBlur={formikProps.handleBlur("consumerNumber")}
        error={formikProps.errors.consumerNumber}
        touched={formikProps.touched.consumerNumber}
        keyboardType="numeric"
      />

      <Input
        label={useText.form2.miuNoLabel}
        placeholder={useText.form2.miuNoPlaceholder}
        value={formikProps.values.meterInterfaceUnitNo}
        onChangeText={formikProps.handleChange("meterInterfaceUnitNo")}
        onBlur={formikProps.handleBlur("meterInterfaceUnitNo")}
        error={formikProps.errors.meterInterfaceUnitNo}
        touched={formikProps.touched.meterInterfaceUnitNo}
      />
    </ScrollView>
  );
};

export default Form2;

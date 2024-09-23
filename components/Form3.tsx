import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { FormikProps } from "formik";
import Input from "./ui/InputButton";
import { FormValues } from "@/constants/formTypes";
import { useText } from "@/constants/useText";

interface Props {
  formikProps: FormikProps<FormValues>;
}

const Form3 = ({ formikProps }: Props) => {
  useEffect(() => {
    console.log("Form2 Errors:", formikProps.errors);
  }, [formikProps.errors]);

  return (
    <ScrollView>
      <Input
        label="Block No"
        placeholder="Enter Block No"
        value={formikProps.values.blockNo}
        onChangeText={formikProps.handleChange("blockNo")}
        onBlur={formikProps.handleBlur("blockNo")}
      />

      <Input
        label="Ward Office"
        placeholder="Enter Ward Office"
        value={formikProps.values.wardOffice}
        onChangeText={formikProps.handleChange("wardOffice")}
        onBlur={formikProps.handleBlur("wardOffice")}
      />

      <Input
        label="Company Name"
        placeholder="Enter Company Name"
        value={formikProps.values.companyName}
        onChangeText={formikProps.handleChange("companyName")}
        onBlur={formikProps.handleBlur("companyName")}
      />

      <Input
        label="Grampanchyat"
        placeholder="Enter Grampanchyat"
        value={formikProps.values.grampanchyat}
        onChangeText={formikProps.handleChange("grampanchyat")}
        onBlur={formikProps.handleBlur("grampanchyat")}
      />

      <Input
        label="No of Family"
        placeholder="Enter No of Family"
        value={formikProps.values.noOfFamily}
        onChangeText={formikProps.handleChange("noOfFamily")}
        onBlur={formikProps.handleBlur("noOfFamily")}
        keyboardType="numeric"
      />
      <Input
        label="No of Family Member"
        placeholder="Enter No of Family Member"
        value={formikProps.values.noOfFamilyMember}
        onChangeText={formikProps.handleChange("noOfFamilyMember")}
        onBlur={formikProps.handleBlur("noOfFamilyMember")}
        keyboardType="numeric"
      />
      <Input
        label="Total Flats"
        placeholder="Enter Total Flats"
        value={formikProps.values.totalFlats}
        onChangeText={formikProps.handleChange("totalFlats")}
        onBlur={formikProps.handleBlur("totalFlats")}
        keyboardType="numeric"
      />

      <Input
        label="Gis Plot Id"
        placeholder="Enter Gis Plot Id"
        value={formikProps.values.gisPlotId}
        onChangeText={formikProps.handleChange("gisPlotId")}
        onBlur={formikProps.handleBlur("gisPlotId")}
      />
    </ScrollView>
  );
};

export default Form3;

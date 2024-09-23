import * as Yup from "yup";
import { useText } from "./useText";

const fileSchema = Yup.object({
  uri: Yup.string().required("File URI is required"),
  name: Yup.string().required("File name is required"),
  type: Yup.string()
    .required("File type is required")
    .matches(/^image\//, "Unsupported file format"),
});

const fileArraySchema = Yup.array().of(fileSchema);

export const formValidationSchema = Yup.object().shape({
  subProjectId: Yup.string().required("Sub Project is required"),
  customerName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Customer Name must be alphabets only")
    .required("Customer Name is required"),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile Number must be a 10-digit number")
    .required("Mobile Number is required"),
  connectionStatus: Yup.string().required("Connection Status is required"),
  aadharNo: Yup.string()
    .matches(/^[0-9]{12}$/, "Aadhar Number must be a 12-digit number")
    .required("Aadhar Number is required"),
  connectionUse: Yup.string().required("Connection Use is required"),
  plotFlatNo: Yup.string().required("Plot/Flat No is required"),
  buildingName: Yup.string().required("Building Name is required"),
  areaName: Yup.string().required("Area Name is required"),
  nearLandmark: Yup.string().required("Landmark is required"),
  pinCodeNo: Yup.string()
    .matches(/^[0-9]{6}$/, "Pin Code must be a 6-digit number")
    .required("Pin Code is required"),
  meterMake: Yup.string().required("Meter Make is required"),
  meterSerialNo: Yup.string().required("Meter Serial Number is required"),
  remark: Yup.string().required("Remark is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  consumerNumber: Yup.string().required("Consumer Number is required"),
  meterInterfaceUnitNo: Yup.string().required("MIU Number is required"),
  blockNo: Yup.string(),
  wardOffice: Yup.string(),
  companyName: Yup.string(),
  grampanchyat: Yup.string(),
  noOfFamily: Yup.string().matches(/^[0-9]+$/, "Must be a number"),
  noOfFamilyMember: Yup.string().matches(/^[0-9]+$/, "Must be a number"),
  totalFlats: Yup.string(),
  gisPlotId: Yup.string(),
  installationPhotos: fileArraySchema.notRequired(),
  customerSignature: fileSchema.notRequired(),
  agentSignature: fileSchema.notRequired(),
});

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().trim().required(useText.usernameRequired),
  password: Yup.string().trim().required(useText.passwordRequired),
});

import { ReactNode } from "react";

export interface FormValues {
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
  subProject: any;
  agent: any;
  location: ReactNode;
  subProjectId: string;
  customerName: string;
  mobileNo: string;
  connectionStatus: string;
  aadharNo: string;
  connectionUse: string;
  plotFlatNo: string;
  buildingName: string;
  areaName: string;
  nearLandmark: string;
  pinCodeNo: string;
  meterMake: string;
  meterSerialNo: string;
  remark: string;
  email: string;
  consumerNumber: string;
  meterInterfaceUnitNo: string;
  blockNo: string;
  wardOffice: string;
  companyName: string;
  grampanchyat: string;
  noOfFamily: string;
  noOfFamilyMember: string;
  totalFlats: string;
  gisPlotId: string;
  installationPhotos?: File[];
  customerSignature?: File;
  agentSignature?: File;
}

export interface File {
  uri: string;
  name?: string;
  type?: string;
}

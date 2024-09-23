import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { fetchFormDetails } from "@/api/apiUtils";
import EditButton from "./ui/EditButton";
import InstallationForm from "./InstallationForm";
import { FormValues } from "@/constants/formTypes";
import LoadingSpinner from "./ui/LoaderSpinner";
import DetailHeader from "./DetailHeader";
import Typography from "./Typography";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const DetailPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { formId } = route.params as { formId: string };

  const [formDetails, setFormDetails] = useState<FormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadFormDetails = async () => {
      setLoading(true);
      try {
        const details = await fetchFormDetails(formId);
        console.log("Details:", details);
        setFormDetails({
          ...details,
          installationPhotos: details.installationPhotos.map((i: any) => ({
            name: "Installation images",
            type: "image/*",
            uri: i,
          })),
          customerSignature: details.customerSignature
            ? {
                uri: details.customerSignature,
                name: "Customer Signature",
                type: "image/*",
              }
            : undefined,
          agentSignature: details.agentSignature
            ? {
                uri: details.agentSignature,
                name: "Agent Signature",
                type: "image/*",
              }
            : undefined,
        });
      } catch (error) {
        console.error("Failed to load form details:", error);
        Alert.alert("Error", "Failed to load form details.");
      } finally {
        setLoading(false);
      }
    };

    console.log("--------------", formDetails);

    loadFormDetails();
  }, [formId, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (updatedValues: FormValues) => {
    setFormDetails(updatedValues);
    setIsEditing(false);
    Alert.alert("Success", "Form updated successfully!");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!formDetails) {
    return (
      <View className="flex-1 justify-center items-center">
        <Typography>Form details not found</Typography>
      </View>
    );
  }

  const date = new Date(formDetails.createdAt);

  

  const formattedDateTime = `${date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })} ${date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  })}`;

  const detailItems = [
    { label: "Customer", value: formDetails.customerName },
    { label: "Mobile No", value: formDetails.mobileNo },
    { label: "Aadhar No", value: formDetails.aadharNo },
    {
      label: "Address",
      value: `${formDetails.plotFlatNo}, ${formDetails.buildingName}, ${formDetails.areaName}, ${formDetails.nearLandmark}, ${formDetails.pinCodeNo}`,
    },
    { label: "Connection Status", value: formDetails.connectionStatus },
    { label: "Consumer No", value: formDetails.consumerNumber },
    { label: "Connection Use", value: formDetails.connectionUse },
    { label: "Meter Make", value: formDetails.meterMake },
    { label: "Meter Serial No", value: formDetails.meterSerialNo },
    { label: "MIU No", value: formDetails.meterInterfaceUnitNo },
    { label: "Remark", value: formDetails.remark },
    { label: "Email", value: formDetails.email },
    { label: "Location", value: formDetails.location },
    { label: "Block No", value: formDetails.blockNo },
    { label: "Ward Office", value: formDetails.wardOffice },
    { label: "Company Name", value: formDetails.companyName },
    { label: "Grampanchayat", value: formDetails.grampanchyat },
    { label: "No of Family", value: formDetails.noOfFamily },
    { label: "No of Family Members", value: formDetails.noOfFamilyMember },
    { label: "Total Flats", value: formDetails.totalFlats },
    { label: "GIS Plot Id", value: formDetails.gisPlotId },
    { label: "Project", value: formDetails.subProject.project.name },
    { label: "Sub-Project", value: formDetails.subProject.name },
    { label: "Created At", value: formattedDateTime },
  ];

  return (
    <View className="mb-2">
      <DetailHeader navigation={navigation} />
      <ScrollView className="p-5 mb-3 bg-gray-200 ">
        {isEditing ? (
          <InstallationForm
            isVisible={isEditing}
            initialEditValues={formDetails}
            onClose={() => setIsEditing(false)}
            onSubmit={handleFormSubmit}
            formId={formId}
          />
        ) : (
          <View>
            <View className="flex flex-row items-center">
              <MaterialCommunityIcons name="form-select" size={24} color="black" style={{marginBottom: 8}} />
              <Typography fontWeight={"Bold"} className="text-xl ml-1 mb-2 uppercase">
                Form Details
              </Typography>
            </View>

            <View className="mb-5 p-3 bg-white rounded-lg">
              {detailItems.map((item, index) => (
                <View
                  key={index}
                  className=" flex flex-row justify-between border-b border-gray-300"
                >
                  <Typography className="pb-1 pt-2 w-[40%] opacity-50">
                    {item.label}:
                  </Typography>
                  <Typography className="text-[12px] w-[60%] text-right py-2">{item.value}</Typography>
                </View>
              ))}

              {formDetails.installationPhotos &&
                formDetails.installationPhotos.length > 0 && (
                  <>
                    <Typography className="mt-5 opacity-50">
                      Installation Photos:
                    </Typography>
                    <View className="flex flex-row flex-wrap">
                      {formDetails.installationPhotos.map(
                        (
                          photo: string | { uri: string } | undefined | any,
                          index: React.Key | null | undefined
                        ) => (
                          <Image
                            key={index}
                            source={{
                              uri:
                                typeof photo === "string" ? photo : photo.uri,
                            }}
                            style={{ height: 150, width: 80, marginRight: 5 }}
                            resizeMode="contain"
                          />
                        )
                      )}
                    </View>
                  </>
                )}

              {formDetails.customerSignature && (
                <>
                  <Typography className="mt-2 opacity-50">
                    Customer Signature:
                  </Typography>
                  <Image
                    source={{
                      uri:
                        typeof formDetails.customerSignature === "string"
                          ? formDetails.customerSignature
                          : formDetails.customerSignature.uri,
                    }}
                    style={{ height: 150, width: 80}}
                    resizeMode="contain"
                  />
                </>
              )}

              {formDetails.agentSignature && (
                <>
                  <Typography className="mt-2 opacity-50">
                    Agent Signature:
                  </Typography>
                  <Image
                    source={{
                      uri:
                        typeof formDetails.agentSignature === "string"
                          ? formDetails.agentSignature
                          : formDetails.agentSignature.uri,
                    }}
                    style={{ height: 150, width: 80 }}
                    resizeMode="contain"
                  />
                </>
              )}

              <View className="pb-10">
                <EditButton onPress={handleEdit} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailPage;

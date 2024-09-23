import { FormValues } from "@/constants/formTypes";
import axiosInstance from "./axiosInstance";
import { API_ROUTES } from "@/api/apiRoutes";

export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.ME);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post(API_ROUTES.LOGOUT);
    console.log("Logout successful");
  } catch (error) {
    console.error("Failed to logout:", error);
    throw error;
  }
};

export const fetchSubProjects = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.ME);
    const assignedSubProjectNames = response.data.assignedSubProjects.map(
      (subProject: any) => {
        console.log(subProject?.subProject?.id, subProject?.subProject?.name);
        return {
          value: subProject?.subProject?.id,
          label: subProject?.subProject?.name,
          type: "subproject",
        };
      }
    );

    return assignedSubProjectNames;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const createForm = async (formData: any) => {
  try {
    const response = await axiosInstance.post(
      API_ROUTES.CREATE_FORM,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating form:", error);
    // Log more details about the error
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }

    throw error;
  }
};

export const fetchAllForms = async (page: number = 1, limit: number = 50) => {
  const url = `${API_ROUTES.GET_ALL_FORMS}?page=${page}&limit=${limit}`;

  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching all forms:", error);
    throw error;
  }
};

export const fetchFormDetails = async (formId: string) => {
  try {
    const response = await axiosInstance.get(
      `${API_ROUTES.GET_FORM_BY_ID}/${formId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch form details:", error);
    throw error;
  }
};

export const updateFormById = async (formId: string, formData: any) => {
  try {
    const response = await axiosInstance.patch(
      `${API_ROUTES.UPDATE_FORM_BY_ID}/${formId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update form:", error);
    throw error;
  }
};

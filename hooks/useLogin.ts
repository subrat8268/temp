import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "@/api/apiRoutes";
import { useErrorToast } from "@/components/ErrorToast";
import { API_BASE_URL } from "@/api/axiosInstance";
import {
  storeToken,
  checkTokenExpiration,
  useAuthNavigation,
} from "../utils/authUtils";

interface LoginValues {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const useLogin = (values?: LoginValues) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { showError } = useErrorToast();
  const { navigateToLogin } = useAuthNavigation();

  useEffect(() => {
    const login = async () => {
      if (!values || isLoading) return;
      setIsLoading(true);
      try {
        const response = await axios.post<LoginResponse>(
          `${API_BASE_URL}${API_ROUTES.LOGIN}`,
          values
        );
        const token = response.data.access_token;
        await storeToken(token);
        setAccessToken(token);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          showError(
            error.response.data.message || "Please check your credentials."
          );
        } else {
          showError("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    login();
  }, [values, showError]);

  useEffect(() => {
    const checkExpiration = async () => {
      const isExpired = await checkTokenExpiration();
      if (isExpired) {
        navigateToLogin();
      }
    };

    const expirationTimer = setInterval(checkExpiration, 60000); // Check every minute

    return () => clearInterval(expirationTimer);
  }, [navigateToLogin]);

  return {
    isLoading,
    accessToken,
  };
};

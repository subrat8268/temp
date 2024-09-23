import { useEffect, useState } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { Formik, FormikHelpers } from "formik";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import InputUsername from "@/components/InputUsername";
import InputPassword from "@/components/InputPassword";
import Button from "@/components/Button";
import { useText } from "@/constants/useText";
import { RootStackParamList } from "../index";
import { loginValidationSchema } from "@/constants/ValidationSchema";
import { useLogin } from "@/hooks/useLogin";
import LoadingSpinner from "@/components/ui/LoaderSpinner";
import Typography from "@/components/Typography";

interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [loginValues, setLoginValues] = useState<FormValues | undefined>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isLoading, accessToken } = useLogin(loginValues);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("#000000");
  }, []);

  useEffect(() => {
    if (accessToken) {
      navigation.replace("Home");
    }
  }, [accessToken, navigation]);

  const handleLogin = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setLoginValues(values);
    setSubmitting(false);
    console.log("Login values:", values);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center p-6 bg-white">
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <View className="mb-6">
                <Typography
                  fontWeight={"Bold"}
                  className="text-4xl text-gray-700 text-center"
                >
                  {useText.loginTitle}
                </Typography>
              </View>
              <InputUsername
                value={values.username}
                onChangeText={(text) => {
                  const filteredText = text.replace(/\s/g, "");
                  handleChange("username")(filteredText);
                }}
                onBlur={handleBlur("username")}
                error={touched.username && errors.username}
                placeholder={useText.usernamePlaceholder}
              />
              <InputPassword
                value={values.password}
                onChangeText={(text) => {
                  const filteredText = text.replace(/\s/g, "");
                  handleChange("password")(filteredText);
                }}
                onBlur={handleBlur("password")}
                error={touched.password && errors.password}
                placeholder={useText.passwordPlaceholder}
              />
              <View className="mt-2">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <Button
                    title={useText.loginButton}
                    onPress={handleSubmit}
                    paddingY="p-3"
                    disabled={isSubmitting || isLoading}
                  />
                )}
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default Login;

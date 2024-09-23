import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

interface ErrorToastContextType {
  showError: (message: string) => void;
}

const ErrorToastContext = createContext<ErrorToastContextType | undefined>(
  undefined
);

export const useErrorToast = (): ErrorToastContextType => {
  const context = useContext(ErrorToastContext);
  if (!context) {
    throw new Error("useErrorToast must be used within an ErrorToastProvider");
  }
  return context;
};

interface ErrorToastProviderProps {
  children: ReactNode;
}

export const ErrorToastProvider: FC<ErrorToastProviderProps> = ({
  children,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  const showError = useCallback((message: string) => {
    setErrorMessage(message);
  }, []);

  useEffect(() => {
    if (errorMessage) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(1400),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setErrorMessage(null));
    }
  }, [errorMessage, fadeAnim]);

  return (
    <ErrorToastContext.Provider value={{ showError }}>
      {children}
      {errorMessage && (
        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
          <View style={styles.toast}>
            <Text style={styles.toastText}>{errorMessage}</Text>
          </View>
        </Animated.View>
      )}
    </ErrorToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  toast: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  toastText: {
    color: "white",
    fontSize: 16,
  },
});

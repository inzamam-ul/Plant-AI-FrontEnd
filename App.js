import { StatusBar } from "expo-status-bar";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    secondary: "#f1c40f",
    primaryContainer: "red",
    secondaryContainer: "white",
  },
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={theme}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="auto" />
      </PaperProvider>
    );
  }
}

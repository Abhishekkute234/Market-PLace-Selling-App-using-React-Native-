import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import {
  ClerkProvider,
  ClerkLoaded,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";
import { ActivityIndicator, View } from "react-native"; // Import ActivityIndicator for loading state
import LoginScreen from "../components/LoginScreen"; // Fixed typo in path

export default function RootLayout() {
  // Load custom fonts

  const [fontsLoaded] = useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-Medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-Bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  // If fonts are not loaded, show a loading indicator
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ClerkLoaded>
        {/* if user is signed in, show the main app */}
        {/* <SignedIn> */}
        <Stack>
          <Stack.Screen
            name="(tabs)" // Ensure this corresponds to your tab navigator
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        {/* </SignedIn> */}

        {/* if user is signed out, show the login screen */}
        {/* <SignedOut>
          <LoginScreen />
        </SignedOut> */}
      </ClerkLoaded>
    </ClerkProvider>
  );
}

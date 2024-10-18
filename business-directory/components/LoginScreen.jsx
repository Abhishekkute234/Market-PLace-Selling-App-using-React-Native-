import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-auth-session";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store"; // Import SecureStore for token storage

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      console.log("Starting OAuth flow...");
      const { tokens } = await startOAuthFlow(); // Start the OAuth flow

      console.log("Tokens received:", tokens); // Log received tokens

      if (tokens) {
        await SecureStore.setItemAsync("userToken", tokens.accessToken);
        console.log("User logged in, token stored:", tokens.accessToken);
      } else {
        console.warn("No tokens received");
      }
    } catch (err) {
      console.error("OAuth error", JSON.stringify(err, null, 2));
      alert(`OAuth error: ${err.message || "Unknown error"}`); // Alert with the error message
    }
  }, [startOAuthFlow]);

  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/login.png")}
        style={styles.image}
      />
      <Text style={styles.text}>
        User Ultimate{" "}
        <Text style={styles.innerText}>Community Business Directory</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Let's Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  image: {
    width: 600,
    height: 500,
    resizeMode: "contain",
    borderRadius: 150,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  innerText: {
    color: "violet",
  },
  button: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "violet",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import { ClerkProvider } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { Stack } from "expo-router";

const publishableKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file"
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="loading" />
      </Stack>
    </ClerkProvider>
  );
}

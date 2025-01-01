import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#6200EE",
        },
        headerTitleAlign: "center",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="(screens)/landing" // matches home.tsx
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(screens)/home" // matches home.tsx
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(screens)/login" // matches login.tsx
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(screens)/register" // matches register.tsx
        options={{
          headerTitle: "Register",
        }}
      />
    </Stack>
  );
}

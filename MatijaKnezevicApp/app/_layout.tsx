import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import AuthProvider from "@/context/AuthContext";
import ThemeProvider from "@/context/ThemeContext";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
      <AuthProvider>
          <ThemeProvider>
              <Stack>
                  <Stack.Screen name="welcome" options={{ headerShown: false }} />
                  <Stack.Screen name="login" options={{ headerShown: false }} />
                  <Stack.Screen name="signup" options={{ headerShown: false }} />
                  <Stack.Screen
                      name="modal-add-task"
                      options={{ presentation: "modal", headerShown: false }}
                  />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="task/[id]" options={{ headerShown: false }} />
                  <Stack.Screen name="edit/[id]" options={{ headerShown: false }} />
              </Stack>

              <StatusBar style="auto" />
          </ThemeProvider>
       </AuthProvider>
  );
}

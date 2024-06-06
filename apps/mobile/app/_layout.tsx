import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import MontserratBold from "@/assets/fonts/Montserrat-Bold.ttf";
import MontserratLight from "@/assets/fonts/Montserrat-Light.ttf";
import MontserratMedium from "@/assets/fonts/Montserrat-Medium.ttf";
import MontserratRegular from "@/assets/fonts/Montserrat-Regular.ttf";
import MontserratSemiBold from "@/assets/fonts/Montserrat-SemiBold.ttf";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const [fontsLoaded] = useFonts({
    "Montserrat-Light": MontserratLight,
    "Montserrat-Regular": MontserratRegular,
    "Montserrat-Medium": MontserratMedium,
    "Montserrat-SemiBold": MontserratSemiBold,
    "Montserrat-Bold": MontserratBold,
});

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

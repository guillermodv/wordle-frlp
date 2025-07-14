import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ScoreProvider } from '../context/ScoreContext';

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();

      const inAuthGroup = segments[0] === '(auth)';

      if (user && inAuthGroup) {
        router.replace('/');
      } else if (!user && !inAuthGroup) {
        router.replace('/login');
      }
    }
  }, [user, loading, segments, router]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ScoreProvider>
        <InitialLayout />
      </ScoreProvider>
    </AuthProvider>
  );
}

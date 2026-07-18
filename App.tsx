import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import AppNavigator from '@/components/navigation/AppNavigator';
import '@/global.css';
import { Uniwind } from 'uniwind';
import { useThemeStore } from '@/store/themeStore';

export default function App() {
  const mode = useThemeStore(state => state.mode);

  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider mode={mode}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </SafeAreaListener>
  );
}

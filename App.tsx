import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import AppNavigator from '@/components/navigation/AppNavigator';
import '@/global.css';
import { Uniwind } from 'uniwind';

export default function App() {
  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider mode="dark">
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </SafeAreaListener>
  );
}

/**
 * @format
 */

import { AppRegistry, Text, TextInput, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FlashMessage from 'react-native-flash-message';

import { store, persistor } from './src/Redux/Reducer';
import CustomDrawerComp from './src/Components/CustomDrawerComp';
import { DrawerProvider } from './src/Context/DrawerContext';
import drawerContentComp from './src/Components/DrawerContentComp'; // ✅ Use your own drawer

// ✅ Initialize React Query client
const queryClient = new QueryClient();

// ✅ Disable font scaling globally
[Text, TextInput, View].forEach(component => {
  if (component.defaultProps == null) component.defaultProps = {};
  component.defaultProps.allowFontScaling = false;
});

// ✅ App component wrapped with all providers
const AFHTechnology = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <DrawerProvider>
          <CustomDrawerComp drawerContent={drawerContentComp}>
            <App />
          </CustomDrawerComp>
        </DrawerProvider>
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => AFHTechnology);

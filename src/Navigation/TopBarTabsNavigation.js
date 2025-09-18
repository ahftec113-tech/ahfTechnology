import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { hp } from '../Hooks/useResponsive';

const Tab = createMaterialTopTabNavigator();

/**
 * A reusable dynamic top bar navigation component.
 * @param {Array} screens - Array of objects, each with { name: string, component: React.Component, label: string }
 * @param {Object} navigatorProps - Optional props to pass to Tab.Navigator (e.g., initialRouteName, screenOptions)
 */
const DynamicTopBarNavigator = ({ screens, navigatorProps = {} }) => {
  if (!screens || screens.length === 0) {
    return null; // Or render a fallback UI
  }

  return (
    <Tab.Navigator
      {...navigatorProps}
      screenOptions={{
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white' },
        sceneStyle: { backgroundColor: 'white' },
        ...navigatorProps.screenOptions, // Allow overriding
      }}
    >
      {screens.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ tabBarLabel: screen.label }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default DynamicTopBarNavigator;

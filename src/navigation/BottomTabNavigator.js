// src/navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your screens
import HomeScreen from '../screens/HomeScreen';

import CartScreen from '../screens/CartScreen';

import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  // const [fontsLoaded] = useFonts({
  //   "Manjari-Regular": require("../assets/fonts/Manjari-Regular.ttf"),
  //   "Manjari-Bold": require("../asset/fonts/Manjari-Bold.ttf"),
  //   "Manjari-Thin": require("../asset/fonts/Manjari-Thin.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return  <AppLoading />
  // }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }  else if (route.name === 'CartScreen') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6cc51d',
        tabBarInactiveTintColor: '#868889',
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight:"600",
          fontFamily:"Poppins-SemiBold"
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      
      <Tab.Screen 
        name="CartScreen" 
        component={CartScreen} 
        options={{ title: 'Cart' }}
      />
    
    </Tab.Navigator>
  );
}
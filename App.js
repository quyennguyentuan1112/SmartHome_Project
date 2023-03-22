import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './src/components/HomeScreen';
import LoginScreen from './src/components/LoginScreen';
import { View, StyleSheet } from 'react-native';

import TabNavigation from './src/navigation/TabNavigation';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  return (

    <>
      <TabNavigation />

    </>



  );
}




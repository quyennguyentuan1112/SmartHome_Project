import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import HomeScreen from "./src/components/HomeScreen";
import SettingsScreen from "./src/components/SettingsScreen";
import UserScreen from "./src/components/UserScreen";
import LoginScreen from "./src/components/LoginScreen";



const UserStack = createNativeStackNavigator();

const UserNavigation = () => {
    return (
        <UserStack.Navigator>
            <UserStack.Screen name='User' component={UserScreen} />
        </UserStack.Navigator>
    )

}

const SettingsStack = createNativeStackNavigator();

const SettingsNavigation = () => {
    return (
        <SettingsStack.Navigator >
            <SettingsStack.Screen name='Settings' component={SettingsScreen} />
        </SettingsStack.Navigator>
    )

}

const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name='Home' component={HomeScreen} />
        </HomeStack.Navigator>
    )

}

const Tab = createBottomTabNavigator();

const MyTheme = {
    dark: false,
    colors: {
      primary: '#FFB267',// ấn vào là nó hiện lên kiểu hover
      background: '#2C3639',
      card: '#2C3639',
      text: '#F8F8F8',
      border: '#2C3639',
      notification: '#FFB267',
    },
  };

const TabNavigation = () => {
    return (
        <>
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator screenOptions={{ headerShown: false }} >
                <Tab.Screen name="Home" component={HomeNavigation} />
                <Tab.Screen name="User" component={UserNavigation} />
                <Tab.Screen name="Settings" component={SettingsNavigation} />

            </Tab.Navigator>
        </NavigationContainer>
        </>
        
    )

}

export default function App() {
  return (

    <>
      {/* <TabNavigation /> */}
      <LoginScreen />
    </>



  );
}




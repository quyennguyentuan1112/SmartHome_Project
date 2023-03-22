import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import SettingsNavigation from "./SettingsNavigation";
import UserNavigation from "./UserNavigation";
import HomeNavigation from "./HomeNavigation";


const Tab = createBottomTabNavigator();

const MyTheme = {
    dark: false,
    colors: {
      primary: '#FFB267',// ấn vào là nó hiện lên kiểu hover
      background: '#211D1D',
      card: '#211D1D',
      text: '#F8F8F8',
    //   border: 'red',
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

export default TabNavigation;
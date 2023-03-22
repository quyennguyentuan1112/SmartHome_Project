import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import SettingsScreen from "../components/SettingsScreen";
import LoginScreen from "../components/LoginScreen";

const SettingsStack = createNativeStackNavigator();

const SettingsNavigation = () => {
    return (
        <SettingsStack.Navigator >
            <SettingsStack.Screen name='Settings' component={SettingsScreen} />
            <SettingsStack.Screen name='Login' component={LoginScreen} />
        </SettingsStack.Navigator>
    )

}

export default SettingsNavigation;
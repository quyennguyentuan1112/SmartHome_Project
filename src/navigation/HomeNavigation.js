import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import HomeScreen from "../components/HomeScreen";
import LoginScreen from "../components/LoginScreen";

const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name='Home' component={HomeScreen} />
            <HomeStack.Screen name='Login' component={LoginScreen} />
        </HomeStack.Navigator>
    )

}

export default HomeNavigation;
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import UserScreen from "../components/UserScreen";
import LoginScreen from "../components/LoginScreen";

const UserStack = createNativeStackNavigator();

const UserNavigation = () => {
    return (
        <UserStack.Navigator>
            <UserStack.Screen name='User' component={UserScreen} />
            <UserStack.Screen name='Login' component={LoginScreen} />
        </UserStack.Navigator>
    )

}

export default UserNavigation;
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from "./src/components/HomeScreen";
import SettingsScreen from "./src/components/SettingsScreen";
import UserScreen from "./src/components/UserScreen";
import LoginScreen from "./src/components/LoginScreen";
import RegisterScreen from "./src/components/RegisterScreen";
import ChooseHouseScreen from "./src/components/ChooseHouseScreen";



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
    dark: true,
    colors: {
        primary: '#FFB267',// ấn vào là nó hiện lên kiểu hover
        background: '#393E46',
        card: '#393E46',
        text: '#F8F8F8',
        border: '#2C3639',
        notification: '#FFB267',
    },
};



const TabNavigation = () => {
    return (
        <>
            <Tab.Navigator
                initialRouteName="Home"
                tabBarOptions={{
                    activeTintColor: '#FFB267',
                }} 
                screenOptions={{ headerShown: false }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeNavigation}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="ios-home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsNavigation}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="ios-settings" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Messages"
                    component={UserNavigation}
                    options={{
                        tabBarLabel: 'Messages',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="ios-mail" color={color} size={size} />
                        ),
                        tabBarBadge: 3,
                    }}
                />
            </Tab.Navigator>
        </>

    )

}

const Login = createNativeStackNavigator();

const LoginNavigation = () => {
    return (
        <Login.Navigator screenOptions={{ headerShown: false }}>
            <Login.Screen name="Login" component={LoginScreen} />
            <Login.Screen name="Register" component={RegisterScreen} />
            <Login.Screen name="Tab" component={TabNavigation} />
        </Login.Navigator>
    )



}

export default function App() {
    return (

        <>

            <NavigationContainer theme={MyTheme}>
                <LoginNavigation />
            </NavigationContainer>
            

        </>



    );
}




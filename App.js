import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from "./src/components/HomeScreen";
import SettingsScreen from "./src/components/NotificationScreen";
import NotificationScreen from "./src/components/NotificationScreen";
import LoginScreen from "./src/components/LoginScreen";
import RegisterScreen from "./src/components/RegisterScreen";
import ChooseHouseScreen from "./src/components/ChooseHouseScreen";
import LampScreen from "./src/components/LampScreen";
import UserScreen from "./src/components/UserScreen";
import axios from "axios";





const NotificationsStack = createNativeStackNavigator();

const NotificationsNavigation = () => {
    return (
        <NotificationsStack.Navigator>
            <NotificationsStack.Screen name='Notifications' component={NotificationScreen} />
        </NotificationsStack.Navigator>
    )

}

const UserStack = createNativeStackNavigator();

const UserNavigation = () => {
    return (
        <UserStack.Navigator >
            <UserStack.Screen name='User' component={UserScreen} />
        </UserStack.Navigator>
    )

}

const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name='Home' component={HomeScreen} />
            <HomeStack.Screen name='Lamp' component={LampScreen} />
        </HomeStack.Navigator>
    )

}

const Tab = createBottomTabNavigator();

const MyTheme = {
    dark: true,
    colors: {
        primary: '#FFB267',// ấn vào là nó hiện lên kiểu hover
        background: '#222831',
        card: '#222831',
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
                    name="Notification"
                    component={NotificationsNavigation}
                    options={{
                        tabBarLabel: 'Notification',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="ios-notifications" color={color} size={size} />
                        ),
                        tabBarBadge: 3,
                    }}
                />
                <Tab.Screen
                    name="User"
                    component={UserNavigation}
                    options={{
                        tabBarLabel: 'User',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person" color={color} size={size} />
                        ),
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


////////////////////////////////////////////////////////////////

const fetchApi = async () => {
    try {
        const res = await axios.get('http://192.168.0.107:8000/')
        console.log(res.data);
    } catch (error) {
        console.log('error massage: ', error.message);
    }
}

useEffect(() => {
    fetchApi();
}, [])

////////////////////////////////////////////////////////////////


    return (

        <>

            <NavigationContainer theme={MyTheme}>
                <LoginNavigation />
            </NavigationContainer>
            
            <StatusBar barStyle="light-content" backgroundColor="#222831" />
        </>



    );
}




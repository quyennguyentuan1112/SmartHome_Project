import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';


import HomeScreen from "./src/components/HomeScreen";
import SettingsScreen from "./src/components/NotificationScreen";
import NotifyScreen from "./src/components/NotificationScreen";
import LoginScreen from "./src/components/LoginScreen";
import RegisterScreen from "./src/components/RegisterScreen";
import ChooseHouseScreen from "./src/components/ChooseHouseScreen";
import LampScreen from "./src/components/LampScreen";
import UserScreen from "./src/components/UserScreen";
import MicroScreen from "./src/components/MicroScreen";
import DeviceFormScreen from "./src/components/AddDeviceScreen";
import ListDeviceScreen from "./src/components/ListDeviceScreen";
import FanControlScreen from "./src/components/FanControlScreen";
import ListTemperatureHumidity from "./src/components/ListTemperatureHumidity";
import axios from "axios";

import LampScreenv2 from "./src/components/LampScreenV2";



    const HomeStack = createNativeStackNavigator();

    const HomeNavigation = ({route}) => {
        const { homeId } = route.params;
        return (
            <HomeStack.Navigator initialRouteName="Home">
                <HomeStack.Screen name='Home' component={HomeScreen} initialParams={{ homeId: homeId }}/>
                <HomeStack.Screen name='Fan' component={FanControlScreen} />
                <HomeStack.Screen name='Lamp' component={LampScreen} />
                <HomeStack.Screen name='AddDevice' component={DeviceFormScreen} />
                <HomeStack.Screen name='Miccontrol' component={MicroScreen} />
                <HomeStack.Screen name='ListDevice' component={ListDeviceScreen}/>
                <HomeStack.Screen name='Temperature and Humididty' component={ListTemperatureHumidity}/>
                {/* <HomeStack.Screen name='Light' component={LightControl}/> */}
            </HomeStack.Navigator>
        )

    }

    const Tab = createBottomTabNavigator();

    const TabNavigation = ({ route }) => {
        const { homeId } = route.params;
        return (
            <>
                <Tab.Navigator
                    initialRouteName="HomeTab"
                    tabBarOptions={{
                        activeTintColor: '#222831',
                    }} 
                    screenOptions={{ headerShown: false }}
                >
                    <Tab.Screen
                        name="HomeTab"
                        component={HomeNavigation}
                        initialParams={{ homeId: homeId }}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <Icon name="ios-home" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Notification"
                        component={NotifyScreen}
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
                        component={UserScreen}
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



// useEffect(() => {
    
// }, [])

////////////////////////////////////////////////////////////////


    return (

        <>

            <NavigationContainer>
                <LoginNavigation />
            </NavigationContainer>
            {/* <ListTemperatureHumidity /> */}
            
            {/* <StatusBar barStyle="light-content" backgroundColor="#222831" /> */}
        </>



    );
}




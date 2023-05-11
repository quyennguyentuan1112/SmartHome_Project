import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from "./src/api/client";


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
// const ListTemperatureHumidity = required('./src/components/ListTemperatureHumidity');
import axios from "axios";

import LampScreenv2 from "./src/components/LampScreenV2";



const HomeStack = createNativeStackNavigator();

const HomeNavigation = ({ route }) => {
    const { homeId, addEvent } = route.params;
    useEffect(() => {
        console.log("tai homestack homeID: " + homeId);
    }, [])
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name='Home' component={HomeScreen} initialParams={{ homeId, addEvent }} />
            <HomeStack.Screen name='Fan' component={FanControlScreen} />
            <HomeStack.Screen name='Lamp' component={LampScreenv2} />
            <HomeStack.Screen name='AddDevice' component={DeviceFormScreen} />
            <HomeStack.Screen name='Miccontrol' component={MicroScreen} />
            <HomeStack.Screen name='ListDevice' component={ListDeviceScreen} />
            <HomeStack.Screen name='Temperature and Humididty' component={ListTemperatureHumidity} />
            {/* <HomeStack.Screen name='Light' component={LightControl}/> */}
        </HomeStack.Navigator>
    )

}

const Tab = createBottomTabNavigator();

const TabNavigation = ({ route }) => {
    const { homeId } = route.params;
    const [listNotification, setListNotification] = useState([
        {
            id: 100,
            messageDescription: "haha",
            result: "thanh cong",
            homeId : "q",
            formattedDatetime: getCurrentDateTime(),
            isSeen: "0",
            
        }
    ]);
    const [unSeen, setUnSeen] = useState(0);

    const deleteNotification = async () => {
        setListNotification([]);
        setUnSeen(0);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                homeId: homeId
            }),
        };
        try {
            const success = await api('delete-all-notification', options);
            console.log(success);
        } catch (error) {
            console.log(error);
        }
    }

    const updateSeen = async () => {
        setUnSeen(0);
        let dataTemp = listNotification;
        for (let i = 0; i < dataTemp.length; i++) {
            dataTemp[i].isSeen = 1;
        }
        setListNotification(dataTemp);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                homeId: homeId
            }),
        };
        try {
            const success = await api('update-seen', options);
            console.log(success);
        } catch (error) {
            console.log(error);
        }
    }

    function getCurrentDateTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = padNumber(now.getMonth() + 1);
        const day = padNumber(now.getDate());
        const hours = padNumber(now.getHours());
        const minutes = padNumber(now.getMinutes());
        const seconds = padNumber(now.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function padNumber(number) {
        return number.toString().padStart(2, '0');
    }

    const addEvent = async (messageDescription, result) => {
        setUnSeen(unSeen => unSeen + 1);
        const newEvent = {
            id: `${100 - listNotification.length}`,
            messageDescription: messageDescription,
            result: result,
            homeId: homeId,
            formattedDatetime: getCurrentDateTime(),
            isSeen: "0",
        }
        setListNotification([newEvent, ...listNotification]);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messageDescription: messageDescription,
                result: result,
                homeId: homeId
            }),
        };
        try {
            const success = await api('add-event', options);
            console.log(success);
        } catch (error) {
            console.log(error);
        }

    }

    const fetchDataNotification = async () => {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                homeId: homeId
            }),
        };
        try {
            const dataNotification = await api('get-list-notification', options);
            console.log("hahaha", dataNotification);
            setListNotification(dataNotification.data);
            setUnSeen(dataNotification.countUnSeenNoti);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDataNotification();
        // addEvent("haha tesst", "thanhf coong");
        // updateSeen();
        // console.log(unSeen);
    }, [])

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
                    initialParams={{
                        homeId: homeId,
                        addEvent: addEvent
                    }}
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
                    initialParams={{
                        homeId: homeId,
                        listNotification: listNotification,
                        updateSeen: updateSeen,
                        deleteNotification: deleteNotification
                    }}
                    options={{
                        tabBarLabel: 'Notification',
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="ios-notifications" color={color} size={size} />
                        ),
                        tabBarBadge: unSeen === 0 ? null : unSeen,
                    }}
                />
                <Tab.Screen
                    name="User"
                    component={UserScreen}
                    initialParams={{ homeId: homeId }}
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
            <Login.Screen name="Tab" component={TabNavigation} />
        </Login.Navigator>
    )



}

export default function App() {


    ////////////////////////////////////////////////////////////////



    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            };
            const data = await api("", options);
            console.log(data);
        }
        fetchData();
    }, [])

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




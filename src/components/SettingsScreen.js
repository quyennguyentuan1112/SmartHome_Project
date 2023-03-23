import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Button, Text, View, StatusBar } from 'react-native';

import styles from "../styles/styleAll";

const SettingsScreen = ({ navigation }) => {

    return (
        <>
            <View style={styles.container}>
                <Text>Setting</Text>
            </View>

            <StatusBar barStyle="light-content" backgroundColor="#2C3639" />
        </>
    )
}

export default SettingsScreen;
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Button, Text, View, StatusBar } from 'react-native';

import styles from "../styles/User-style";

const SettingsScreen = ({ navigation }) => {

    return (
        <>
            <View style={styles.container}>
                <Text>User</Text>
                <Button title='login' onPress={() => navigation.navigate('Login')}/>
            </View>

            <StatusBar barStyle="light-content" backgroundColor="#211D1D" />
        </>
    )
}

export default SettingsScreen;
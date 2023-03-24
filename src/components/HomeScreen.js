import React from 'react';
import { Button, Text, View, StatusBar } from 'react-native';
import styles from '../styles/styleAll';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const HomeScreen = ({ navigation }) => {


    return (
        <>
            <View style={styles.container}>
                <Text style = {styles.text}>Open up App.js to start working on your app!</Text>
                <Button title='login' onPress={() => navigation.navigate('Login')} />
            </View>
            
            <StatusBar barStyle="light-content" backgroundColor="#2C3639" />
        </>
    )
}


export default HomeScreen;
import React, { useState } from 'react';
import { Button, Text, View, StatusBar, StyleSheet, ImageBackground } from 'react-native';
// import styles from '../styles/styleAll';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Avatar } from 'react-native-paper';

import WeatherApp from './WeatherApp';
import WelcomeHome from './WelcomeHome';
import ScrollViewHome from './ScrollViewHome';


const HomeScreen = ({ navigation }) => {
    const image = { uri: 'https://i.pinimg.com/564x/00/a5/55/00a55562daa10e73258e094237842ceb.jpg' }

    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={image} blurRadius={5} resizeMode="cover" style={styles.imageBackground}>
                    <WelcomeHome />
                    <WeatherApp />
                    <Text style = {styles.TitleScrollView}>Devices and Feature</Text>
                    <ScrollViewHome />
                </ImageBackground>
            </View>

            <StatusBar barStyle="light-content" backgroundColor="#211D1D" />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    TitleScrollView : {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: 20,
        marginTop: 50,
        marginLeft: 20,
        color: '#EEEEEE',
        alignSelf: 'flex-start',
    },
});


export default HomeScreen;
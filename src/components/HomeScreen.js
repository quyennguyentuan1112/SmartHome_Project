import React, { useState, useEffect } from 'react';
import { Button, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import WeatherApp from './WeatherApp';
import WelcomeHome from './WelcomeHome';
import ScrollViewHome from './ScrollViewHome';


const HomeScreen = ({ route, navigation }) => {
    const { homeId, addEvent } = route.params;
    useEffect(() => {
        console.log("tai home screen homeId: ", homeId);
    }, [])

    return (
        <>
            <View style={styles.container}>
                <WelcomeHome />
                <WeatherApp />
                <View style={styles.headerDeviceAndFeatures}>
                    <Text style={styles.TitleScrollView}>Devices and Feature</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 20,
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            marginRight: 30,
                        }}
                    onPress={() => navigation.navigate('AddDevice', { homeId, addEvent })}
                    >
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <ScrollViewHome
                    navigation={navigation}
                    homeId={homeId}
                    addEvent={addEvent}
                />
            </View>

            <StatusBar barStyle="default" />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
    },
    headerDeviceAndFeatures: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    TitleScrollView: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 20,
        // color: '#393E46',
        alignSelf: 'flex-start',
    },
});


export default HomeScreen;
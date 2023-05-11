import React, {useEffect} from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';


const ScrollViewHome = ({ navigation, homeId, addEvent }) => {
    // const homeId = 
    

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.rows}>
                    <TouchableOpacity style={[styles.box, { backgroundColor: '#007AFF', }]} onPress={() => navigation.navigate('Miccontrol', { homeId : homeId, addEvent : addEvent})}>
                        <FontAwesome name="microphone" size={70} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('ListDevice', { homeId : homeId, type: "Fan", addEvent : addEvent})}>
                        <FontAwesome5 name="fan" size={70} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.rows}>
                    <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('ListDevice', { homeId : homeId, type: "Lamp", addEvent : addEvent})}>
                        <FontAwesome5 name="lightbulb" size={70} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Temperature and Humididty', { homeId : homeId })}>
                        <MaterialCommunityIcons name="thermometer" size={70} color="white" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '85%',

    },
    rows: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    box: {
        width: '35%',
        height: 150,
        backgroundColor: '#F08A5D',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ScrollViewHome;
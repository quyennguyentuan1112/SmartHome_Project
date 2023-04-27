import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

const WelcomeHome = () => {
    const name = 'quyen';

    const [time, setTime] = useState(new Date());
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const hour = time.getHours();
        if (hour >= 5 && hour < 12) {
            setGreeting('chào buổi sáng');
        } else if (hour >= 12 && hour < 18) {
            setGreeting('chào buổi chiều');
        } else {
            setGreeting('chào buổi tối');
        }
    }, [time]);

    return (
        <View style={styles.container}>
                <Text style={styles.welcome}>Smarthome, {greeting}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        margin: 10,
        padding: 5,
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    welcome: {
        fontSize: 23,
        fontWeight: '400',
        // color: '#EEEEEE',
    },
});

export default WelcomeHome;
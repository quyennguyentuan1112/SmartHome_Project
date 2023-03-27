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
            setGreeting('Chào buổi sáng, ');
        } else if (hour >= 12 && hour < 18) {
            setGreeting('Chào buổi chiều, ');
        } else {
            setGreeting('Chào buổi tối, ');
        }
    }, [time]);

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Text style={styles.welcome}>{greeting}</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.right}>
                <Avatar.Image size={45} source={'https://i.pinimg.com/236x/c7/ba/15/c7ba15941beb640db8663d967cb04d6d.jpg'} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        margin: 10,
        padding: 5,
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    left: {
        flexDirection: 'row',
        marginRight: 30,
        marginLeft: 5,
    },
    right: {
        marginLeft: 80,
        marginRight: 5,
    },
    welcome: {
        fontSize: 20,
        fontWeight: '200',
        fontWeight: '400',
        color: '#EEEEEE',
    },
    name: {
        fontSize: 20,
        fontWeight: '400',
        color: '#EEEEEE',
    }
});

export default WelcomeHome;
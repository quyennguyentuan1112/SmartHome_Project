import React from "react";
import { Text, View, StatusBar } from 'react-native';
import styles from '../styles/Login-style';

const LoginScreen = () => {


    return (
        <>
            <View style={styles.container}>
                <Text>Login</Text>
                
            </View>

            <StatusBar barStyle="light-content" backgroundColor="#211D1D" />
        </>
    )
}

export default LoginScreen;
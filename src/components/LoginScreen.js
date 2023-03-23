import React, { useState, useEffect } from "react";
import { Text, View, StatusBar, TextInput, Button } from 'react-native';
import styles from '../styles/styleAll';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const user = {id: 101,username: 'tuanquyen', password : '123456'}

    const handleLogin = ({ navigation }) => {
        // Xử lý đăng nhập
        if (username === user.username && password === user.password) {
            
        } else {
            alert('Sai tên đăng nhập hoặc mật khẩu!');
        }
    };


    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Đăng nhập</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                <Button
                    style={styles.button}
                    title="Đăng nhập"
                    onPress={handleLogin}
                />

            </View>

            <StatusBar barStyle="light-content" backgroundColor="#2C3639" />
        </>
    )
}



export default LoginScreen;
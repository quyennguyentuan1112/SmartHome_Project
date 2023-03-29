import React, { useState, useEffect } from "react";
import { Text, View, StatusBar, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
// import styles from '../styles/styleAll';

const Separator = () => <View style={styles.separator} />;


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const image = { uri: 'https://i.pinimg.com/564x/eb/23/16/eb2316a4c199cb12436f6b9f440a2330.jpg' };

    const user = { id: 101, username: 'tuanquyen', password: '123456' }

    const handleLogin = () => {
        // Xử lý đăng nhập
        if (username === user.username && password === user.password) {
            navigation.navigate('Tab')
        } else {
            alert('Sai tên đăng nhập hoặc mật khẩu!');
            setUsername('');
            setPassword('');
        }
    };


    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={image} blurRadius={5} resizeMode="cover" style={styles.imageBackground}>

                    <Text style={styles.title}>Welcome</Text>
                    <Text style={styles.subTitle}>Đăng nhập để vào ngôi nhà của bạn</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tên đăng nhập"
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        placeholderTextColor="#F8F8F8"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        placeholderTextColor="#F8F8F8"
                    />
                    <Button
                        style={styles.button}
                        title="Đăng nhập"
                        color={'#FFB267'}
                        onPress={handleLogin}
                    />

                    <Separator />
                    <Text style={styles.subTitle}>Bạn chưa có tài khoản?</Text>
                    <Button
                        style={styles.button}
                        title="Đi tới đăng ký"
                        onPress={() => navigation.navigate('Register')}
                    />
                </ImageBackground>


            </View>

            <StatusBar barStyle="light-content" backgroundColor="#222831" />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#211D1D',
    },

    imageBackground: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#F8F8F8',
        marginBottom: 10,
    },

    subTitle: {
        fontSize: 15,
        fontWeight: '400',
        marginBottom: 20,
        color: '#F8F8F8',
        marginBottom: 10,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        borderStyle: 'solid',
        borderColor: '#F8F8F8',
        color: '#F8F8F8',

    },
    button: {
        width: '100%',
        color: '#FFF',
        padding: 10,
        borderRadius: 5,
    },

    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
});


export default LoginScreen;
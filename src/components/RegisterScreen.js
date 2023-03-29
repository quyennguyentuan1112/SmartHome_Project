import React, { useState, useEffect } from "react";
import { Text, View, StatusBar, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
// import styles from '../styles/styleAll';

const Separator = () => <View style={styles.separator} />;


const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userList, setUserList] = useState([
        { idUser: 101, username: 'tuanquyen', password: '123456' },
        { idUser: 102, username: 'qqq', password: '1010' },
        { idUser: 103, username: 'nghiamap', password: '123' }
    ]);

    const image = { uri: 'https://i.pinimg.com/564x/eb/23/16/eb2316a4c199cb12436f6b9f440a2330.jpg' };


    const handleRegister = () => {
        const existingUser = userList.find(user => user.username === username);
        if (password !== confirmPassword) {
            Alert.alert('Thông báo', 'Mật khẩu nhập không trùng nhau');
            setPassword('');
            setConfirmPassword('');
            return;
        }
        if (existingUser) {
            Alert.alert('Thông báo', 'Đã tồn tại người dùng trùng username');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            return;
        }
        const newUser = {
            idUser: Math.floor(Math.random() * 900) + 100,
            username: username,
            password: password
        };
        setUserList([...userList, newUser]);
        Alert.alert('Thông báo', 'Đăng ký tài khoản thành công');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        navigation.navigate('Login')
    };


    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={image} blurRadius={5} resizeMode="cover" style={styles.imageBackground}>

                    <Text style={styles.title}>Đăng ký</Text>
                    <Text style={styles.subTitle}>Điền đầy đủ thông tin để tạo tài khoản</Text>
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

                    <TextInput
                        style={styles.input}
                        placeholder="Xác nhận mật khẩu"
                        secureTextEntry={true}
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        placeholderTextColor="#F8F8F8"
                    />
                    <Button
                        style={styles.button}
                        title="Đăng ký"
                        color={'#FFB267'}
                        onPress={handleRegister}
                    />

                    <Separator />
                    <Text style={styles.subTitle}>Bạn đã có tài khoản?</Text>
                    <Button
                        style={styles.button}
                        title="Đi tới đăng Nhập"
                        onPress={() => navigation.navigate('Login')}
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


export default RegisterScreen;
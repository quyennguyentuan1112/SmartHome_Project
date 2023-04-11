import React, { useState, useEffect } from "react";
import { Text, View, StatusBar, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import { set } from "react-native-reanimated";
// import styles from '../styles/styleAll';
import client from "../api/client";

const Separator = () => <View style={styles.separator} />;


const RegisterScreen = ({ navigation }) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userFinal, setUserFinal] = useState({
        fullname: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        setUserFinal({
            fullname: fullname,
            email: email,
            password: password,
        });
    }, [fullname, email, password]);

    const image = { uri: 'https://i.pinimg.com/564x/eb/23/16/eb2316a4c199cb12436f6b9f440a2330.jpg' };


    const handleRegister = async () => {
        console.log(userFinal);
        if (fullname === '' || email === '' || password === '' || confirmPassword === '') {
            Alert.alert('Thông báo', 'Hãy điền đầy đủ thông tin');
            return;
        } 

        if (password !== confirmPassword) {
            Alert.alert('Thông báo', 'Mật khẩu nhập không trùng nhau');
            setPassword('');
            setConfirmPassword('');
            return;
        }

        const res = await client.post('/create-user', { // truy cập tới database để kiểm tra và thêm user
            ...userFinal
        })
        console.log(res.data);
         if (res && res.data.success === false) {
            Alert.alert('Thông báo', 'Đã tồn tại người dùng trùng email');
            setFullname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            return;
        }
        
        Alert.alert('Thông báo', 'Đăng ký tài khoản thành công');
        setFullname('');
        setEmail('');
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
                        placeholder="Full name"
                        onChangeText={(text) => setFullname(text)}
                        value={fullname}
                        placeholderTextColor="#F8F8F8"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
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
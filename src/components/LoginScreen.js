import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { api } from '../api/client';

const LoginScreen = ({ navigation }) => {
  const [homeId, setHomeId] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    // Xử lý khi người dùng ấn nút đăng nhập ở đây
    console.log(`Home Id: ${homeId}, Password: ${password}`);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        homeId: homeId,
        password: password
      }),
    };

    const data = await api("check-home", options);
    console.log(data);
    if (data.success === false) {
      if (data.message === "Không đúng homeId hoặc password") {
        Alert.alert("Không đúng homeId hoặc password")
      } else {
        Alert.alert("Hệ thống đang gặp vấn đề, thử lại sau.")
      }
    } else {
      setHomeId('');
      setPassword('');
      navigation.navigate('Tab', {
        homeId: homeId,
      })
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/loginImage.jpg')} />
      </View>
      <Text style={styles.title}>Đăng nhập</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Home Id"
          onChangeText={setHomeId}
          value={homeId}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    width: 200,
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;

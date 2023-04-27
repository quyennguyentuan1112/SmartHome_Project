import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { api } from '../api/client';

const DeviceFormScreen = ({ route, navigation }) => {
    const { homeId } = route.params;
    const [deviceCode, setDeviceCode] = useState('');
    const [deviceType, setDeviceType] = useState('quạt');
    const [deviceName, setDeviceName] = useState('');
    const [deviceDescription, setDeviceDescription] = useState('');

    const handlePressSubmit = async () => {
        if (!deviceCode || !deviceName || !deviceDescription) {
            alert('Vui lòng nhập đầy đủ thông tin');
        } else {
            try {
                const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        idDevice: deviceCode,
                        deviceType : deviceType,
                        nameDevice: deviceName,
                        deviceDescription: deviceDescription,
                        homeId: homeId
                    }),
                };
                try {
                    const res = await api("add-device-to-home", options);
                    console.log(res);
                    if (res.success === false) {
                        if (res.message === "Device not found") {
                            Alert.alert("Không tìm thấy thiết bị.")
                            setDeviceCode("");
                        } else if (res.message === "Device is use by other home") {
                            Alert.alert("Thiết bị đang được sử dụng bởi hệ thống khác.")
                            setDeviceCode("");
                        } else if (res.message === "add device failed") {
                            Alert.alert("Thêm thiết bị thất bại.")
                            navigation.navigate('Home')
                        }
                    } else {
                        Alert.alert("Thêm thiết bị thành công.")
                        navigation.navigate('Home')
                    }
                } catch (error) {
                    console.error(error);
                    Alert.alert("Xảy ra lỗi trong quá trình thực thi.")
                    navigation.navigate('Home')
                }
            } catch (error) {
                console.log(error);
                Alert.alert("Xảy ra lỗi trong quá trình thực thi.")
                navigation.navigate('Home')
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Mã thiết bị</Text>
            <TextInput
                style={styles.input}
                value={deviceCode}
                onChangeText={(text) => setDeviceCode(text)}
                placeholder="Nhập mã thiết bị"
            />
            <Text style={styles.label}>Loại thiết bị</Text>
            <View style={{ borderWidth: 2, borderColor: 'gray', justifyContent: 'center', borderRadius: 10, }}>
                <Picker
                    selectedValue={deviceType}
                    onValueChange={(itemValue) => setDeviceType(itemValue)}
                    style={[styles.input, { marginTop: 0, }]}
                >
                    <Picker.Item label="Quạt" value="fan" />
                    <Picker.Item label="Đèn" value="led" />
                    {/* <Picker.Item label="Đo nhiệt độ" value="temperature" />
                    <Picker.Item label="Đo độ ẩm" value="humidity" /> */}
                </Picker>
            </View>

            <Text style={styles.label}>Tên thiết bị (hỗ trợ Miccontrol)</Text>
            <TextInput
                style={styles.input}
                value={deviceName}
                onChangeText={(text) => setDeviceName(text)}
                placeholder="Nhập tên thiết bị"
            />
            <Text style={styles.label}>Mô tả</Text>
            <TextInput
                style={styles.textarea}
                value={deviceDescription}
                onChangeText={(text) => setDeviceDescription(text)}
                placeholder="Nhập mô tả"
                multiline
            />
            <TouchableOpacity style={styles.button} onPress={handlePressSubmit}>
                <Text style={styles.buttonText}>Đăng ký sản phẩm</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    textarea: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#0066CC',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DeviceFormScreen;

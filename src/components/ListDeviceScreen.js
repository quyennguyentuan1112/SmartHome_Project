import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, FlatList, } from 'react-native';
import { api } from '../api/client';


const ListDeviceScreen = ({ route, navigation }) => {
    const { homeId, type, addEvent } = route.params;
    const [isLoad1, setIsLoad1] = useState(true);
    const [devices, setDevices] = useState()


    const [valueDevices, setValueDevices] = useState();

    const changeRealTimeMode = (idDevice, mode) => {
        let coppy = devices;
        for (let i = 0; i < devices.length; i++) {
            if (idDevice === coppy[i].idDevice) {
                coppy[i].realTime = mode;
                break;
            }
        }
        setDevices(coppy);
    }

    const changeIsOnDevice = (idDevice, mode) => {
        console.log(idDevice, mode);
        let coppy = valueDevices;
        console.log(coppy);
        coppy.shared[idDevice] = (mode === true ? 1 : 0);
        console.log(coppy);
        setValueDevices(coppy);
    }

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    homeId: homeId
                }),
            };
            let url = "";
            if (type === "Lamp") url = "read-list-led-device";
            else url = "read-list-fan-device";

            try {
                const dataDevice = await api(url, options);
                console.log(dataDevice.data);
                setDevices(dataDevice.data);
                setIsLoad1(false);
                console.log(devices);

            } catch (error) {
                console.error(error);
                Alert.alert("Xảy ra lỗi trong quá trình đọc dữ liệu.");
                navigation.navigate('Home');
            }
        }

        fetchData();
    }, [])



    useEffect(() => {

        if (devices) {
            const fetchValueDevices = async () => {

                let listDeviceId = "";
                for (let i = 0; i < devices.length; i++) {
                    if (i === devices.length - 1) {
                        listDeviceId = listDeviceId + devices[i].idDevice;
                        break;
                    }
                    listDeviceId = listDeviceId + devices[i].idDevice + ",";
                }
                console.log(listDeviceId);

                try {
                    let dataValueDevice = await fetch(`https://demo.thingsboard.io/api/v1/qmxrjQH0sbbjF9fdLUWb/attributes?sharedKeys=${listDeviceId}`, {
                        method: "GET",
                    })
                    // console.log(dataValueDevice);
                    const dataValueDevices = await dataValueDevice.json();
                    console.log(dataValueDevices);
                    console.log(dataValueDevices.shared);
                    setValueDevices(dataValueDevices);
                } catch (error) {
                    console.error(error);
                    Alert.alert("Xảy ra lỗi trong quá trình đọc dữ liệu.");
                    navigation.navigate('Home');
                }
            }


            fetchValueDevices();
        }
    }, [devices]);

    return (
        <View style={styles.container}>
            {isLoad1
                ? <Text style={{ alignItems: 'center', justifyContent: 'center', }}>Loading</Text>
                : devices.map(device => (
                    <TouchableHighlight
                        key={device.idDevice}
                        onPress={() => {
                            if (valueDevices) {
                                navigation.navigate(type, {
                                    device: device,
                                    valueDevices: valueDevices,
                                    changeRealTimeMode: changeRealTimeMode,
                                    changeIsOnDevice: changeIsOnDevice,
                                    addEvent : addEvent
                                })
                            }
                        }}
                    >
                        <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{device.nameDevice}</Text>
                            <Text style={{ fontSize: 14 }}>{device.deviceDescription}</Text>
                        </View>
                    </TouchableHighlight>
                ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})

export default ListDeviceScreen;
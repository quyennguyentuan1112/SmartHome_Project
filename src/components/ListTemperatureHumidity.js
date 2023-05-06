import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, FlatList, Alert } from 'react-native';
import { api } from '../api/client';
import ReloadableScrollView from './ReloadableScrollView';

const ListTemperatureHumidity = ({ route, navigation }) => {
    const { homeId } = route.params;
    // const [count, setCount] = useState(0);
    const [isLoad, setIsLoad] = useState(true);
    const [getDevices, setGetDevices] = useState([
        {
            idDevice: "Temperature",
            nameDevice: "nhiệt độ phòng khách",
            deviceDescription: "Đo nhiệt độ ở phòng khách",
            category: "Temperature"
        },
        {
            idDevice: "Humidity",
            nameDevice: "độ ẩm phòng khách",
            deviceDescription: "Đo độ ẩm ở phòng khách",
            category: "Humidity"
        }
    ]);
    const [valueDevices, setValueDevices] = useState(null
        // {
        //     temperature: [
        //         {
        //             ts: 1682481842437,
        //             value: 27.8
        //         }
        //     ],
        //     humidity: [
        //         {
        //             ts: 1682481842437,
        //             value: 40.1
        //         }
        //     ]
        // }
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://demo.thingsboard.io:443/api/plugins/telemetry/DEVICE/4c2fe410-cd78-11ed-9b15-dd2dac50548f/values/timeseries?keys=temperature%2Chumidity&useStrictDataTypes=true', {
                    method: 'GET',
                    headers: {
                        'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW4ucGhhbWRpbmh2YW4yMkBoY211dC5lZHUudm4iLCJ1c2VySWQiOiI2NmMxNzYyMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6IjY4N2M2M2FjLTQxYjAtNDBlNy1hMzQyLTBhNjJiNmM4NTE1YSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjgyMzQ4MjA2LCJleHAiOjE2ODQxNDgyMDYsImZpcnN0TmFtZSI6IlbEgk4iLCJsYXN0TmFtZSI6IlBI4bqgTSDEkMOMTkgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiI2NTMzYWEzMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.00Da_NUqxFR5pb_TfKQUpmYir6zlbbdYvj6k02gXu-3Zb8u4VOLB-MiDz5sfzf27lE7xX0RHkbaFnirZ9E1AgQ',
                        'Content-Type': 'application/json'
                    }
                });
                const datafix = await res.json();
                // console.log(datafix);
                setValueDevices(datafix);
                // console.log(valueDevices);
                setIsLoad(false);
            } catch (error) {
                Alert.alert("Xảy ra lỗi trong quá trình đọc dữ liệu.");
                navigation.navigate('Home');
            }
        };
        fetchData();
    }, [])

    const handleRefresh = async () => {
        setIsLoad(true);
        try {
            const res = await fetch('https://demo.thingsboard.io:443/api/plugins/telemetry/DEVICE/4c2fe410-cd78-11ed-9b15-dd2dac50548f/values/timeseries?keys=temperature%2Chumidity&useStrictDataTypes=true', {
                method: 'GET',
                headers: {
                    'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW4ucGhhbWRpbmh2YW4yMkBoY211dC5lZHUudm4iLCJ1c2VySWQiOiI2NmMxNzYyMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6IjY4N2M2M2FjLTQxYjAtNDBlNy1hMzQyLTBhNjJiNmM4NTE1YSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjgyMzQ4MjA2LCJleHAiOjE2ODQxNDgyMDYsImZpcnN0TmFtZSI6IlbEgk4iLCJsYXN0TmFtZSI6IlBI4bqgTSDEkMOMTkgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiI2NTMzYWEzMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.00Da_NUqxFR5pb_TfKQUpmYir6zlbbdYvj6k02gXu-3Zb8u4VOLB-MiDz5sfzf27lE7xX0RHkbaFnirZ9E1AgQ',
                    'Content-Type': 'application/json'
                }
            });
            const datafix = await res.json();
            // console.log(datafix);
            setValueDevices(datafix);
            console.log(valueDevices);
            setIsLoad(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Xảy ra lỗi trong quá trình đọc dữ liệu.");
            navigation.navigate('Home');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ReloadableScrollView onRefresh={handleRefresh}>
                <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {`${getDevices[0].nameDevice} : ${isLoad ? '...' : valueDevices.temperature[0].value}`}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                        {getDevices[0].deviceDescription}
                    </Text>
                </View>
                <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                        {`${getDevices[1].nameDevice} : ${isLoad ? '...' : valueDevices.humidity[0].value} `}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                        {getDevices[1].deviceDescription}
                    </Text>
                </View>
            </ReloadableScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
})


export default ListTemperatureHumidity;
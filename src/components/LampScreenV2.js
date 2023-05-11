import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image, Switch, } from 'react-native';
import VerticalSlider from 'rn-vertical-slider';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { api } from "../api/client";


const LampScreenv2 = ({ route, navigation }) => {
    const { device, valueDevices, changeRealTimeMode, changeIsOnDevice, addEvent } = route.params;

    const image = { uri: 'https://i.pinimg.com/236x/db/e5/77/dbe577649abeab1440c5b9a6d3fa8a72.jpg' };
    const [value, setValue] = useState(0);
    const [isRealtimeModeOn, setIsRealtimeModeOn] = useState(device.realTime == 1 ? true : false);
    const [isLightOn, setIsLightOn] = useState(valueDevices.shared[device.idDevice] == 1 ? true : false);
    const [chooseColor, setChooseColor] = useState("white")

    const [firsttime, setFirstTime] = useState(true);

    const fetchRealTimeMode = async () => {
        console.log("cập nhật realtime: ", isRealtimeModeOn);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idDevice: device.idDevice,
                realTime: isRealtimeModeOn
            }),
        };

        try {
            await api("updete-real-time", options)
            changeRealTimeMode(device.idDevice, isRealtimeModeOn);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRealTimeMode();
        // this effect is for updating light value in realtime mode
        const intervalId = setInterval(() => {
            if (isRealtimeModeOn) {
                const currentTime = moment();
                const isDaytime = currentTime.hours() >= 6 && currentTime.hours() < 18;
                setIsLightOn(!isDaytime); // light is off during daytime, on otherwise
                console.log("kiểm tra 1s đang kích hoạt");
            }
        }, 1000); // update every 1 second

        // clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, [isRealtimeModeOn]);

    const toggleRealtimeMode = () => {
        console.log('công tắc realtime mode: ', !isRealtimeModeOn);
        setIsRealtimeModeOn(!isRealtimeModeOn);
    }

    const toggleLight = () => {
        if (!isRealtimeModeOn) {

            setIsLightOn(!isLightOn);
        }
    }

    const toggleLightAPI = async (idDevice) => {
        let isLightOnPost = "";
        if (isLightOn === true) isLightOnPost = "1";
        else isLightOnPost = "0";
        let desc = isLightOnPost == 1 ? `Bật ${device.nameDevice}` : `Tắt ${device.nameDevice}`;
        try {
            console.log("đến lúc gửi post để thay đổi giá trị đèn, với device.idDevice: ", idDevice, ", và isLightOnPost: ", isLightOnPost);
            await fetch('https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/4c2fe410-cd78-11ed-9b15-dd2dac50548f/SHARED_SCOPE', {
                method: 'POST',
                headers: {
                    'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW4ucGhhbWRpbmh2YW4yMkBoY211dC5lZHUudm4iLCJ1c2VySWQiOiI2NmMxNzYyMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6IjY4N2M2M2FjLTQxYjAtNDBlNy1hMzQyLTBhNjJiNmM4NTE1YSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjgyMzQ4MjA2LCJleHAiOjE2ODQxNDgyMDYsImZpcnN0TmFtZSI6IlbEgk4iLCJsYXN0TmFtZSI6IlBI4bqgTSDEkMOMTkgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiI2NTMzYWEzMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.00Da_NUqxFR5pb_TfKQUpmYir6zlbbdYvj6k02gXu-3Zb8u4VOLB-MiDz5sfzf27lE7xX0RHkbaFnirZ9E1AgQ',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    [idDevice]: isLightOnPost
                })
            })
            console.log("thiết bị thành công");
            
            addEvent(desc, "Thành công");
            changeIsOnDevice(device.idDevice, isLightOn)
        } catch (error) {
            console.log("Xảy ra lỗi trong quá trình thực thi");
            console.log(error);
            addEvent(desc, "Thất bại");
        }
    }

    useEffect(() => {
        console.log('công tắc đèn: ', isLightOn);
        if (isLightOn) setValue(50);
        else setValue(0);
        if (!firsttime) toggleLightAPI(device.idDevice)
        else setFirstTime(false)

    }, [isLightOn]);

    useEffect(() => {
        console.log('Ánh sáng đèn có màu: ', chooseColor);
    }, [chooseColor])

    return (
        <View style={styles.container}>
            <ImageBackground source={image} blurRadius={5} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.imgvalue}>
                    <View style={styles.switchLamp}>
                        <View style={styles.overlay} />
                        <View style={styles.subSwitch}>
                            <Text style={styles.titleSwitch}>Công tắc</Text>
                            <TouchableOpacity
                                onPress={!isRealtimeModeOn ? toggleLight : null}
                                style={[
                                    styles.button,
                                    isLightOn ? styles.buttonOn : styles.buttonOff
                                ]}
                            >
                                <Ionicons name={isLightOn ? "flashlight" : "flashlight-outline"} size={40} color="#EEEEEE" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.subSwitch}>
                            <Text style={styles.titleSwitch}>Thời gian thực</Text>
                            <TouchableOpacity
                                onPress={toggleRealtimeMode}
                                style={[
                                    styles.button,
                                    isRealtimeModeOn ? styles.buttonOn : styles.buttonOff
                                ]}
                            >
                                <Icon name="clock-o" size={40} color="#EEEEEE" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.iconSlider}>
                        <Ionicons name="sunny" size={40} color="#B3B3B3" />
                    </View>
                    <View style={styles.sliderValue}>

                        <VerticalSlider
                            value={value}
                            onChange={(value) => setValue(value)}
                            height={300}
                            width={70}
                            step={1}
                            min={0}
                            max={100}
                            borderRadius={10}
                            minimumTrackTintColor="#2979FF"
                            maximumTrackTintColor="#B3B3B3"
                            ballIndicatorWidth={40}
                            ballIndicatorHeight={40}
                            ballIndicatorPosition={-50}
                        />

                    </View>
                </View>

                <View style={styles.chooseColor}>
                    <View style={styles.backgoundChooseColer} />
                    <Text style={styles.titleChooseColor}>Chế độ màu</Text>
                    <View style={styles.lineColor}>
                        <TouchableOpacity
                            onPress={() => setChooseColor("red")}
                            style={[styles.colorbox, { backgroundColor: "red" }]}
                        />
                        <TouchableOpacity
                            onPress={() => setChooseColor("orange")}
                            style={[styles.colorbox, { backgroundColor: "orange" }]}
                        />
                        <TouchableOpacity
                            onPress={() => setChooseColor("yellow")}
                            style={[styles.colorbox, { backgroundColor: "yellow" }]}
                        />
                    </View>
                    <View style={styles.lineColor}>
                        <TouchableOpacity
                            onPress={() => setChooseColor("black")}
                            style={[styles.colorbox, { backgroundColor: "black", borderColor: "#B3B3B3" }]}
                        />
                        <TouchableOpacity
                            onPress={() => setChooseColor("white")}
                            style={[styles.colorbox, { backgroundColor: "white", borderColor: "#B3B3B3" }]}
                        />
                        <TouchableOpacity
                            onPress={() => setChooseColor("green")}
                            style={[styles.colorbox, { backgroundColor: "green" }]}
                        />
                    </View>
                </View>

            </ImageBackground>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',

    },
    imgvalue: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sliderValue: {
        height: 350,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    switchLamp: {
        width: 250,
        height: 180,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    subSwitch: {
        flexDirection: 'row',
        width: 230,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 250,
        height: 180,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    titleSwitch: {
        fontSize: 20,
        fontWeight: '400',
        color: '#EEEEEE',
    },
    ////////////////////////////////
    button: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonOn: {
        borderColor: '#4CD964',
        backgroundColor: '#39C55B',
    },
    buttonOff: {
        borderColor: '#B3B3B3',
        backgroundColor: '#B3B3B3',
    },
    iconSlider: {
        position: 'absolute',
        left: 315,
        bottom: 50,
        zIndex: 1
    },

    chooseColor: {
        marginTop: 25,
        width: '80%',
        height: 220,
    },
    backgoundChooseColer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 220,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    titleChooseColor: {
        fontSize: 20,
        fontWeight: '400',
        color: '#EEEEEE',
        marginLeft: 20,
        marginTop: 20,
    },

    lineColor: {
        alignSelf: 'center',
        width: 200,
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
    },
    colorbox: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: 'B3B3B3',
        borderWidth: 3,
    }
});

export default LampScreenv2;
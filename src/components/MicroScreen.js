import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { api } from '../api/client';

import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { ScrollView } from 'react-native';

const recordingOptions = {
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 16000,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: ".wav",
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 16000,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

const MicroScreen = ({ route, navigation }) => {
    const { homeId, addEvent } = route.params;

    const [recording, setRecording] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [result, setResult] = useState("");

    const [res, setRes] = useState(
        // {
        // success: true,
        // data: [
        //     {
        //         idDevice: "Fan_1",
        //         category: "fan",
        //         nameDevice: "quạt 1",
        //     },
        //     {
        //         idDevice: "Fan_2",
        //         category: "fan",
        //         nameDevice: "quạt 2",
        //     },
        //     {
        //         idDevice: "Led_1",
        //         category: "led",
        //         nameDevice: "đèn 1",
        //     },
        //     {
        //         idDevice: "Led_2",
        //         category: "led",
        //         nameDevice: "đèn 2",
        //     }
        // ]
    // }
    );
    // let res = {};

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    homeId: homeId
                }),
            };
            try {
                setRes(await api("read-list-post-device-into-homeid", options));
                // console.log(dataDevice);
                // setRes(dataDevice);
                // console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const handleMicControl = async (message) => {
        const keyMessage = message.substring(0, 3);
        const nameDevice = message.substring(4, message.length - 1);
        let matchNameDevice = false;
        let idDeviceMatch = "";

        console.log("key: ", keyMessage, ",name device: ", nameDevice);
        console.log(res);

        for (let i = 0; i < res.data.length; i++) {
            if (nameDevice === res.data[i].nameDevice) {
                matchNameDevice = true;
                idDeviceMatch = res.data[i].idDevice;
                break;
            }
        }
        console.log(idDeviceMatch);

        if (keyMessage === "bật") {
            if (matchNameDevice === false) {
                console.log("Không tìm thấy thiết bị có tên như mô tả");
                setResult("Không tìm thấy thiết bị có tên như mô tả");
                return;
            }
            try {
                await fetch('https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/4c2fe410-cd78-11ed-9b15-dd2dac50548f/SHARED_SCOPE', {
                    method: 'POST',
                    headers: {
                        'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW4ucGhhbWRpbmh2YW4yMkBoY211dC5lZHUudm4iLCJ1c2VySWQiOiI2NmMxNzYyMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6IjY4N2M2M2FjLTQxYjAtNDBlNy1hMzQyLTBhNjJiNmM4NTE1YSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjgyMzQ4MjA2LCJleHAiOjE2ODQxNDgyMDYsImZpcnN0TmFtZSI6IlbEgk4iLCJsYXN0TmFtZSI6IlBI4bqgTSDEkMOMTkgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiI2NTMzYWEzMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.00Da_NUqxFR5pb_TfKQUpmYir6zlbbdYvj6k02gXu-3Zb8u4VOLB-MiDz5sfzf27lE7xX0RHkbaFnirZ9E1AgQ',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        [idDeviceMatch]: "1"
                    })
                })
                console.log("bật thiết bị thành công");
                setResult("bật thiết bị thành công")
                addEvent(`Bật ${nameDevice}`, "Thành công");
                return;
            } catch (error) {
                console.log("Xảy ra lỗi trong quá trình thực thi");
                setResult("Xảy ra lỗi trong quá trình thực thi");
                addEvent(`Bật ${nameDevice}`, "Thất bại");
                return;
            }
        } else if (keyMessage === "tắt") {
            if (matchNameDevice === false) {
                console.log("Không tìm thấy thiết bị có tên như mô tả");
                setResult("Không tìm thấy thiết bị có tên như mô tả");
                return;
            }
            try {
                await fetch('https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/4c2fe410-cd78-11ed-9b15-dd2dac50548f/SHARED_SCOPE', {
                    method: 'POST',
                    headers: {
                        'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW4ucGhhbWRpbmh2YW4yMkBoY211dC5lZHUudm4iLCJ1c2VySWQiOiI2NmMxNzYyMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6IjY4N2M2M2FjLTQxYjAtNDBlNy1hMzQyLTBhNjJiNmM4NTE1YSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjgyMzQ4MjA2LCJleHAiOjE2ODQxNDgyMDYsImZpcnN0TmFtZSI6IlbEgk4iLCJsYXN0TmFtZSI6IlBI4bqgTSDEkMOMTkgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiI2NTMzYWEzMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.00Da_NUqxFR5pb_TfKQUpmYir6zlbbdYvj6k02gXu-3Zb8u4VOLB-MiDz5sfzf27lE7xX0RHkbaFnirZ9E1AgQ',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        [idDeviceMatch]: "0"
                    })
                })
                console.log("tắt thiết bị thành công");
                setResult("tắt thiết bị thành công");
                addEvent(`Tắt ${nameDevice}`, "Thành công");
                return;
            } catch (error) {
                console.log("Xảy ra lỗi trong quá trình thực thi");
                setResult("Xảy ra lỗi trong quá trình thực thi");
                addEvent(`Tắt ${nameDevice}`, "Thất bại");
                return;
            }
        } else if (keyMessage === "đọc") {
            // if (matchNameDevice === false) {
            //   console.log("Không tìm thấy thiết bị có tên như mô tả");
            //   return;
            // }
            try {
                const res = await fetch('https://demo.thingsboard.io:443/api/plugins/telemetry/DEVICE/4c2fe410-cd78-11ed-9b15-dd2dac50548f/values/timeseries?keys=temperature%2Chumidity&useStrictDataTypes=true', {
                    method: 'GET',
                    headers: {
                        'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW4ucGhhbWRpbmh2YW4yMkBoY211dC5lZHUudm4iLCJ1c2VySWQiOiI2NmMxNzYyMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6IjY4N2M2M2FjLTQxYjAtNDBlNy1hMzQyLTBhNjJiNmM4NTE1YSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjgyMzQ4MjA2LCJleHAiOjE2ODQxNDgyMDYsImZpcnN0TmFtZSI6IlbEgk4iLCJsYXN0TmFtZSI6IlBI4bqgTSDEkMOMTkgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiI2NTMzYWEzMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.00Da_NUqxFR5pb_TfKQUpmYir6zlbbdYvj6k02gXu-3Zb8u4VOLB-MiDz5sfzf27lE7xX0RHkbaFnirZ9E1AgQ',
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json();
                console.log(data);
                if (nameDevice === "nhiệt độ phòng khách") {
                    console.log("nhiệt độ là: ", data.temperature[0].value);
                    setResult("nhiệt độ là: " + data.temperature[0].value)
                    return;
                } else if (nameDevice === "độ ẩm phòng khách") {
                    console.log("độ ẩm là: ", data.humidity[0].value);
                    setResult("độ ẩm là: " + data.humidity[0].value);
                    return;
                }
            } catch (error) {
                console.log("Xảy ra lỗi trong quá trình thực thi");
                setResult("Xảy ra lỗi trong quá trình thực thi");
                return;
            }


        } else {
            console.log("không rõ lệnh thực hiện");
            setResult("không rõ lệnh thực hiện");
            return;
        }
        return;
    }

    const deleteRecordingFile = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            await FileSystem.deleteAsync(info.uri);
        } catch (error) {
            console.log("There was an error deleting recording file", error);
        }
    };

    const getTranscription = async () => {
        setIsFetching(true);
        try {
            const info = await FileSystem.getInfoAsync(recording.getURI());
            console.log(`FILE INFO: ${JSON.stringify(info)}`);
            const uri = info.uri;

            const base64content: string = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            const body = {
                audio: { content: base64content },
                config: {
                    enableAutomaticPunctuation: true,
                    encoding: "LINEAR16",
                    languageCode: "vi-VN",
                    model: "default",
                    sampleRateHertz: 16000,
                },
            };
            const transcriptResponse = await fetch(
                "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyC4MTw5FM9-DH3GducPuWnj-xV1JGKtWHU",
                {
                    method: "POST",
                    body: JSON.stringify(body),
                }
            );

            const data = await transcriptResponse.json();
            console.log(data);

            console.log(data.results);
            const message =
                (data.results && data.results[0].alternatives[0].transcript) || "";
            console.log(message);

            handleMicControl(message.toLowerCase());

            resetRecording();
        }
        catch (error) {
            console.log("There was an error reading file", error);
            // stopRecording();
            resetRecording();
        }
        setIsFetching(false);
    }

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            setIsRecording(true);

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();

            console.log("Start !!!");
            setRecording(recording);
        } catch (error) {
            console.log(error);
            stopRecording();
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
        } catch (error) {
            // Do nothing -- we are already unloaded.
        }
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: false,
        });

        getTranscription()

    };

    const resetRecording = () => {
        deleteRecordingFile();
        setRecording(null);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, isRecording && styles.recording]}
                onPressIn={startRecording}
                onPressOut={stopRecording}
            >
                <FontAwesome name="microphone" size={80} color="white" />
            </TouchableOpacity>
            <Text style={styles.result}>{result}</Text>
            <View style={styles.guide}>
                <Text style={{ alignSelf: 'flex-start', marginLeft: 10, fontSize: 20, fontWeight: '600', marginTop: 10, marginBottom: 10 }}>Hướng dẫn:</Text>
                <Text style={{ marginLeft: 25, fontSize: 17, fontWeight: '400', marginTop: 10, marginBottom: 10 }}>Từ khóa gồm: Key + Tên thiết bị</Text>
                <Text style={{ marginLeft: 25, fontSize: 17, fontWeight: '400', marginTop: 10, marginBottom: 10 }}>Key gồm: "Bật", "Tắt", "Đọc"</Text>
                <Text style={{ marginLeft: 25, fontSize: 17, fontWeight: '400', marginTop: 10, marginBottom: 10 }}>VD: Key: "Bật" và Tên thiết bị: "đèn 1"</Text>
                <Text style={{ marginLeft: 25, fontSize: 17, fontWeight: '400', marginTop: 10, marginBottom: 10 }}>Kết quả từ khóa: "Bật đèn 1"</Text>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    recording: {
        backgroundColor: '#87CBB9',
    },
    result: {
        fontSize: 18,
        fontWeight: '400',
        marginTop: 10,
        marginBottom: 50,
    },
    guide: {
        height: 260,
        width: "90%",
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 10,
        paddingBottom: 20
        // alignItems: 'center',
    }
});

export default MicroScreen;

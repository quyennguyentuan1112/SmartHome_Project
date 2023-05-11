import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Slider, Switch } from 'react-native';
// import Slider from '@react-native-community/slider';

const FanControlScreen = ({ route, navigation }) => {
  const { device, valueDevices, changeRealTimeMode, changeIsOnDevice, addEvent } = route.params;

  const [isOn, setIsOn] = useState(valueDevices.shared[device.idDevice] === 1 ? true : false);
  const [speed, setSpeed] = useState(0);
  const [timer, setTimer] = useState(0.5);
  const [firsttime, setFirstTime] = useState(true);



  useEffect(() => {
    console.log(valueDevices.shared);
    console.log(device.idDevice);
    console.log(valueDevices.shared[device.idDevice]);
    console.log("công tắc quạt: ", isOn);
  }, [])

  useEffect(() => {
    if (firsttime === false) {
      console.log('công tắc quạt: ', isOn);
      let isOnPost = "";
      if (isOn === true) isOnPost = "1";
      else isOnPost = "0";
      const toggleLightAPI = async (idDevice, isOnPost) => {
        let desc = isOn === true ? `Bật ${device.nameDevice}` : `Tắt ${device.nameDevice}`;
        try {
          console.log("đến lúc gửi post để thay đổi giá trị quạt, với device.idDevice: ", idDevice, ", và isOnPost: ", isOnPost);
          await fetch('https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/4c2fe410-cd78-11ed-9b15-dd2dac50548f/SHARED_SCOPE', {
            method: 'POST',
            headers: {
              'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW4ucGhhbWRpbmh2YW4yMkBoY211dC5lZHUudm4iLCJ1c2VySWQiOiI2NmMxNzYyMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJzY29wZXMiOlsiVEVOQU5UX0FETUlOIl0sInNlc3Npb25JZCI6IjY4N2M2M2FjLTQxYjAtNDBlNy1hMzQyLTBhNjJiNmM4NTE1YSIsImlzcyI6InRoaW5nc2JvYXJkLmlvIiwiaWF0IjoxNjgyMzQ4MjA2LCJleHAiOjE2ODQxNDgyMDYsImZpcnN0TmFtZSI6IlbEgk4iLCJsYXN0TmFtZSI6IlBI4bqgTSDEkMOMTkgiLCJlbmFibGVkIjp0cnVlLCJwcml2YWN5UG9saWN5QWNjZXB0ZWQiOnRydWUsImlzUHVibGljIjpmYWxzZSwidGVuYW50SWQiOiI2NTMzYWEzMC1iOGNiLTExZWQtOWIxNS1kZDJkYWM1MDU0OGYiLCJjdXN0b21lcklkIjoiMTM4MTQwMDAtMWRkMi0xMWIyLTgwODAtODA4MDgwODA4MDgwIn0.00Da_NUqxFR5pb_TfKQUpmYir6zlbbdYvj6k02gXu-3Zb8u4VOLB-MiDz5sfzf27lE7xX0RHkbaFnirZ9E1AgQ',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              [idDevice]: isOnPost
            })
          })
          console.log("thiết bị thành công");
          changeIsOnDevice(device.idDevice, isOn)
          addEvent(desc, "Thành công");
        } catch (error) {
          console.log("Xảy ra lỗi trong quá trình thực thi");
          console.log(error);
          addEvent(desc, "Thất bại");
        }
      }
      toggleLightAPI(device.idDevice, isOnPost)
    }
    setFirstTime(false);
  }, [isOn]);

  const toggleFan = () => {
    setIsOn(!isOn);
  };

  const changeSpeed = (value) => {
    setSpeed(value);
  };

  const changeTimer = (value) => {
    setTimer(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Điều khiển quạt</Text>
      <View style={styles.controlGroup}>
        <Text style={styles.controlLabel}>Công tắc</Text>
        <Switch
          value={isOn}
          onValueChange={toggleFan}
        />
      </View>
      <View style={styles.controlGroup}>
        <Text style={styles.controlLabel}>Tốc độ</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={2}
          step={1}
          value={speed}
          onValueChange={changeSpeed}
          disabled={!isOn}
        />
        <Text style={styles.speedLabel}>{speed === 0 ? 'Yếu' : speed === 1 ? 'Trung bình' : 'Mạnh'}</Text>
      </View>
      <View style={styles.controlGroup}>
        <Text style={styles.controlLabel}>Cài đặt giờ tắt</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={6}
          step={0.5}
          value={timer}
          onValueChange={changeTimer}
          disabled={!isOn}
        />
        <Text style={styles.timerLabel}>
          {timer === 0 ? 'Không cài đặt' : `${Math.floor(timer)}h${timer % 1 === 0.5 ? '30' : '00'}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    marginTop: 60,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  controlGroup: {
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  slider: {
    width: '100%',
  },
  speedLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  timerLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FanControlScreen;
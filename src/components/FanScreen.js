import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Slider, Switch } from 'react-native';
// import Slider from '@react-native-community/slider';

const FanControlScreen = () => {
  const [isOn, setIsOn] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [timer, setTimer] = useState(0.5);

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
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, Image, Switch, } from 'react-native';
import lampImage from '../styles/lamp.png';
import VerticalSlider from 'rn-vertical-slider';
import moment from 'moment';
// import { BlurView } from "@react-native-community/blur";

const LampScreen = () => {
    const image = { uri: 'https://i.pinimg.com/236x/db/e5/77/dbe577649abeab1440c5b9a6d3fa8a72.jpg' };
    const [value, setValue] = useState(0);
    const [isRealtimeModeOn, setIsRealtimeModeOn] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);

    useEffect(() => {
        // this effect is for updating light value in realtime mode
        const intervalId = setInterval(() => {
            if (isRealtimeModeOn) {
                const currentTime = moment();
                const isDaytime = currentTime.hours() >= 6 && currentTime.hours() < 18;
                setIsLightOn(!isDaytime); // light is off during daytime, on otherwise

            }
        }, 1000); // update every 1 second

        // clear interval when component unmounts
        return () => clearInterval(intervalId);
    }, [isRealtimeModeOn]);

    const toggleRealtimeMode = (isOn) => {
        console.log('công tắc realtime mode: ', isOn);
        setIsRealtimeModeOn(isOn);
    };

    const toggleLight = (isOn) => {
        if (!isRealtimeModeOn) {
            console.log('công tắc đèn: ', isOn);
            setIsLightOn(isOn);

        }
    };

    useEffect(() => {
        if (isLightOn) setValue(50);
        else setValue(0);
    }, [isLightOn]);

    return (
        <View style={styles.container}>
            <ImageBackground source={image} blurRadius={1} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.imgvalue}>
                    <View style={styles.switchLamp}>
                        {/* <BlurView
                            style={styles.absolute}
                            blurType="light"
                            blurAmount={10}
                            reducedTransparencyFallbackColor="white"
                        /> */}
                        <View style={styles.overlay} />
                        <View style={styles.subSwitch}>
                            <Text style={styles.titleSwitch}>Công tắc:</Text>
                            <Switch
                                style={styles.switch}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isLightOn ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleLight}
                                value={isLightOn}
                                disabled={isRealtimeModeOn}
                            />
                        </View>
                        <View style={styles.subSwitch}>
                            <Text style={styles.titleSwitch}>Thời gian thực:</Text>
                            <Switch
                                style={styles.switch}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isRealtimeModeOn ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleRealtimeMode}
                                value={isRealtimeModeOn}
                            />
                        </View>
                    </View>
                    <View style={styles.sliderValue}>
                        <VerticalSlider
                            value={value}
                            onChange={(value) => setValue(value)}
                            height={300}
                            width={60}
                            step={1}
                            min={0}
                            max={100}
                            borderRadius={10}
                            minimumTrackTintColor="#2979FF"
                            maximumTrackTintColor="#D1D1D6"
                            showBallIndicator
                            ballIndicatorColor="#2979FF"
                            ballIndicatorTextColor="#fff"
                            ballIndicatorWidth={40}
                            ballIndicatorHeight={40}
                            ballIndicatorPosition={-50}
                        />

                    </View>
                </View>

            </ImageBackground>

            {/* <SliderComponent /> */}

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
    },
    switchLamp: {
        width: 250,
        height: 180,
        paddingLeft: 20,
        // borderWidth: 5,
        // borderRadiusRi: 20,
        // backgroundColor: 'orange',
        // borderTopRightRadius: 20,
        // borderBottomRightRadius: 20,
        justifyContent: 'center',
    },
    subSwitch: {
        flexDirection: 'row',
        width: 200,
        // backgroundColor: 'red',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switch: {
        // backgroundColor: 'orange',
        // alignSelf: 'flex-end',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 250,
        height: 180,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    titleSwitch: {
        fontSize: 20,
        fontWeight: '400',
    },
});

export default LampScreen;
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image, Switch, } from 'react-native';
import VerticalSlider from 'rn-vertical-slider';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


const LampScreenv3 = () => {
    const image = { uri: 'https://i.pinimg.com/236x/db/e5/77/dbe577649abeab1440c5b9a6d3fa8a72.jpg' };
    const [value, setValue] = useState(0);
    const [isRealtimeModeOn, setIsRealtimeModeOn] = useState(false);
    const [isLightOn, setIsLightOn] = useState(false);
    const [chooseColor, setChooseColor] = useState("white")

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

    // const toggleRealtimeMode = (isOn) => {
    //     console.log('công tắc realtime mode: ', isOn);
    //     setIsRealtimeModeOn(isOn);
    // };

    const toggleRealtimeMode = () => {
        console.log('công tắc realtime mode: ', !isRealtimeModeOn);
        setIsRealtimeModeOn(!isRealtimeModeOn);
    }

    // const toggleLight = (isOn) => {
    //     if (!isRealtimeModeOn) {
    //         console.log('công tắc đèn: ', isOn);
    //         setIsLightOn(isOn);

    //     }
    // };

    const toggleLight = () => {
        if (!isRealtimeModeOn) {

            setIsLightOn(!isLightOn);
        }
    }

    useEffect(() => {
        console.log('công tắc đèn: ', isLightOn);
        if (isLightOn) setValue(50);
        else setValue(0);
    }, [isLightOn]);

    useEffect(() => {
        console.log('Ánh sáng đèn có màu: ', chooseColor);
    },[chooseColor])

    return (
        <View style={styles.container}>
            <ImageBackground source={image} blurRadius={5} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.imgvalue}>
                    <View style={styles.switchLamp}>
                        <View style={styles.overlay} />
                        <View style={styles.subSwitch}>
                            <Text style={styles.titleSwitch}>Công tắc</Text>
                            {/* <Switch
                                style={styles.switch}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isLightOn ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleLight}
                                value={isLightOn}
                                disabled={isRealtimeModeOn}
                            /> */}
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
                            {/* <Switch
                                style={styles.switch}
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isRealtimeModeOn ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleRealtimeMode}
                                value={isRealtimeModeOn}
                            /> */}
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
                            // showBallIndicator
                            // ballIndicatorColor="#2979FF"
                            // ballIndicatorTextColor="#fff"
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
                            style={[styles.colorbox, {backgroundColor: "red"}]}
                        />
                        <TouchableOpacity
                            onPress={() => setChooseColor("orange")}
                            style={[styles.colorbox, {backgroundColor: "orange"}]}
                        />
                        <TouchableOpacity
                            onPress={() => setChooseColor("yellow")}
                            style={[styles.colorbox, {backgroundColor: "yellow"}]}
                        />
                    </View>
                    <View style={styles.lineColor}>
                        <TouchableOpacity
                            onPress={() => setChooseColor("black")}
                            style={[styles.colorbox, {backgroundColor: "black", borderColor: "#B3B3B3"}]}
                        />
                        <TouchableOpacity
                            onPress={() => setChooseColor("white")}
                            style={[styles.colorbox, {backgroundColor: "white", borderColor: "#B3B3B3"}]}
                        />
                        <TouchableOpacity
                            onPress={() => setChooseColor("green")}
                            style={[styles.colorbox, {backgroundColor: "green"}]}
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
        marginLeft: 10,
    },
    switchLamp: {
        width: 250,
        height: 180,
        paddingLeft: 10,
        // borderWidth: 5,
        // borderRadiusRi: 20,
        // backgroundColor: 'orange',
        // borderTopRightRadius: 20,
        // borderBottomRightRadius: 20,
        justifyContent: 'center',
    },
    subSwitch: {
        flexDirection: 'row',
        width: 230,
        // backgroundColor: 'red',
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
        // backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
        // borderColor: '#B3B3B3',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFFFFF',
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
        // backgroundColor: 'red',
        position: 'absolute',
        // top: 2,
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
        // borderTopRightRadius: 20,
        // borderBottomRightRadius: 20,
        borderRadius: 20,
        // backgroundColor: 'rgba(255, 255, 255, 0.6)',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    titleChooseColor: {
        fontSize: 20,
        fontWeight: '400',
        color: '#EEEEEE',
        // backgroundColor: 'orange',
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
        // backgroundColor: 'blue',
    },
    colorbox: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: 'B3B3B3',
        borderWidth: 3,
    }
});

export default LampScreenv3;
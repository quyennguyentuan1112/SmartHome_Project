import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import VerticalSlider from 'rn-vertical-slider';

const SliderComponent = () => {

    const [value, setValue] = useState(0);
    return (
        <View style = {styles.container}>
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

    );
}

const styles = StyleSheet.create({
    container : {
        height: 350,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SliderComponent;
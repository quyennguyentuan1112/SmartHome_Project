import React from "react";
import { Text,View, StatusBar } from "react-native";
import styles from "../styles/styleAll";

const ChooseHouseScreen = () => {

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.text}>choose house</Text>
            </View>

            <StatusBar barStyle="light-content" backgroundColor="#2C3639" />
        </>

    )
}

export default ChooseHouseScreen;
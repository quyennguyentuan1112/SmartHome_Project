import React from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';


const ScrollViewHome = () => {

    const image1 = { uri: 'https://i.pinimg.com/564x/ce/4a/47/ce4a4772237d762db3d9662cbaad710d.jpg' };
    const image2 = { uri: 'https://i.pinimg.com/236x/fa/9b/68/fa9b68ebcde0d644a75722a7a4caed27.jpg' };
    const image3 = { uri: 'https://i.pinimg.com/236x/32/9e/c8/329ec877c909ab7acafc1c4bb450f0b1.jpg' };

    return (
        <>
            <View style={styles.boss}>
                <ScrollView style={styles.container} horizontal={true}>
                    <View style={styles.device}>
                        <ImageBackground imageStyle={{ borderRadius: 10 }} source={image1} resizeMode="cover" style={styles.imageBackground}>
                            <TouchableOpacity style = {styles.button}>
                                <Text style = {styles.subTitle}>Mic controll</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.device}>
                        <ImageBackground imageStyle={{ borderRadius: 10 }} source={image2} resizeMode="cover" style={styles.imageBackground}>
                            <TouchableOpacity style = {styles.button}>
                                <Text style = {styles.subTitle}>Lamp</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.device}>
                        <ImageBackground imageStyle={{ borderRadius: 10 }} source={image3} resizeMode="cover" style={styles.imageBackground}>
                            <TouchableOpacity style = {styles.button}>
                                <Text style = {styles.subTitle}>Air conditioner</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                </ScrollView>
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    boss: {
        height: 300,
        width: '90%',
        // backgroundColor : 'orange',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {

    },
    device: {
        height: '90%',
        width: 150,
        margin: 10,
        backgroundColor: 'grey',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    button : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTitle : {
        fontSize: 20,
        fontWeight: '400',
        color: '#EEEEEE',
    },
});

export default ScrollViewHome;
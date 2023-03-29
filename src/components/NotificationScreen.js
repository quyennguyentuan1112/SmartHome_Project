import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';


const NotificationScreen = () => {
    const data = [
        {
            postimage: 'https://w7.pngwing.com/pngs/806/172/png-transparent-bedroom-the-bedroom-s-furniture-interior-design-room-thumbnail.png',
            username: 'BedRoom',
            notification: ' Had turn off the light.',
            time: '10:00'
        },
        {
            postimage: 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-small-fresh-bathroom-image_2244430.jpg',
            username: 'BathRoom',
            notification: ' The temperature of the water is 35C',
            time: '11:00'
        },
        {
            postimage: 'https://cdn.pixabay.com/photo/2015/08/05/18/50/living-room-876886_960_720.png',
            username: 'LivingRoom',
            notification: ' Turn on TV.',
            time: '12:00'
        },
        {
            postimage: 'https://img.lovepik.com/original_origin_pic/18/12/07/6a404402161f4cb1c8dfd19efe0ffecc.png_wh860.png',
            username: 'Yard',
            notification: ' Motion detection',
            time: '13:00'
        },
        {
            postimage: 'https://cdn.pixabay.com/photo/2016/06/01/17/43/house-1429409_960_720.png',
            username: 'Home',
            notification: ' Air temperature is 27C.',
            time: '19:00'
        },
        {
            postimage: 'https://img.lovepik.com/original_origin_pic/18/12/07/6a404402161f4cb1c8dfd19efe0ffecc.png_wh860.png',
            username: 'Yard',
            notification: ' It is raining.',
            time: '08:00'
        },
        {
            postimage: 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-small-fresh-bathroom-image_2244430.jpg',
            username: 'BathRoom',
            notification: ' Had turn on the light.',
            time: '15:00'
        },
        {
            postimage: 'https://w7.pngwing.com/pngs/806/172/png-transparent-bedroom-the-bedroom-s-furniture-interior-design-room-thumbnail.png',
            username: 'BedRoom',
            notification: ' Had turn off the light.',
            time: '07:00'
        },
        {
            postimage: 'https://img.lovepik.com/original_origin_pic/18/12/07/6a404402161f4cb1c8dfd19efe0ffecc.png_wh860.png',
            username: 'Yard',
            notification: ' The yard is wet',
            time: '14:00'
        },
        {
            postimage: 'https://cdn.pixabay.com/photo/2016/06/01/17/43/house-1429409_960_720.png',
            username: 'Home',
            notification: ' Have 4 people.',
            time: '04:00'
        }

    ];
    return (
        <View style={styles.container}>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.container}>
                                <View style={styles.HeaderLeftImageView}>
                                    <Image
                                        style={styles.HeaderLeftImage}
                                        source={{ uri: item.postimage }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                    <View>
                                        <Text style={{ color: '#1B6ADF', fontSize: 15 }}>
                                            {item.username}
                                        </Text>
                                        <Text style={{ color: '#64676B' }}>
                                            {item.time}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: '#64676B' }}>
                                            {item.notification}
                                        </Text>
                                    </View>
                                </View>

                            </View>


                        );
                    }}
                />
            {/* </ScrollView> */}
        </View>
    );
};



export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    HeaderLeftImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    HeaderLeftImageView: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        marginLeft: 15,
    }
});




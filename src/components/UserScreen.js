import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';



const UserScreen = () => {

    const image1 = { uri: 'https://i.pinimg.com/236x/c7/ba/15/c7ba15941beb640db8663d967cb04d6d.jpg' };
    const image3 = { uri: 'https://huongnghiep.hocmai.vn/wp-content/uploads/2022/02/image1-92.png' };
    const image2 = { uri: 'https://www.pngkit.com/png/detail/204-2048123_address-comments-white-address-icon-png.png' };
    const image4 = { uri: 'https://www.citypng.com/public/uploads/preview/black-outline-phone-telephone-icon-116413939381nghacmwcv.png' }
    const image5 = { uri: 'https://cdn.onlinewebfonts.com/svg/img_364496.png' }

    return (
        <>
            <View style={{ backgroundColor: '#F5F5F5' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Image source={image3} style={{ width: '100%', height: 200 }} />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={image1} style={{ width: 150, height: 150, borderRadius: 100, marginTop: -70 }} />
                        <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>Nguyễn Tuấn Quyến</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey' }}>21, Male</Text>
                    </View>
                    <View style={{

                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        width: '90%',
                        padding: 20,
                        paddingBottom: 22,
                        borderRadius: 10,
                        shadowOpacity: 80,
                        elevation: 15,
                        marginTop: 20
                    }}>
                        <Image
                            source={image5} style={{ width: 20, height: 20 }}
                        />
                        <Text style={{ fontSize: 17, color: '#818181', fontWeight: 'bold', marginLeft: 10 }}>  Sinh viên đại học Bách Khoa</Text>

                    </View>
                    <View style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        width: '90%',
                        padding: 20,
                        paddingBottom: 22,
                        borderRadius: 10,
                        shadowOpacity: 80,
                        elevation: 15,
                        marginTop: 20
                    }}>
                        <Image
                            source={image2} style={{ width: 25, height: 25 }}
                        />
                        <Text style={{ fontSize: 17, color: '#818181', fontWeight: 'bold', marginLeft: 10 }}>  Ký túc xá ĐHQG khu A </Text>

                    </View>
                    <View style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        width: '90%',
                        padding: 20,
                        paddingBottom: 22,
                        borderRadius: 10,
                        shadowOpacity: 80,
                        elevation: 15,
                        marginTop: 20
                    }}>
                        <Image
                            source={image4} style={{ width: 25, height: 25 }}
                        />
                        <Text style={{ fontSize: 17, color: '#818181', fontWeight: 'bold', marginLeft: 10 }}>  0889202626 </Text>

                    </View>
                    <TouchableOpacity style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        width: '90%',
                        padding: 20,
                        paddingBottom: 30,
                        borderRadius: 10,
                        shadowOpacity: 80,
                        // elevation: 30,
                        marginTop: 20,
                        backgroundColor: '#000'
                    }}>

                        <Text style={{ fontSize: 19, color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>  Logout </Text>

                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    )

}


export default UserScreen;
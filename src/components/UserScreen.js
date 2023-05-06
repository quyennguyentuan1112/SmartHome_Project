import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { CommonActions } from '@react-navigation/native';

export default function UserScreen({navigation}) {

  const handleLogout = () => {
    // Điều hướng đến màn hình Login và loại bỏ màn hình UserScreen khỏi stack
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          {/* <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
          <Ionicons name="add-circle-outline" size={24} color="#52575D"></Ionicons> */}
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image source={require("../../assets/3.jpg")} style={styles.image} resizeMode="center"></Image>
          </View>
          {/* <View style={styles.dm}>
            <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
          </View> */}
          {/* <View style={styles.active}></View> */}
          {/* <View style={styles.add}>
            <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
          </View> */}
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "300", fontSize: 36 }]}>Trần Quang Cảnh</Text>
          <Text style={[styles.text, { fontSize: 18, fontWeight: "300" }]}>Công an</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>19</Text>
            <Text style={[styles.text, styles.subText]}>Age</Text>
          </View>
          <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
            <Text style={[styles.text, { fontSize: 24 }]}>Đăk Nông</Text>
            <Text style={[styles.text, styles.subText]}>ADDRESS</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>LOL</Text>
            <Text style={[styles.text, styles.subText]}>GAME</Text>
          </View>
        </View>

        <View style={{ marginTop: 32 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image source={require("../../assets/4.jpg")} style={styles.image} resizeMode="cover"></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={require("../../assets/5.jpg")} style={styles.image} resizeMode="cover"></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={require("../../assets/6.jpg")} style={styles.image} resizeMode="cover"></Image>
            </View>
          </ScrollView>
          {/* <View style={styles.mediaCount}>
            <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
            <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
          </View> */}
        </View>
        <Text style={[styles.subText, styles.recent, { fontWeight: "900", fontSize: 12 }]}>Recent Activity</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                Bắt đầu học tại <Text style={{ fontWeight: "400" }}>Trường Đại học Bách Khoa TpHCM</Text> vào năm 2020
              </Text>
            </View>
          </View>

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                Đang theo học ngành <Text style={{ fontWeight: "400" }}>Khoa Học Máy Tính</Text>
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                Là thành viên chủ chốt của câu lạc bộ đá bóng bán chuyên <Text style={{ fontWeight: "400" }}>Phú Đức Trí</Text>
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                Nghề tay trái <Text style={{ fontWeight: "400" }}>Gamer</Text>
              </Text>
            </View>
          </View>
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
          marginTop: 10,
          backgroundColor: '#000',
          marginBottom: 10
        }}
        onPress={handleLogout}
        >

          <Text style={{ fontSize: 19, color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>  Logout </Text>

        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  text: {
    // fontFamily: "Arial",
    color: "#52575D"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 70
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20
  }
});

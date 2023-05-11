import {
  Text,
  StyleSheet,
  View,
  Animated,
  RefreshControl,
  KeyboardAvoidingView,
} from "react-native";
import React, { Component, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import NotifyCard from "./NotifyCard";
import { ScrollView } from "react-native";
import { StatusBar } from "react-native";
import { api } from "../api/client";
const CONTAINER_HEIGHT = 80;

export default function NotifyScreen({ route }) {
  const { homeId, listNotification, updateSeen, deleteNotification } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [getNotification, setGetNotification] = useState([]
    //   [
    //   {
    //     id: "Fan_1",
    //     messageDescription: "bật quạt 1",
    //     result: "Thành công",
    //     homeId: "q",
    //     formattedDatetime: "2023-05-10 17:07:31",
    //     isSeen: "0",
    //   },
    //   {
    //     id: "Fan_1",
    //     messageDescription: "bật quạt 1",
    //     result: "Thành công",
    //     homeId: "q",
    //     formattedDatetime: "2023-05-10 17:07:31",
    //     isSeen: "0",
    //   },
    //   {
    //     id: "Fan_1",
    //     messageDescription: "bật quạt 1",
    //     result: "Thành công",
    //     homeId: "q",
    //     formattedDatetime: "2023-05-10 17:07:31",
    //     isSeen: "0",
    //   },
    // ]
  );


  // Header Animation
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: "clamp",
      }),
      offsetAnim
    ),
    0,
    CONTAINER_HEIGHT
  );

  var _clampedScrollValue = 0;
  var _offsetValue = 0;
  var _scrollValue = 0;
  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue * diff, 0),
        CONTAINER_HEIGHT
      );
    });
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value;
    });
  }, []);

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: "clamp",
  });

  const ClearAllHandle = () => {
    deleteNotification();
    setGetNotification([])
  }

  const fetchDataNotification = async () => {
    setIsLoading(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        homeId: homeId
      }),
    };
    try {
      const dataNotification = await api('get-list-notification', options);
      console.log("hahaha", dataNotification);
      setGetNotification(dataNotification.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  // Hàm xử lý khi thực hiện refresh
  const onRefresh = () => {
    updateSeen();
    setRefreshing(true);

    // Thực hiện các tác vụ cần làm khi refresh ở đây
    // Ví dụ: tải dữ liệu mới, cập nhật state, ...
    fetchDataNotification();
    console.log(getNotification);

    // Hoàn thành tác vụ refresh
    setRefreshing(false);
  };


  useEffect(() => {
    updateSeen();
    fetchDataNotification();
    console.log(getNotification);
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
    >
      <StatusBar barStyle={"dark-content"} />
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerTranslate }] },
        ]}
      >
        {/* Header */}
        <View style={styles.rowSection}>
          <Text
            style={{
              color: "#363942",
              fontWeight: "bold",
              fontSize: 25,
              marginLeft: 120,
            }}
          >
            Notifications
          </Text>
          <TouchableOpacity style={styles.headerBehave} onPress={() => ClearAllHandle()}>
            <Text style={styles.textHeader}>Clear all</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* End of Header */}

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}

        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{ marginTop: CONTAINER_HEIGHT }}>
          {isLoading ? <Text style={{justifyContent: "center", alignItems: "center"}}>Loading...</Text> :
            
              getNotification.map(noti => (
                <NotifyCard
                  key={noti.formattedDatetime}
                  nameNoti={noti.messageDescription}
                  resultNoti={noti.result}
                  dueDate={noti.formattedDatetime}
                ></NotifyCard>
              ))
            
          }

        </View>
      </Animated.ScrollView>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    position: "absolute",
    width: "100%",
    height: CONTAINER_HEIGHT,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "white",
    zIndex: 1000,
    elevation: 1000,
  },
  rowSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headerBehave: {
    padding: 20,
  },
  textHeader: {
    color: "#3379E4",
    fontWeight: "500",
    fontSize: 18,
  },
});
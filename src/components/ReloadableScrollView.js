import React, { useRef } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
// import { HEADER_HEIGHT } from './constants';

const ReloadableScrollView = ({ children, onRefresh }) => {
    const HEADER_HEIGHT = 10;
    const scrollY = useSharedValue(0);
    const scrollViewRef = useRef(null);

    const handleScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const handleRefresh = async () => {
        await onRefresh();
        scrollViewRef.current?.scrollTo({ y: HEADER_HEIGHT, animated: true });
    };

    const isRefreshing = useSharedValue(false);

    const handleRelease = () => {
        if (scrollY.value <= HEADER_HEIGHT) {
            isRefreshing.value = true;
            handleRefresh().finally(() => {
                isRefreshing.value = false;
            });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing.value}
                        onRefresh={handleRefresh}
                        progressViewOffset={HEADER_HEIGHT}
                        progressBackgroundColor="#fff"
                    />
                }
                onResponderRelease={handleRelease}
            >
                {children}
            </ScrollView>
        </View>
    );
};

export default ReloadableScrollView;

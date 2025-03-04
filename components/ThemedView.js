import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import useThemeColor from '@/hooks/useThemeColor';

const ThemedView = ({ children, ...props }) => {
    return (
        <SafeAreaView>
            <View {...props}>{children}</View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

export default ThemedView;

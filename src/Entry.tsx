import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';

export default function Entry() {
    const colorScheme = useColorScheme();
    return (
        <SafeAreaProvider>
            <StatusBar />
            <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({})

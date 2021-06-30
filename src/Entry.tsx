import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SettingsModal from './components/SettingsModal';
import Navigation from './navigation';

export default function Entry() {
    const colorScheme = useColorScheme();
    return (
        <SafeAreaProvider>
            <StatusBar />
            <Navigation colorScheme={colorScheme} />
            <SettingsModal />

            <FlashMessage position="top" />

        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({})

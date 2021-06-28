import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react'
import { AppState, AppStateStatus, StyleSheet, Text, View } from 'react-native'

export default function useOnActive(func: () => void | Promise<void>) {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);
    const _handleAppStateChange = (nextAppState: AppStateStatus) => {
        if (appState.current.match(/inactive|background/) &&
            nextAppState === "active" && active) {
            console.log("App has come to the foreground!");
            func();
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        //console.log("AppState", appState.current);
    };

    const navigation = useNavigation();

    const [active, setActive] = useState(true);
    useEffect(() => {

        const unsubscribe = navigation?.addListener('focus', (e) => {
            console.log('e.target')
            console.log(e.target)
            setActive(true);
        });
        return () => {
            setActive(false);
            if (unsubscribe)
                unsubscribe();
        };
    }, [navigation]);

    return appStateVisible;
}


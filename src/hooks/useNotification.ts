import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { Subscription } from '@unimodules/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import useOnActive from './useOnActive';
import { PUSH_TOKEN } from '../shared/types/utils/StorageKeys';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    })
});

// Notifications.addNotificationResponseReceivedListener(async response => {
//     console.log("onOpened=", response.notification.request.content.data)
//     console.log("onOpened= notifictiona =", response.notification)

//     if (response.actionIdentifier == Notifications.DEFAULT_ACTION_IDENTIFIER) {
//         try {
//             store.dispatch(Update_Notification(response.notification) as any)
//         }
//         catch (err) {
//             alert(err);
//         }
//     }
// });

// Notifications.addNotificationReceivedListener(async notification => {
//     console.log("onOpened=", notification.request.content.data)
//     console.log("onOpened= notifictiona =", notification)

//     if (notification.request.content.data?.screen == "messages") {
//         store.dispatch(Get_Chat_History() as any)
//     }
// });

export default function useNotification() {
    //const [notification, setNotification] = useState<Notifications.Notification>();
    const dispatch = useDispatch()
    const notificationListener = useRef<Subscription>();
    const responseListener = useRef<Subscription>();

    useOnActive(Notifications.dismissAllNotificationsAsync)

    useEffect(() => {
        console.log("Notification start");
        (async () => await Notifications.dismissAllNotificationsAsync())()
    }, []);
}

export async function registerForPushNotificationsAsync() {
    let token;

    if (true || Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        await AsyncStorage.setItem(PUSH_TOKEN, token);
        console.log("PUSH TOKEN + ", token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: "default"
        });
    }

    return token;
}
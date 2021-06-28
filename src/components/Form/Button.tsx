import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import GlobalStyles from '../../shared/constants/GlobalStyles'
import { Text, useThemeColor, View } from '../Themed'


export type ButtonProps = {
    text: string,
    onClick: () => void | Promise<void>,
    style?: ViewStyle | ViewStyle[],
    buttonColor?: string,
    textColor?: string,
    loading?: boolean,
    disabled?: boolean,
}
export default function Button({
    text,
    onClick,
    style,
    buttonColor,
    textColor,
    loading,
    disabled
}: ButtonProps) {

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: buttonColor ?? (disabled ? useThemeColor("disabled") : useThemeColor("brandColor")),
            borderRadius: 5,
            minHeight: 54,
            marginHorizontal: 20
        },
        titleText: {
            color: textColor ?? useThemeColor("background"),
            fontWeight: 'bold',
        },
    })

    const handlePressing = async () => {
        await onClick();
    }


    return (
        <View style={[GlobalStyles.Row, styles.container, style]}>
            <TouchableOpacity activeOpacity={0.8} disabled={loading || disabled} style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }} onPress={handlePressing}>
                {loading ?
                    <ActivityIndicator /> :
                    <Text style={[styles.titleText]}>{text}</Text>
                }
            </TouchableOpacity>
        </View>

    )
}


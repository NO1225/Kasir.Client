import * as React from 'react';
import {
    StyleProp, StyleSheet,
    TextInput as DefaultTextInput,
    View as DefaultView,
    TextStyle
} from 'react-native';
import { FontSize } from '../../shared/constants/FontSize';
import { useState } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { useThemeColor, View } from '../Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from '../../shared/types/Icon';
import { TouchableOpacity } from 'react-native';
export type TextInputProps = {
    backgroundColor?: string,
    onPress?: () => Promise<void> | void,
    icon: Icon,
} & DefaultTextInput['props'];

export function  IconTextInput(props: TextInputProps) {
    const { style, ...otherProps } = props;
    const fontSize = FontSize.Regular;

    const styles = StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            paddingHorizontal: 15.,
            marginVertical: 10,
            minHeight: 54,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: useThemeColor('brandColor'),
            backgroundColor: props.backgroundColor ?? useThemeColor('baseColor'),
        },
        iconContainer: {
        }
    })

    return (
        <View style={styles.inputContainer}>
            <DefaultTextInput
                style={[{
                    fontSize,
                    flex: 1,
                    color: useThemeColor("text"),
                    textAlign: useLocale('direction') == "ltr" ? "left":"right",  
                } as StyleProp<TextStyle>,
                    style]}
                {...otherProps} />
            <TouchableOpacity
                onPress={props.onPress}
                style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name={props.icon}
                    size={FontSize.xxxLarge}
                    color={useThemeColor("tint")}
                    onClick={props.onPress} />
            </TouchableOpacity>
        </View>
    )

}

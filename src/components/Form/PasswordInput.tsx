import * as React from 'react';
import { StyleProp, StyleSheet, TextInput as DefaultTextInput, TextStyle } from 'react-native';
import { FontSize } from '../../shared/constants/FontSize';
import { useState } from 'react';
import { useLocale } from '../../hooks/useLocale';
import { useThemeColor, View } from '../Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export type TextInputProps = { backgroundColor?: string } & DefaultTextInput['props'];

export function PasswordInput(props: TextInputProps) {
    const [passwordHidden, setPasswordHidden] = useState(true)
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
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry={passwordHidden}
                style={[{
                    fontSize,
                    flex: 1,
                    color: useThemeColor("text"),
                    textAlign: useLocale('direction', { ar: "right", en: "left" })
                } as StyleProp<TextStyle>,
                    style]}
                {...otherProps} />
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="eye" color={useThemeColor("tint")} onClick={async () => setPasswordHidden(!passwordHidden)} />
            </View>
        </View>
    )

}

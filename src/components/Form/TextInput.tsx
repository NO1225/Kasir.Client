import * as React from 'react';
import { StyleSheet, TextInput as DefaultTextInput } from 'react-native';
import { FontSize } from '../../shared/constants/FontSize';
import Colors from '../../shared/constants/Colors';
import { useLocale } from '../../hooks/useLocale';
import GlobalStyles from '../../shared/constants/GlobalStyles';
import { useThemeColor, View } from '../Themed';

export type TextInputProps = { backgroundColor?: string } & DefaultTextInput['props'];

export function TextInput(props: TextInputProps) {
    const { style, ...otherProps } = props;
    const fontSize = FontSize.Regular;

    const styles = StyleSheet.create({
        inputContainer: {
            color: useThemeColor("brandColor"),
            flexDirection: 'row',
            paddingHorizontal: 15.,
            marginVertical: 10,
            minHeight: 54,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: props.backgroundColor ?? useThemeColor('baseColor'),
            borderColor: useThemeColor('brandColor'),


        },
    })

    return (
        <View style={styles.inputContainer}>
            <DefaultTextInput style={[
                GlobalStyles.Flex1,
                {
                    fontSize,
                    color: useThemeColor("text"),
                    textAlign: useLocale("etc", { en: "left", ar: "right" }) as any
                },
                style]}
                {...otherProps} />
        </View>
    )

}


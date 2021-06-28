import * as React from 'react';
import { Platform, StyleSheet, TextInput as DefaultTextInput } from 'react-native';
import { FontSize } from '../../shared/constants/FontSize';
import Colors from '../../shared/constants/Colors';
import { useLocale } from '../../hooks/useLocale';
import { Picker } from '@react-native-picker/picker';
import { PickerProps } from '@react-native-picker/picker/typings/Picker';
import { useThemeColor, View } from '../Themed';
import GlobalStyles from '../../shared/constants/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type SelectItem = {
    label: string,
    value: number | string,
}

export type SelectInputProps = {
    backgroundColor?: string,
    items: SelectItem[],
    onSelectedChanged: (value: number) => void,
    onBlur?: () => void,
    placeHolder?: string,
} & PickerProps<number | string>;

export function SelectInput(props: SelectInputProps) {
    const { style, items, backgroundColor, ...otherProps } = props;
    const fontSize = FontSize.xxxLarge;

    const styles = StyleSheet.create({
        inputContainer: {
            color: useThemeColor("brandColor"),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "flex-start",
            paddingHorizontal: 15.,
            marginVertical: 10,
            minHeight: 54,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: backgroundColor ?? useThemeColor('background'),
            borderColor: useThemeColor('brandColor'),
        },
        iconContainer: {
        }
    })

    return (
        <View style={styles.inputContainer}>
            <Picker
                onValueChange={(value) => {
                    if (value == -1)
                        return;
                    //@ts-ignore
                    props.onSelectedChanged(value);
                    props.onBlur ? props.onBlur() : undefined;
                }}
                style={[
                    GlobalStyles.Flex1,
                    {
                        backgroundColor: backgroundColor ?? useThemeColor('background'),
                        fontSize,
                        justifyContent: 'flex-start',
                        color: useThemeColor("text"),
                        textAlign: useLocale("etc", { en: "left", ar: "right" }) as any
                    },
                    style]}
                {...otherProps} >
                {[{
                    label: props.placeHolder ?? "",
                    value: -1,
                }, ...items].map(item => (
                    <Picker.Item
                        key={item.value + ''}
                        {...item}
                    />
                ))}
            </Picker>
            {Platform.OS == "ios" ? null : <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name={"arrow-down-drop-circle"}
                    color={useThemeColor("tint")} />
            </View>}
            {/* <DefaultTextInput /> */}
        </View>
    )

}


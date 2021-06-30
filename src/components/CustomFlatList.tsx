import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, FlatListProps, RefreshControl, StyleSheet } from 'react-native'
import { useLocale } from '../hooks/useLocale'
import { FontSize } from '../shared/constants/FontSize'
import { Text, useThemeColor, View } from './Themed'


export interface CustomFlatList<TItem> extends FlatListProps<TItem> {
    emptyText?: string
}

export default function CustomFlatList<TItem = any>(props: CustomFlatList<TItem>) {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexGrow: 1
            }}
            ListEmptyComponent={props.refreshing == false ?
                <DefaultEmptyList text={props.emptyText ?? useLocale("emptyList")} />
                : undefined}
            {...props}
        />
    )
}

const styles = StyleSheet.create({})

const DefaultEmptyList = ({ text }: { text: string }) => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <MaterialCommunityIcons
                size={FontSize.xxxxxxxxxLarge * 2}
                name={"emoticon-frown-outline"}
                color={useThemeColor("brandColor")} />
            <Text style={{
                color: useThemeColor("brandColor"),
                fontSize: FontSize.xLarge
            }}>{text}</Text>
        </View>
    )
}
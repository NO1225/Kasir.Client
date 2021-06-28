import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from './Colors'
import { FontSize } from './FontSize'


export default StyleSheet.create({

    Row: {
        flexDirection: 'row'
    },
    RowReverse: {
        flexDirection: 'row-reverse'
    },
    Column: {
        flexDirection: 'column'
    },
    ColumnReverse: {
        flexDirection: 'column-reverse'
    },
    Flex1: {
        flex: 1,
    },
    Flex2: {
        flex: 2,
    },
    Flex3: {
        flex: 3,
    },
    Flex4: {
        flex: 4,
    },
    Shadow3: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    Shadow5: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    cellHeaderText: {
        fontSize: FontSize.Small
    },
    cellText: {
        fontSize: FontSize.xSmall
    }
})
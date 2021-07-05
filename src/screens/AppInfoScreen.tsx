import * as React from 'react';
import { useEffect, useState } from 'react';
import { Image, ScrollView, View as DefaultView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Text, useThemeColor, View } from '../components/Themed';
import { RootState } from '../redux';
import { LoadCountries } from '../redux/actions/countriesActions';
import { LoadLanguages } from '../redux/actions/languagesActions';
import { FontSize } from '../shared/constants/FontSize';
import { useLocale } from '../hooks/useLocale';
import { FontWeight } from '../shared/constants/FontWeight';
import { LoadAppInfo } from '../redux/actions/appInfoActions';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';


export default function AppInfoScreen() {


  const dispatch = useDispatch();

  const appInfo = useSelector((state: RootState) => state.appInfo.data)

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const goToWords = () => {
    navigation.replace("Home")
  }

  useEffect(() => {
    dispatch(LoadLanguages(() => {
      dispatch(LoadCountries(() => {
        dispatch(LoadAppInfo())
      }))
    }))
    return () => {
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    languageButton: {
      //backgroundColor: useThemeColor("baseColor")
    },
  });


  return (
    <View style={styles.container}>

      <View style={{
        paddingHorizontal: 20,
      }}>
        <Image
          resizeMode="contain"
          style={{ width: 300, height: 200 }}
          source={require('../../assets/images/WelcomeLogo.png')} />
      </View>

      <ScrollView style={{
        alignSelf: 'stretch',
        marginTop: 20,
        paddingHorizontal: 20,
        flex: 1,
      }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: FontSize.xxxxLarge,
            fontWeight: FontWeight.bold
          }}
        >{appInfo.title}</Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: FontSize.xxxxLarge,
            fontWeight: FontWeight.bold,
            paddingVertical: 20,
          }}>{appInfo.welcome}</Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: FontSize.xxLarge,
            fontWeight: FontWeight.bold
          }}
        >{appInfo.disclaimer}</Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: FontSize.Large,
            fontWeight: FontWeight.bold,
            paddingVertical: 20,
          }}>{appInfo.description}</Text>
      </ScrollView>


      <TouchableOpacity
        style={{
          margin: 10,
          marginHorizontal: 20,
          padding: 15,
          borderRadius: 10,
          marginBottom: 30,
          alignSelf: 'stretch',
          backgroundColor: useThemeColor("brandColor"),
        }}
        onPress={goToWords}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: FontSize.Large,
            fontWeight: FontWeight.bold,
            color: "#fff",
          }}>{useLocale("enter")}</Text>
      </TouchableOpacity>
    </View>
  );
}


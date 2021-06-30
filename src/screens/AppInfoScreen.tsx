import * as React from 'react';
import { useEffect, useState } from 'react';
import { Image, View as DefaultView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPicture } from '../client/RequestHelpers';
import CustomFlatList from '../components/CustomFlatList';
import { TextInput } from '../components/Form/TextInput';
import SettingsModal from '../components/SettingsModal';

import { Text, useThemeColor, View } from '../components/Themed';
import { RootState } from '../redux';
import { LoadCountries } from '../redux/actions/countriesActions';
import { LoadLanguages } from '../redux/actions/languagesActions';
import { LoadWords } from '../redux/actions/wordsActions';
import { FontSize } from '../shared/constants/FontSize';
import GlobalStyles from '../shared/constants/GlobalStyles';
import Clipboard from 'expo-clipboard';
import { showMessage } from 'react-native-flash-message';
import { IconTextInput } from '../components/Form/IconTextInput';
import { useLocale } from '../hooks/useLocale';
import { FontWeight } from '../shared/constants/FontWeight';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

      <View style={{
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
            fontSize: FontSize.Large,
            fontWeight: FontWeight.bold,
            paddingVertical: 20,
          }}>{appInfo.description}</Text>
      </View>


      <TouchableOpacity
        style={{
          paddingBottom: 30,
        }}
        onPress={goToWords}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: FontSize.Large,
            fontWeight: FontWeight.bold,
            borderBottomWidth: 2,
            color: useThemeColor("brandColor"),
            borderBottomColor: useThemeColor("brandColor")
          }}>{useLocale("enter")}</Text>
      </TouchableOpacity>
    </View>
  );
}


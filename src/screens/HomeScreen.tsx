import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image, Modal, View as DefaultView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Language, LanguagesClient } from '../client/api.generated.clients';
import { client } from '../client/baseClient';
import { getPicture } from '../client/RequestHelpers';
import Button from '../components/Form/Button';
import { SelectInput } from '../components/Form/SelectInput';
import SettingsModal from '../components/SettingsModal';

import { Text, useThemeColor, View } from '../components/Themed';
import { useLocale } from '../hooks/useLocale';
import { RootState } from '../redux';
import { LoadCountries } from '../redux/actions/countriesActions';
import { LoadLanguages } from '../redux/actions/languagesActions';
import { SelectCountry, UpdateSettingsModalShown } from '../redux/actions/personalizeActions';
import { LoadWords } from '../redux/actions/wordsActions';
import { FontSize } from '../shared/constants/FontSize';
import GlobalStyles from '../shared/constants/GlobalStyles';
import Locale from '../shared/locales/Locale';
import { LocaleType } from '../shared/types/ui';
import { ChangeLocale } from '../shared/types/utils/Helpers';

export default function HomeScreen() {


  const dispatch = useDispatch();

  const words = useSelector((state: RootState) => state.words.data)


  useEffect(() => {
    dispatch(LoadLanguages(() => {
      dispatch(LoadCountries(() => {
        dispatch(LoadWords())
      }))
    }))
    return () => {
    }
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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

      {words.map(c => (
        <Text key={c.name}>{c.name}</Text>
      ))}

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Current Language:</Text>
        <Text style={styles.title}>{useLocale("switch.language")}</Text>
      </View>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <SettingsModal />
    </View>
  );
}


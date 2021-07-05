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

const lightCardColors = [
  "#FFFFE0",
  "#FFF",
]
const darkCardColors = [
  "#00001f",
  "#000",
]

export default function HomeScreen() {


  const dispatch = useDispatch();

  const words = useSelector((state: RootState) => state.words.data)
  const [currentSearchText, setCurrentSearchText] = useState("");
  const copyWord = (word: string) => {
    Clipboard.setString(word)
    showMessage({
      message: useLocale("copy.message"),
      type: 'success',
      backgroundColor: '#172e6a',
      color: '#fff',
      position: "bottom",
      style: {
        justifyContent: 'center',
        alignItems: "center"
      }
    });
  }

  const brandColor = useThemeColor("brandColor")

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

      <View style={{
        paddingHorizontal: 20,
      }}>
        <TextInput
          value={currentSearchText}
          onChangeText={setCurrentSearchText}
          placeholder={useLocale("search")} />
      </View>

      <CustomFlatList
        data={words.filter(w => w.title?.includes(currentSearchText))}
        keyExtractor={(word) => word.id + ''}
        renderItem={({ item, index }) => (

          <View
            lightColor={lightCardColors[index % lightCardColors.length]}
            darkColor={darkCardColors[index % darkCardColors.length]}
            style={[
              GlobalStyles.Shadow5,
              {
                flexDirection: 'row',
                margin: 10,
                borderRadius: 15,
                padding: 10,
                paddingHorizontal: 20,
                alignItems: 'center'
              }]}>
            <DefaultView>
              <Image
                height={100}
                width={100}
                style={{ width: 100, height: 100 }}
                source={{ uri: getPicture(item.imageName ?? '') }} />
              <Text style={{
                textAlign: 'center',
                fontSize: FontSize.Large
              }}>{item.title}</Text>
            </DefaultView>

            <DefaultView style={{
              width: 2,
              height: '100%',
              borderRightWidth: 0.5,
              marginHorizontal: 20,
            }} />

            <DefaultView style={{
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'space-around'
            }} >

              <DefaultView style={{
                alignSelf: 'stretch',
                flexDirection: 'row',
              }} >

                <DefaultView style={{
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderColor: brandColor

                }} >

                  <Text style={{
                    textAlign: 'center',
                    fontWeight: FontWeight.bold,
                    fontSize: FontSize.xxxLarge
                  }}>{item.name}</Text>

                </DefaultView>
                <TouchableOpacity
                  onPress={() => copyWord(item.name ?? "")}
                  activeOpacity={0.8}
                  style={{
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: brandColor,
                    borderWidth: 1,
                    borderColor: brandColor
                  }} >

                  <Text
                    style={{
                      margin: 10,
                      textAlign: 'center',
                      fontWeight: FontWeight.regular,
                      fontSize: FontSize.Large,
                      color: "#fff"
                    }}>{useLocale("copy")}</Text>
                </TouchableOpacity>

              </DefaultView>

              <Text style={{
                textAlign: 'center',

              }}>{item.information}</Text>

            </DefaultView>
          </View>
        )}
      />
    </View>
  );
}


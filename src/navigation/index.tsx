/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ColorSchemeName } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPicture } from '../client/RequestHelpers';
import { Text, useThemeColor } from '../components/Themed';
import ensureLanguageDirection from '../hooks/ensureLanguageDirection';
import { RootState } from '../redux';
import { UpdateSettingsModalShown } from '../redux/actions/personalizeActions';
import AppInfoScreen from '../screens/AppInfoScreen';

import HomeScreen from '../screens/HomeScreen';
import { FontSize } from '../shared/constants/FontSize';
import LinkingConfiguration from './LinkingConfiguration';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}


export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  NotFound: undefined;
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  ensureLanguageDirection();
  const dispatch = useDispatch();
  const showSettings = () => {
    dispatch(UpdateSettingsModalShown(true));
  }

  const countries = useSelector((state: RootState) => state.countries.data);
  const countryId = useSelector((state: RootState) => state.personalize.data.countryId)

  return (
    <Stack.Navigator
      initialRouteName="Root"
    >
      <Stack.Screen name="Home"
        options={{
          headerTitleContainerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          headerTitle: "",
          headerRight: () => <TouchableOpacity
            style={{
              paddingHorizontal: 15
            }}
            onPress={showSettings}>
            <MaterialCommunityIcons
              name="cogs"
              color={useThemeColor("brandColor")}
              size={FontSize.xxxxLarge} />
          </TouchableOpacity>,
          headerLeft: () => <View
            style={{
              paddingHorizontal: 15
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: FontSize.xxxxLarge,
                height: FontSize.xxxxLarge,
              }}
              source={{ uri: getPicture(countries.find(c => c.id == countryId)?.imagePath ?? '') }} /></View>,
        }}
        component={HomeScreen} />
      <Stack.Screen name="Root"
        options={{
          headerTitleContainerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          headerTitle: "",
          headerRight: () => <TouchableOpacity
            style={{
              paddingHorizontal: 15
            }}
            onPress={showSettings}>
            <MaterialCommunityIcons
              name="cogs"
              color={useThemeColor("brandColor")}
              size={FontSize.xxxxLarge} />
          </TouchableOpacity>,
          headerLeft: () => <View
            style={{
              paddingHorizontal: 15
            }}>
            <Image
              resizeMode="contain"
              style={{
                width: FontSize.xxxxLarge,
                height: FontSize.xxxxLarge,
              }}
              source={{ uri: getPicture(countries.find(c => c.id == countryId)?.imagePath ?? '') }} /></View>,
        }}
        component={AppInfoScreen} />
    </Stack.Navigator>
  );
}

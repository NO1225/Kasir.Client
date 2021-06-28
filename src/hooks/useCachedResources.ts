import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { store } from '../redux';
import { LoadCountryId, LoadLanguageId, LoadLocale, LoadSettingsModal } from '../redux/actions/personalizeActions';
import { LocaleType } from '../shared/types/ui';
import { COUNTRY_ID, LANGUAGE_ID, LOCALE } from '../shared/types/utils/StorageKeys';
import { registerForPushNotificationsAsync } from './useNotification';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        let localStorage = await AsyncStorage.getItem(LOCALE);
        if (localStorage == null) {
          localStorage = "en";
          await AsyncStorage.setItem(LOCALE, localStorage);
        }
        let local: LocaleType = localStorage == 'ar'
          ? 'ar'
          : localStorage == 'sp'
            ? 'sp'
            : localStorage == 'fr'
              ? 'fr'
              : "en";

        let languageId = await AsyncStorage.getItem(LANGUAGE_ID) ?? '-1';
        let countryId = await AsyncStorage.getItem(COUNTRY_ID) ?? '-1';
        LoadLocale(local)(store.dispatch)
        LoadCountryId(parseInt(countryId))(store.dispatch)
        LoadLanguageId(parseInt(languageId))(store.dispatch)
        LoadSettingsModal()(store.dispatch)

        // Load fonts
        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
        });

        await registerForPushNotificationsAsync();

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

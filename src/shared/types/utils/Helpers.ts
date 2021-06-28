import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager, Linking, Platform } from "react-native";
import { LOCALE, THEME } from "./StorageKeys";
import * as Updates from "expo-updates";
import { LocaleType } from "../ui";
import Locale from "../../locales/Locale";

export const OpenGps = (lat: number, lng: number, label: string) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url ?? "");
    // var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    // var url = scheme + `${lat},${lng}`;
    // Linking.openURL(url);
}

export const ChangeLocale = async (locale: LocaleType) => {
    const currentLocale = await AsyncStorage.getItem(LOCALE);
    if (currentLocale != locale) {
        AsyncStorage.setItem(LOCALE, locale).then(() => {
            if (Locale[locale].direction == "rtl" && I18nManager.isRTL != true ) {
                I18nManager.forceRTL(true);
                I18nManager.allowRTL(true);
            }
            else if (Locale[locale].direction == "ltr" && I18nManager.isRTL != false ) {
                I18nManager.forceRTL(false);
                I18nManager.allowRTL(false);
            }
            Updates.reloadAsync()
        });
    }
}

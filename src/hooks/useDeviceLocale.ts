import { Platform, NativeModules } from 'react-native'
import { LocaleType } from '../shared/types/ui';

export default function useDeviceLocale(): NonNullable<LocaleType> {
    const deviceLanguage =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
            : NativeModules.I18nManager.localeIdentifier;

    let currentLanguage: NonNullable<LocaleType>;

    switch (deviceLanguage.substring(0, 2)) {
        case 'en':
            currentLanguage = "en"
            break;
        case 'ar':
            currentLanguage = "ar"
            break;

        default:
            currentLanguage = "en"
            break;
    }

    return currentLanguage;
}
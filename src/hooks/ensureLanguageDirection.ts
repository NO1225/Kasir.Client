import * as React from 'react';
import { I18nManager } from 'react-native';
import { store } from '../redux';
import * as Updates from "expo-updates";
import { useLocale } from './useLocale';

export default function ensureLanguageDirection() {
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {

                console.log({
                    ...store.getState().personalize.data,
                    isRTL: I18nManager.isRTL
                })
                if (useLocale("direction") == "rtl" && I18nManager.isRTL != true) {
                    I18nManager.forceRTL(true);
                    I18nManager.allowRTL(true);
                    Updates.reloadAsync();
                    return;
                }

                if (useLocale("direction") == "ltr" && I18nManager.isRTL != false) {

                    I18nManager.forceRTL(false);
                    I18nManager.allowRTL(false);
                    Updates.reloadAsync();
                    return;
                }


            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
            }
        }

        loadResourcesAndDataAsync();
    }, []);
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";
import { LocaleType } from "../../shared/types/ui";
import { COUNTRY_ID } from "../../shared/types/utils/StorageKeys";
import { LOAD_COUNTRY_ID, LOAD_LANGUAGE_ID, LOAD_LOCALE, PersonalizeAction, UPDATE_SETTINGS_MODAL_CANCELABLE, UPDATE_SETTINGS_MODAL_SHOWN } from "../models/personalizeModels";

export const LoadLocale = (variables: LocaleType) => {
    return async (dispatch: Dispatch<PersonalizeAction>) => {
        dispatch({ type: LOAD_LOCALE, payload: variables });
    };
};

export const LoadCountryId = (variables: number) => {
    return async (dispatch: Dispatch<PersonalizeAction>) => {
        dispatch({ type: LOAD_COUNTRY_ID, payload: variables });
    };
};

export const LoadLanguageId = (variables: number) => {
    return async (dispatch: Dispatch<PersonalizeAction>) => {
        dispatch({ type: LOAD_LANGUAGE_ID, payload: variables });
    };
};

export const LoadSettingsModal = () => {
    return async (dispatch: Dispatch<PersonalizeAction>) => {
        const countryId = await AsyncStorage.getItem(COUNTRY_ID);

        dispatch({ type: UPDATE_SETTINGS_MODAL_SHOWN, payload: countryId == null });
        dispatch({ type: UPDATE_SETTINGS_MODAL_CANCELABLE, payload: countryId != null });
    };
}

export const UpdateSettingsModalShown = (value: boolean) => {
    return async (dispatch: Dispatch<PersonalizeAction>) => {
        dispatch({ type: UPDATE_SETTINGS_MODAL_SHOWN, payload: value });
    };
}

export const SelectCountry = (value: number, onSuccess?: () => Promise<void> | void) => {
    return async (dispatch: Dispatch<PersonalizeAction>) => {
        await AsyncStorage.setItem(COUNTRY_ID, value + '');

        dispatch({ type: LOAD_COUNTRY_ID, payload: value });

        dispatch({ type: UPDATE_SETTINGS_MODAL_SHOWN, payload: false });
        dispatch({ type: UPDATE_SETTINGS_MODAL_CANCELABLE, payload: true });

        onSuccess && onSuccess();

    };
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";
import { LanguagesClient } from "../../client/api.generated.clients";
import { client } from "../../client/baseClient";
import { handleError } from "../../client/RequestHelpers";
import { LANGUAGE_ID, LOCALE } from "../../shared/types/utils/StorageKeys";
import { LanguagesAction, LOAD_LANGUAGES, UPDATE_LOADING } from "../models/languagesModels";

export const LoadLanguages = (onSuccess?: () => Promise<void> | void) => {
    return async (dispatch: Dispatch<LanguagesAction>) => {
        try {
            dispatch({ type: UPDATE_LOADING, payload: true });

            let res = await new LanguagesClient(undefined, client).getAll();

            if (res.succeeded && res.data) {
                let locale = await AsyncStorage.getItem(LOCALE) ?? "en";
                await AsyncStorage.setItem(LANGUAGE_ID, res.data.find(l => l.name == locale)?.id + '')
                dispatch({ type: LOAD_LANGUAGES, payload: res.data });

                onSuccess && onSuccess();
            }
            else {
            }
        } catch (error) {
            handleError(error)
        }
        finally {
            dispatch({ type: UPDATE_LOADING, payload: false });
        }
    };
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";
import { WordsClient } from "../../client/api.generated.clients";
import { client } from "../../client/baseClient";
import { handleError } from "../../client/RequestHelpers";
import { COUNTRY_ID, LANGUAGE_ID, LOCALE } from "../../shared/types/utils/StorageKeys";
import { WordsAction, LOAD_WORDS, UPDATE_LOADING } from "../models/wordsModels";

export const LoadWords = (onSuccess?: () => Promise<void> | void) => {
    return async (dispatch: Dispatch<WordsAction>) => {
        try {
            dispatch({ type: UPDATE_LOADING, payload: true });
            let languageId = await AsyncStorage.getItem(LANGUAGE_ID) ?? '1';
            let countryId = await AsyncStorage.getItem(COUNTRY_ID) ?? '1';

            let res = await new WordsClient(undefined, client).getAll(
                parseInt(languageId),
                parseInt(countryId)
            );

            if (res.succeeded && res.data) {
                let locale = await AsyncStorage.getItem(LOCALE) ?? "en";
                await AsyncStorage.setItem(LANGUAGE_ID, res.data.find(l => l.name == locale)?.id + '')
                dispatch({ type: LOAD_WORDS, payload: res.data });

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

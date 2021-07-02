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
            let languageId = await AsyncStorage.getItem(LANGUAGE_ID);
            let countryId = await AsyncStorage.getItem(COUNTRY_ID);

            let res = await new WordsClient(undefined, client).getAll(
                parseInt(languageId ?? '1'),
                parseInt(countryId ?? '1')
            );

            if (res.succeeded && res.data) {
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

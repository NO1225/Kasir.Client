import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";
import { CountriesClient } from "../../client/api.generated.clients";
import { client } from "../../client/baseClient";
import { handleError } from "../../client/RequestHelpers";
import { LANGUAGE_ID, LOCALE } from "../../shared/types/utils/StorageKeys";
import { CountriesAction, LOAD_COUNTRIES, UPDATE_LOADING } from "../models/countriesModels";

export const LoadCountries = (onSuccess?: () => Promise<void> | void) => {
    return async (dispatch: Dispatch<CountriesAction>) => {
        try {
            dispatch({ type: UPDATE_LOADING, payload: true });
            let languageId = await AsyncStorage.getItem(LANGUAGE_ID) ?? '1';

            let res = await new CountriesClient(undefined, client).getAll(
                parseInt(languageId)
            );

            if (res.succeeded && res.data) {
                dispatch({ type: LOAD_COUNTRIES, payload: res.data });

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

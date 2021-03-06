import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";
import { AppInfoClient, AuthClient, CountriesClient, CreatePushTokenCommand } from "../../client/api.generated.clients";
import { client } from "../../client/baseClient";
import { handleError } from "../../client/RequestHelpers";
import { LANGUAGE_ID, LOCALE, PUSH_TOKEN } from "../../shared/types/utils/StorageKeys";
import { AppInfoAction, LOAD_APP_INFO, UPDATE_LOADING } from "../models/appInfoModels";

export const LoadAppInfo = (onSuccess?: () => Promise<void> | void) => {
    return async (dispatch: Dispatch<AppInfoAction>) => {
        try {
            dispatch({ type: UPDATE_LOADING, payload: true });
            let languageId = await AsyncStorage.getItem(LANGUAGE_ID) ?? '1';

            let res = await new AppInfoClient(undefined, client).info(
                parseInt(languageId)
            );

            if (res.succeeded && res.data) {
                dispatch({ type: LOAD_APP_INFO, payload: res.data });

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


export const SetPushToken = (onSuccess?: () => Promise<void> | void) => {
    return async (dispatch: Dispatch<AppInfoAction>) => {
        try {
            dispatch({ type: UPDATE_LOADING, payload: true });
            let pushToken = await AsyncStorage.getItem(PUSH_TOKEN) ?? '';

            let command = new CreatePushTokenCommand({ token: pushToken });
            let res = await new AuthClient(undefined, client).addPushToken(command);
        } catch (error) {
            handleError(error)
        }
        finally {
            dispatch({ type: UPDATE_LOADING, payload: false });
        }
    };
};

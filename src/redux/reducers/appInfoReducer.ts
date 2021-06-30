import { AppInfo } from "../../client/api.generated.clients";
import { ReduxState } from "../../shared/types/redux";
import { AppInfoAction, LOAD_APP_INFO, ON_ERROR, UPDATE_LOADING } from "../models/appInfoModels";

export type AppInfoState = ReduxState<AppInfo> & {
}

const initialState: AppInfoState = {
    data: {} as AppInfo,
    error: undefined,
    isLoading: false,
}

const AppInfoReducer = (state = initialState, action: AppInfoAction): AppInfoState => {
    switch (action.type) {
        case LOAD_APP_INFO:
            return {
                ...state,
                data: action.payload,
            };
        case UPDATE_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        case ON_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state
    }
}

export { AppInfoReducer }
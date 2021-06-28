import { ReduxState } from "../../shared/types/redux";
import { LOAD_COUNTRY_ID, LOAD_LANGUAGE_ID, LOAD_LOCALE, Personalize, PersonalizeAction, UPDATE_SETTINGS_MODAL_CANCELABLE, UPDATE_SETTINGS_MODAL_SHOWN } from "../models/personalizeModels";

export type PersonalizeState = ReduxState<Personalize> & {
}

const initialState: PersonalizeState = {
    data: {
        locale: "ar",
        settingModalShown: true,
        settingModalCancelable: false,
        countryId: -1,
        languageId: -1,
    },
    error: undefined,
    isLoading: false,
}

const PersonalizeReducer = (state = initialState, action: PersonalizeAction): PersonalizeState => {
    switch (action.type) {
        case LOAD_LOCALE:
            return {
                ...state,
                data: {
                    ...state.data,
                    locale: action.payload
                },
            };
        case LOAD_COUNTRY_ID:
            return {
                ...state,
                data: {
                    ...state.data,
                    countryId: action.payload
                },
            };
        case LOAD_LANGUAGE_ID:
            return {
                ...state,
                data: {
                    ...state.data,
                    languageId: action.payload
                },
            };
        case UPDATE_SETTINGS_MODAL_SHOWN:
            return {
                ...state,
                data: {
                    ...state.data,
                    settingModalShown: action.payload
                },
            };

        case UPDATE_SETTINGS_MODAL_CANCELABLE:
            return {
                ...state,
                data: {
                    ...state.data,
                    settingModalCancelable: action.payload
                },
            };

        default:
            return state
    }
}

export { PersonalizeReducer }
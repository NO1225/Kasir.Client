import { ReduxState } from "../../shared/types/redux";
import { LanguagesAction, LanguagesModel, LOAD_LANGUAGES, ON_ERROR, UPDATE_LOADING } from "../models/languagesModels";

export type LanguagesState = ReduxState<LanguagesModel> & {
}

const initialState: LanguagesState = {
    data: [],
    error: undefined,
    isLoading: false,
}

const LanguagesReducer = (state = initialState, action: LanguagesAction): LanguagesState => {
    switch (action.type) {
        case LOAD_LANGUAGES:
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

export { LanguagesReducer }
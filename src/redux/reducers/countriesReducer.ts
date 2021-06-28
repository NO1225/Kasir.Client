import { ReduxState } from "../../shared/types/redux";
import { CountriesAction, CountriesModel, LOAD_COUNTRIES, ON_ERROR, UPDATE_LOADING } from "../models/countriesModels";

export type CountriesState = ReduxState<CountriesModel> & {
}

const initialState: CountriesState = {
    data: [],
    error: undefined,
    isLoading: false,
}

const CountriesReducer = (state = initialState, action: CountriesAction): CountriesState => {
    switch (action.type) {
        case LOAD_COUNTRIES:
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

export { CountriesReducer }
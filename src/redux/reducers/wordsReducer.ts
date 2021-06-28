import { ReduxState } from "../../shared/types/redux";
import { WordsAction, WordsModel, LOAD_WORDS, ON_ERROR, UPDATE_LOADING } from "../models/wordsModels";

export type WordsState = ReduxState<WordsModel> & {
}

const initialState: WordsState = {
    data: [],
    error: undefined,
    isLoading: false,
}

const WordsReducer = (state = initialState, action: WordsAction): WordsState => {
    switch (action.type) {
        case LOAD_WORDS:
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

export { WordsReducer }
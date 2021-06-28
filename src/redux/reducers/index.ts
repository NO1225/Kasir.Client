import { combineReducers } from "redux"
import { CountriesReducer } from "./countriesReducer";
import { LanguagesReducer } from "./languagesReducer";

import { PersonalizeReducer } from "./personalizeReducer";
import { WordsReducer } from "./wordsReducer";

export const rootReducer = combineReducers({
    personalize: PersonalizeReducer,
    languages: LanguagesReducer,
    countries: CountriesReducer,
    words: WordsReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
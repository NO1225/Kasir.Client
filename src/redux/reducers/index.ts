import { combineReducers } from "redux"
import { AppInfoReducer } from "./appInfoReducer";
import { CountriesReducer } from "./countriesReducer";
import { LanguagesReducer } from "./languagesReducer";

import { PersonalizeReducer } from "./personalizeReducer";
import { WordsReducer } from "./wordsReducer";

export const rootReducer = combineReducers({
    personalize: PersonalizeReducer,
    languages: LanguagesReducer,
    countries: CountriesReducer,
    words: WordsReducer,
    appInfo: AppInfoReducer
})

export type RootState = ReturnType<typeof rootReducer>;
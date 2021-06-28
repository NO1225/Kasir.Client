import { Language } from "../../client/api.generated.clients";
import { ReduxAction } from "../../shared/types/redux";

export type LanguagesModel = Language[];

export const LOAD_LANGUAGES = "languages/LOAD_LANGUAGES";

export const UPDATE_LOADING = "languages/UPDATE_LOADING";
export const ON_ERROR = "languages/ON_ERROR";

export type LoadLanguagesAction = ReduxAction<typeof LOAD_LANGUAGES, LanguagesModel>

export type LoadingAction = ReduxAction<typeof UPDATE_LOADING, boolean>
export type ErrorAction = ReduxAction<typeof ON_ERROR, string | undefined>

export type LanguagesAction = LoadLanguagesAction | LoadingAction | ErrorAction;

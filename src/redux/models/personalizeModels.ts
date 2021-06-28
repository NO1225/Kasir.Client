import { ReduxAction } from "../../shared/types/redux";
import { LocaleType, ThemeType } from "../../shared/types/ui";

export interface Personalize {
    locale: LocaleType;
    countryId: number,
    languageId: number,
    settingModalShown: boolean;
    settingModalCancelable: boolean;
}

export const LOAD_LOCALE = "personalize/LOAD_APP_VERSION";
export const LOAD_COUNTRY_ID = "personalize/LOAD_COUNTRY_ID";
export const LOAD_LANGUAGE_ID = "personalize/LOAD_LANGUAGE_ID";
export const UPDATE_SETTINGS_MODAL_SHOWN = "personalize/UPDATE_SETTINGS_MODAL_SHOWN";
export const UPDATE_SETTINGS_MODAL_CANCELABLE = "personalize/UPDATE_SETTINGS_MODAL_CANCELABLE";

export type LoadLocaleAction = ReduxAction<typeof LOAD_LOCALE, LocaleType>
export type LoadCountryIdAction = ReduxAction<typeof LOAD_COUNTRY_ID, number>
export type LoadLanguageIdAction = ReduxAction<typeof LOAD_LANGUAGE_ID, number>
export type UpdateSettingsModalShownAction = ReduxAction<typeof UPDATE_SETTINGS_MODAL_SHOWN, boolean>
export type UpdateSettingsModalCancelableAction = ReduxAction<typeof UPDATE_SETTINGS_MODAL_CANCELABLE, boolean>

export type PersonalizeAction = LoadLocaleAction
    | LoadCountryIdAction
    | LoadLanguageIdAction
    | UpdateSettingsModalShownAction
    | UpdateSettingsModalCancelableAction

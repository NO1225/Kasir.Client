import { Country } from "../../client/api.generated.clients";
import { ReduxAction } from "../../shared/types/redux";

export type CountriesModel = Country[];

export const LOAD_COUNTRIES = "countries/LOAD_LANGUAGES";

export const UPDATE_LOADING = "countries/UPDATE_LOADING";
export const ON_ERROR = "countries/ON_ERROR";

export type LoadCountriesAction = ReduxAction<typeof LOAD_COUNTRIES, CountriesModel>

export type LoadingAction = ReduxAction<typeof UPDATE_LOADING, boolean>
export type ErrorAction = ReduxAction<typeof ON_ERROR, string | undefined>

export type CountriesAction = LoadCountriesAction | LoadingAction | ErrorAction;

import { AppInfo } from "../../client/api.generated.clients";
import { ReduxAction } from "../../shared/types/redux";

export const LOAD_APP_INFO = "appinfo/LOAD_APP_INFO";

export const UPDATE_LOADING = "appinfo/UPDATE_LOADING";
export const ON_ERROR = "appinfo/ON_ERROR";

export type LoadAppInfoAction = ReduxAction<typeof LOAD_APP_INFO, AppInfo>

export type LoadingAction = ReduxAction<typeof UPDATE_LOADING, boolean>
export type ErrorAction = ReduxAction<typeof ON_ERROR, string | undefined>

export type AppInfoAction = LoadAppInfoAction | LoadingAction | ErrorAction;

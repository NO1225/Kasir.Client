import { Word } from "../../client/api.generated.clients";
import { ReduxAction } from "../../shared/types/redux";

export type WordsModel = Word[];

export const LOAD_WORDS = "words/LOAD_WORDS";

export const UPDATE_LOADING = "words/UPDATE_LOADING";
export const ON_ERROR = "words/ON_ERROR";

export type LoadWordsAction = ReduxAction<typeof LOAD_WORDS, WordsModel>

export type LoadingAction = ReduxAction<typeof UPDATE_LOADING, boolean>
export type ErrorAction = ReduxAction<typeof ON_ERROR, string | undefined>

export type WordsAction = LoadWordsAction | LoadingAction | ErrorAction;

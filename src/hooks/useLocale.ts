import * as React from 'react';
import Locale from '../shared/locales/Locale';
import { store } from '../redux/rootStore';

export function useLocale(
  stringName: keyof typeof Locale.en
    & keyof typeof Locale.ar
    & keyof typeof Locale.sp
    & keyof typeof Locale.fr,
  props: {
    en?: string;
    ar?: string;
    sp?: string;
    fr?: string;
  } = {}
) {
  const locale = store.getState().personalize.data.locale;
  const stringFromLocale = props[locale];

  if (stringFromLocale) {
    return stringFromLocale;
  } else {
    return Locale[locale][stringName];
  }
}
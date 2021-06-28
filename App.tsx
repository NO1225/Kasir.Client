import React, { } from 'react';

import { Provider } from 'react-redux';
import Entry from './src/Entry';
import useCachedResources from './src/hooks/useCachedResources';
import { store } from './src/redux/rootStore';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <Entry />
      </Provider>
    );
  }
}

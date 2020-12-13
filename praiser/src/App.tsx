import React from 'react';
import * as UiContext from './contexts/ui';
import Routes from './routes';

const App = () => {
  const [applicationState, setApplicationState] = React.useState(UiContext.createApplicationInitialState());
  return (
    <UiContext.Context.Provider value={{ applicationState, setApplicationState }}>
      <Routes />
    </UiContext.Context.Provider>
  );
};

export default App;

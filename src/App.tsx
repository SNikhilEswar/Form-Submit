import React from 'react';
import Forms from './Components/Forms';
import { Provider } from 'react-redux';
import store from './Components/Forms/store';
function App() {
  return (
    <Provider store={store}>
      <Forms />
    </Provider>
  );
}

export default App;

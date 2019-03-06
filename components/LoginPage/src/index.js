import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Authform from './components/Authform';
import reducers from './reducers';

const store = createStore(reducers);

const App = () => {
    return (
        <Provider store={store}>
            <Authform />
        </Provider>
    )
};

export default App;
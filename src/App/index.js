import React from 'react';

import { Provider } from 'react-redux';

import { AudioProvider } from 'audioContext';

import store from 'store'

import Layout from './Layout';


const App = () => (
    <Provider store={store}>
        <AudioProvider>
            <Layout />
        </AudioProvider>
    </Provider>
);

export default App;

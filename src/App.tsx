import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from './@redux/store';

function App() {
    return (
        <Provider store={store}>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
        </Provider>
    );
}

export default App;

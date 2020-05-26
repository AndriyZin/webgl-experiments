import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from './@redux/store';
import { Button } from 'antd';

function App() {
    return (
        <Provider store={store}>
            <Button>Hello Antd Button</Button>
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
        </Provider>
    );
}

export default App;

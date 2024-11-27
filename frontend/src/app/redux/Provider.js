"use client"

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/store"
const { Provider } = require("react-redux");

export const Providers = ({children}) => {
    return <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>

        {children}
        </PersistGate>
    </Provider>
}

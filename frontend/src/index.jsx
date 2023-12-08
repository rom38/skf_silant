import React, { render } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
//import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import { Layout } from "./components/Layout";
import { store } from './services/store'

const colors = {
    'sil-b': '#163E6C',
    'sil-r': '#163E6C',
    'sil-w': '#163E6C',
}


const breakpoints = {
    base: "0px",
    sm: "360px",
    md: "1440px",
    lg: "1536px",
    xl: "1366px",
    "2xl": "1920px",
};

const theme = extendTheme({ colors, breakpoints })


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>

            <Provider store={store}>
                <Layout />
            </Provider>
        </ChakraProvider>

    </React.StrictMode>
);

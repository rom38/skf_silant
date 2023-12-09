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
    'sil-r': '#D20A11',
    'sil-w': '#EBE6D6',
    white: "#EBE6D6",
    'silant-b': {
        50: "#0e2643ff",
        100: "#0f2a4aff",
        200: "#102E51ff", // "#8192A1ff",
        300: "#123359ff", // "#4C6887ff",
        400: "#143963ff", //"#163E6Cff",
        500: "#163E6Cff",
        600: "#4c6887ff", // "#123359ff",
        700: "#8192a1ff",//"#102E51ff",
        800: "#B6bcbcff", //"#0F2A4Aff",
        900: "#EBE6D6ff", //#0E2643ff",
    },
    'silant-r': {
        50: "#EBE6D6ff",
        100: "#E5AFA5ff",
        200: "#DF7874ff", // "#8192A1ff",
        300: "#D94143ff", // "#4C6887ff",
        400: "#D6262Aff", //"#163E6Cff",
        500: "#D20A11ff",
        600: "#AD090Fff", // "#123359ff",
        700: "#87070Cff",//"#102E51ff",
        800: "#620609ff", //"#0F2A4Aff",
        900: "#3C0406ff", //#0E2643ff",
    },
}

// --yale-blue: #163e6cff;
// --indigo-dye: #224467ff;
// --indigo-dye-2: #2d4962ff;
// --charcoal: #384f5dff;
// --paynes-gray: #5f7172ff;
// --battleship-gray: #869387ff;
// --ash-gray: #c8d1b6ff;
// --eggshell: #d4d8c1ff;
// --eggshell-2: #e0dfccff;
// --eggshell-3: #ebe6d6ff;



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

import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "../styles/style.scss";

import App from "./components/app/App";

declare global {
    interface Window {
        startApp: any;
    }
}

interface startAppProps {
    mountPoint: string;
}

window.startApp = async ({ mountPoint }: startAppProps) => {
    ReactDOM.render(<App />, document.getElementById(mountPoint));
};

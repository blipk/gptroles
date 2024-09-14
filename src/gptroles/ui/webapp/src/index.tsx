import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./components/App";

const container = document.getElementById("app") || document.body.appendChild(document.createElement("app"));
const root = createRoot(container);
// console.log(document)
// console.log(container)
// console.log(root)
root.render(<App/>);


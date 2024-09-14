import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"


const rootElement = document.getElementById( "root" ) ?? document.body.appendChild( document.createElement( "div", {} ) )
rootElement.setAttribute( "id", "root" )

const root = ReactDOM.createRoot( rootElement )

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
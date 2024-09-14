import React, { useRef, useEffect, useState } from 'react';

import ChatPage from "./ChatPage.jsx";

const App: React.FC = () => {
    return (
        <div className="root">
            {/* <header>
                <a>schedule.d</a>

                <label htmlFor="hamburger">&#9776;</label>
                <input type="checkbox" id="hamburger" />
            </header> */}

            <section id="content">
                <ChatPage/>

            </section>
        </div>
    );
};




export default App;
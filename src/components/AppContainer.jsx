import React from "react";

import Todo from "./Todo";
import "./styles/AppContainer.css";

function AppContainer(){
    return(
        <main className="main">
            <div className="main-container">
                <Todo/>
            </div>
        </main>
    )
}
export default AppContainer;
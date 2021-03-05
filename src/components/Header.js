import React from "react";

const refreshPage = () => {
    window.location.reload()
}

const Header = props => {
    return (
        <header className="App-header" onClick={refreshPage}>
            <h2>{props.text}</h2>
        </header>
    )
}
export default Header
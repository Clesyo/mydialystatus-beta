import React from "react";
import NavBar from './navBar';

const Header = () => {
    return (
        <div>
            <div className="bg-gray-200 py-4" >
                <h1>
                    <img className="h-24 block mx-auto" src="/logo.png" alt="" height="100"/>
                </h1>
            </div>
            <NavBar/>            
        </div>
    )
}

export default Header
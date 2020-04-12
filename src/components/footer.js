import React from "react";

const Footer = () => {
    return (
        <div className="text-center p-4 bg-gray-400"> 
            MyDailyStatus é um projeto criado durante o FullStack Lab do DevPleno.
            <br/>
            Implementado por: {' '}
            <a className="hover:underline hover:text-red-600" href='https://www.linkedin.com/in/clesyosilva/'>Clesyo Silva</a>
        </div>
    )
}

export default Footer
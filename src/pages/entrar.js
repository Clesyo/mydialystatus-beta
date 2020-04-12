import React from 'react';

const Entrar = () => {
    return (
            <div className="box-border h-64 w-1/2 p-4 bg-gray-200 mx-auto mt-8">
                <div className="mx-auto text-center">
                    <h1 className="font-bold text-3xl" >Entrar</h1>
                </div>
                <div className="mt-4">
                    <div className="mt-2">
                        <label className="mx-4 font-bold block">Usuário:</label>
                        <input className="shadow rounded border-gray-500 py-1 w-auto" type="text" name="" id=""/>
                    </div>
                    <div className="mt-2">
                        <label className="mx-4 font-bold block">Senha:</label>
                        <input className="shadow rounded border-gray-500 py-1 w-auto" type="text" name="" id=""/>
                    </div>
                </div>
            </div>
    )
}

export default Entrar
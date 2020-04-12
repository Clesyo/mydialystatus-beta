import React, { useState } from 'react'
import auth0 from '../lib/auth0';
import axios from 'axios';

const CreateStatus = () =>{
    const [datas, setDatas] = useState({
        status: 'bem',
        coords: {
            lat: null,
            long: null,
        }
    })
    const getMyLocation = () =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                setDatas(old => {
                    return {
                        ...old,
                        coords: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude,
                        }
                    }
                })
            })

        }
    }
    const onStatusChange = evt => {
        const value = evt.target.value
        setDatas(old => {
            return {
                ...old,
                status: value,
            }
        })
    }

    const save = async () => {
        await axios.post('/api/save-status',datas)
    }
    return (
        <div>
            <h1>Create Status</h1>
            <label className="block" htmlFor="">
            <input type="radio" name="status" value="bem" id="bem" onClick={onStatusChange}/> Estou bem e sem sintomas</label>
            <label className="block" htmlFor="">

            <input type="radio" name="status" value="gripe" id="gripe" onClick={onStatusChange}/> Estou com sintomas de gripe.</label>
            <label className="block" htmlFor="">

            <input type="radio" name="status" value="covid" id="covid" onClick={onStatusChange}/>Estou com sitmos de COVID</label>
            Sua posição atual: {JSON.stringify(datas)}
            <button className="block border-solid rounded border-gray-500" onClick={getMyLocation}> Pegar minha localização</button>
            <button className="block border-solid rounded border-gray-500" onClick={save}> Salvar meu status</button>
        </div>
    )
}
export default CreateStatus


export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req)
    if(session){
        
        return{
            props: {
                isAuth:true,
                user: session.user,
            }
        }
    }

    return {
        props: {
            isAuth: false,
            user: {}
        }
    }


}
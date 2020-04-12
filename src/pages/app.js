import React, { useEffect } from 'react';
import router from 'next/router';
import auth0 from '../lib/auth0';
import {db} from '../lib/db';
import {distance} from '../lib/geo';

const App = props => {
    //Verifica se o usuário está logado
    useEffect(() => {
        if(!props.isAuth){
            router.push('/');
        }else if(props.forceCreate){
            router.push('/create-status')
        }
    })
    if(!props.isAuth || props.forceCreate){
        return null
    }

    return (
        <div className="container">
                <h1>Status proximo a você:</h1>
                <table className="table-auto mx-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Latitude</th>
                            <th className="px-4 py-2">Longitude</th>
                            <th className="px-4 py-2">Distancia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.checkins.map(checkin => {
                            return (
                                <tr>
                                    <td className="border px-4 py-2">{checkin.id === props.user.sub && 'Seu status:'}</td>
                                    <td className="border px-4 py-2">{checkin.status}</td>
                                    <td className="border px-4 py-2">{checkin.coords.lat}</td>
                                    <td className="border px-4 py-2">{checkin.coords.long}</td>
                                    <td className="border px-4 py-2">{checkin.distance}</td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>
        </div>
    )
}

export default App 

export async function getServerSideProps({ req, res }) {
    const session = await auth0.getSession(req);
    if(session){
        const today = new Date()
        const currentdDate =
        today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()

        const todaysCheckin = await db
            .collection('markers')
            .doc(currentdDate)
            .collection('checks')
            .doc(session.user.sub)
            .get()
            const todaysData = todaysCheckin.data()
            
            let forceCreate = true
            const checkinsList = []
            
            if(todaysData){
                forceCreate = false
                const checkins = await db
                .collection('markers')
                .doc(currentdDate)
                .collection('checks')
                .near({
                    center: todaysData.coordinates,
                    radius: 1000
                })
                .get()

                checkins.docs.forEach(doc =>{
                    checkinsList.push({
                        id: doc.id,
                        status: doc.data().status,
                        coords: {
                            lat: doc.data().coordinates.latitude,
                            long: doc.data().coordinates.longitude,
                        },
                        distance: distance(
                            todaysData.coordinates.latitude, 
                            todaysData.coordinates.longitude,
                            doc.data().coordinates.latitude,
                            doc.data().coordinates.longitude
                            ).toFixed(2)
                    })
                    
                })
                
            }
        return{
            props: {
                isAuth:true,
                user: session.user,
                forceCreate: false,
                checkins: checkinsList,
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
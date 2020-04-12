import auth0 from '../../lib/auth0';
import admin from 'firebase-admin';
import { db } from "../../lib/db";

const saveStatus = async (req, rep) =>{
    const session = await auth0.getSession(req)
    if(session){
        console.log(session);
        const datas = req.body
        const today = new Date()
        const currentdDate =
        today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()

        await db.collection('markers')
        .doc(currentdDate)
        .collection('checks')
        .doc(session.user.sub)
        .set({
            status: datas.status,
            user: session.user.sub,
            coordinates: new admin.firestore.GeoPoint(datas.coords.lat, datas.coords.long),
        })
        console.log(req.body);
        rep.send({ok: true})
    
    }
}

export default saveStatus
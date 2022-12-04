// contains the Firebase context and provider
import { createContext} from 'react'

import firebaseConfig from '../firebase/confige'
import { initializeApp } from 'firebase/app'
import { getFirestore, query,collection, onSnapshot} from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { addAll } from '../redux/carsSlice'


const FirebaseContext = createContext(null)
export { FirebaseContext }

export default ({children}) => {

    let firebase = {
        app: null,
        db: null
    }

    const dispatch = useDispatch();
    const app = initializeApp(firebaseConfig);
   
    // check if firebase app has been initialized previously
    // if not, initialize with the config we saved earlier
    if (!app.apps?.length) {
        const app = initializeApp(firebaseConfig);
        firebase = {
            app: app,
            db: getFirestore(app),

            api: {
                pullCarsData
            }
        }
    }



    function pullCarsData(){
        const q = query(collection(firebase.db,'Cars'));
        onSnapshot(q,(querySnapshot)=>{
            dispatch(addAll(querySnapshot.docs.map(doc=>({
                id:doc.id,
                model:doc.data()['model'],
                year:doc.data()['year'],
                color:doc.data()['color'],
               
            }))));
        })
    }

    return (
        <FirebaseContext.Provider value={firebase}>
            {children}
        </FirebaseContext.Provider>
    )

}
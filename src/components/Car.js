import Style from './Main.module.css'
import { useDispatch } from 'react-redux'
import { remove } from '../redux/carsSlice'
import { useContext } from 'react'
import { FirebaseContext } from '../context/firebase'



const Car = ({data}) => {

    const {db} = useContext(FirebaseContext);
    const dispatch =  useDispatch();

    const handleDelete = async()=>{

        dispatch(remove(data.id));
        
        // const documentRef = doc(db,'Cars',data.id);
        // console.log(documentRef);
        // try{
        //     deleteDoc(documentRef);
        // }catch(err){
        //     console.log(err.message);
        // }

        

    }


    return <div className={Style.carCard}>
                Model:{data.model}<br/>
                Year:{data.year}<br/>
                Color:{data.color}<br/>
                <input type="button" onClick={handleDelete} value="Delete"/>
           </div>
}
 
export default Car;
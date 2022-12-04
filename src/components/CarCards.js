import { FirebaseContext } from "../context/firebase";
import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import {useContext,useEffect,useState} from 'react';
import Style from './Main.module.css'
import Car from './Car'
import AddCar from "./AddCar";



const CarCards = () => {
    
    const [showAddCard,setShowAddCard] = useState(false);
    const {api, db} = useContext(FirebaseContext);
    const data = useSelector(state=> state.cars.value);
   


    
    
    useEffect(() => {
        
       api.pullCarsData();
        
    }, []);

    const addNewDoc = async (d)=>{
      const docRef = await doc(db, 'Cars',d.id);

      const docExist = await getDoc(docRef);
   

      if(!docExist.exists()){
         try{
           
            await addDoc(collection(db,'Cars'),{
               id:d.id,
               model:d.model,
               year:d.year,
               color:d.color
            })
         }catch(e){
            console.log('Error Message while adding new document:\n'+e.message);
         }
         
    
      } 
              
   }
    
   const handleSaveChanges = ()=>{
    
      data.forEach((doc) => {
         addNewDoc(doc).then(d=>console.log(d));
      })
      
      
   }


    
    
    return <div className={Style.container}>
               <h4>Cars Collection:</h4>
               <button onClick={()=>setShowAddCard(true)}>Add New Car</button>
               {data.map(c=> <Car key={c.id} data={c}></Car>)}
               {showAddCard&&<AddCar cb={setShowAddCard}></AddCar>}
             <button onClick={handleSaveChanges} className={Style.saveBtn}>Save All Chenges</button>
            </div>
          
 
           
             
}
 
export default CarCards;
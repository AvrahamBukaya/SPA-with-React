import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch } from 'react-redux'
import { add } from '../redux/carsSlice'
import  Style  from './Main.module.css'

const AddCar = ({cb:setShowAddCar}) => {

    const [info, setInfo] = useState({
        id:uuidv4()
    });
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        const {name:n,value:v} = e.target;
        setInfo(prev=>({...prev,[n]:v}));
    }

 
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(add(info));
        setShowAddCar(false); 
    }


    return <div className={Style.addCardContainer}>
                <form onSubmit={handleSubmit} className={Style.addCar}>
                    Model: <input type="text"  name="model" required onChange={handleChange} /><br/>
                    Year: <input type="text"   name="year" required onChange={handleChange}/><br/>
                    Color: <input type="text"  name="color" required onChange={handleChange}/><br/>
                    <button type="submit">Add</button>
                </form>
            </div>
           
}
 
export default AddCar;
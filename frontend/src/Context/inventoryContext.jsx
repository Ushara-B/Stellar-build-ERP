import React, { useContext, useState , useEffect} from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/inventories/";


const InventoryContext = React.createContext()

export const InventoryProvider = ({children}) => {

    const [values, setValues] = useState([])
    const [error, setError] = useState(null)

    //calculate Value
    const addInventory = async (value) => {
        const response = await axios.post(`${BASE_URL}add-value`, value)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getValues()
    }

    const getValues = async () => {
        const response = await axios.get(`${BASE_URL}get-value`)
        setValues(response.data)
        console.log(response.data)
    }
    

    const totalValue = () => {
        let totalValue = 0;
        values.forEach((value) =>{
            totalValue = totalValue + value.amount
        })

        return totalValue;
    }




    
    return (
        <InventoryContext.Provider value={{ values, addInventory, getValues, totalValue }}>
            {children}
        </InventoryContext.Provider>
    );
}
export const useInventoryContext = () =>{
    return useContext(InventoryContext)
}
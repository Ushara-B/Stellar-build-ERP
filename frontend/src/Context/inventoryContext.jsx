import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/inventories/";


const InventoryContext = React.createContext()

export const InventoryProvider = ({children}) => {

    const [value, setValue] = useState([])
    const [error, setError] = useState(null)

    //calculate Value
    const addInventory = async (value) => {
        const response = await axios.post(`${BASE_URL}add-value`, value)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getValue()
    }

    const getValue = async () => {
        const response = await axios.get(`${BASE_URL}get-value`)
        setValue(response.data)
        console.log(response.data)
    }

    const deleteValue = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-value/${id}`)
        getValue()
    }

    const totalValue = () => {
        let totalValue = 0;
        value.forEach((value) =>{
            totalValue = totalValue + value.amount
        })

        return totalValue;
    }




    

    return (
        <InventoryContext.Provider value={{
            inventory,

            error,
            setError
        }}>
            {children}
        </InventoryContext.Provider>
    ) 
}

export const useInventoryContext = () =>{
    return useContext(InventoryContext)
}
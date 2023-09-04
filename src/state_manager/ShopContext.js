import { createContext } from "react";

export const FoodContext = createContext(null)

export const FoodContextProvider = ({children}) =>{
    

    return(
        <FoodContext.Provider>

        </FoodContext.Provider>
    )
}
import React, { useContext } from "react"
import * as apiClient from "../api-client"
import { useQuery } from "react-query"


const AppContext = React.createContext();

export const AppContextProvider = ({
    children
}) => {
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    });

    return (
        <AppContext.Provider value={{
            isLoggedIn: !isError
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
}
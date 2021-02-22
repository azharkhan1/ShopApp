
import React, { useContext, useState , useEffect  } from "react";
import axios from "axios";
import url from "../core";
const GlobalStateContext = React.createContext()
const GlobalStateUpdateContext = React.createContext()

export const useGlobalState = () => useContext(GlobalStateContext)
export const useGlobalStateUpdate = () => useContext(GlobalStateUpdateContext)



export function GlobalStateProvider({ children }) {

    const [data, setData] = useState({
        user: null,
        loginStatus: false,
    })


    useEffect(() => {
        axios({
            method: 'get',
            url: url + "/profile",
            withCredentials: true,
        }).then((response) => {
                setData(prev => ({ ...prev, loginStatus: true , user : response.data.profile  }))
        }, (error) => {
            setData(prev => ({ ...prev, loginStatus: false }))
            console.log("error ==============> ", error.response.status );


        });
    } , [] );
  
    

    return (
        <GlobalStateContext.Provider value={data}>
            <GlobalStateUpdateContext.Provider value={setData}>
                {children}
            </GlobalStateUpdateContext.Provider>
        </GlobalStateContext.Provider>
    )
} 
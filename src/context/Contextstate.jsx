import { useEffect, useReducer, useState } from "react"
import { clearStorage, getStorage } from "../api/Storage"
import { Globaldata} from "./Action"
import { GlobalContext } from "./Globalcontext"
import Authentication from "./Globalreducer"

function Contextstate(props){    
    const [globalstate, setglobalstate] = useReducer(Authentication, Globaldata);

    const login_user = (data) => {
        setglobalstate(data);
    }
    const logout_user = () => {                
        setglobalstate(clearStorage())
    }
    const contextdata = {
        login: login_user,
        logout: logout_user,
    }    
    useEffect(()=>{
        if(localStorage.getItem("login-info")){
            setglobalstate(getStorage());
        }
    },[])
    return (
        <GlobalContext.Provider value={{ data: globalstate, context: contextdata}}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export default Contextstate;
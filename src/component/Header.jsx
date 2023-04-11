import "./Rent.css"
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/Globalcontext";
import { useContext } from "react";

export default function Header(){
    const{context} = useContext(GlobalContext);
    const navigate = useNavigate();
    function logoutme()
    {
        context.logout();
        navigate("/dashboard")
    }

    return(
        <>
            <section>
                <div className="wi10 dspl_flx hdr_clr">
                    <div className="logo1"></div>
                    <div className="wi8 tae">
                        <NavLink to="/dashboard" className="r_lnk">Home</NavLink>
                        <NavLink to="/servicelist" className="r_lnk">Service</NavLink>
                        <a onClick={()=>{logoutme()}} className="r_lnk">Logout</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export function Header1(){
    const{data,context,price_card} = useContext(GlobalContext);
    const navigate = useNavigate();
    function logoutme()
    {
        context.logout();
        navigate("/dashboard")
    }
    return(
        <>
            <section>
                <div className="wi10 dspl_flx hdr_clr">
                    <div className="logo1"></div>
                    <div className="wi8 tae">
                        <NavLink to="/dashboard" className="r_lnk">Home</NavLink>
                        <NavLink to="/carlist" className="r_lnk">Rental</NavLink>
                        <a onClick={()=>{logoutme()}} className="r_lnk">Logout</a>
                    </div>
                </div>
            </section>
        </>
    )
}
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import "../auth/Auth.css";
import Google_Auth_Login from "./Google_Auth_Login";
import { signup_Data } from "../api/Api";
import { setStorage } from "../api/Storage";
import { GlobalContext } from "../context/Globalcontext";

export default function Signup() {
    const navigate = useNavigate();
    const { data, context } = useContext(GlobalContext);
    const initial_state = {
        first_name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        role:"user"
    }
    const [sdata, setdata] = useState(initial_state);
    function onvaluechange(event) {
        setdata({ ...sdata, [event.target.name]: event.target.value })
    }
    async function validateForm(event) {
        event.preventDefault();
        if (Object.values(sdata).every(v=>v!="")) {
            const response = await signup_Data(sdata);
            console.log(response)
            if(response.status == "success"){
                const result = {...response};
                result.type = "login"
                setStorage(result);
                context.login(result);
                navigate("/dashboard");          
            }         
            else if(response.status=="failed"){
                console.log("hellllllll")
                alert(`${response.message}`)
            }
        }
        else {
            alert("Please fill all Important fields marked as *");
        }
    }
    return (
        <>
            <section className="dspl_flex scn">
                <div className="wi10 dspl_flex submg jcc">
                    <div className="wi9 dspl_flex sn">
                        <div className="wi5">
                        </div>
                        <div className="wi5 dspl_flex jcc sgnup">
                            <div className="wi9 jcc marg1">
                                <div className="wi10 dspl_flex mt-2 mb-2 jcl">
                                    <button className="wi3 lpg_logo" onClick={()=>{navigate("/dashboard")}}> 
                                    </button>
                                </div>
                                <div className="wi10 mt-3 mb-3 jcl">
                                    <h2 className="lgn_head">Signup</h2>
                                    <p className="lgn_para mb-2">Automobile & services just few click away !</p>
                                </div>
                                <form className="tac" name="signup_form" onSubmit={ validateForm}>
                                    <input type={"text"} placeholder="First Name*" name="first_name" className="signp" onChange={ onvaluechange} />
                                    <input type={"email"} placeholder="Email*" name="email" className="signp" onChange={ onvaluechange} />
                                    <input type={"tel"} placeholder="Phone Number*" name="phone" className="signp" onChange={ onvaluechange} />
                                    <input type={"text"} placeholder="Address*" name="address" className="signp" onChange={ onvaluechange} />
                                    <input type={"password"} placeholder="Password*" name="password" className="signp mb-4" onChange={ onvaluechange} />
                                    <Button variant="primary" type="submit" className="sgnbtn">
                                        Signup
                                    </Button>                                
                                </form>                                
                                <p className="al m-1 p-0">Already have account?<NavLink to="/login" className="sn1">Login to Account</NavLink></p>
                                <Google_Auth_Login />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
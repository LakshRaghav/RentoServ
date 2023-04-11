import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../auth/Auth.css";
import { login_Data} from "../api/Api";
import { useContext, useState } from "react";
import Google_Auth_Login from "./Google_Auth_Login";
import { setStorage } from "../api/Storage";
import { GlobalContext } from "../context/Globalcontext";

export default function Login() {
    const navigate = useNavigate();
    const { data, context } = useContext(GlobalContext);
    const initial = {
        email: "",
        password: ""
    }                             
    var style = {
        x: false
    }
    const [fdata, setfdata] = useState(initial);
    const [state, setstate] = useState(style);
    function onvaluechange(event) {
        setfdata({...fdata,[event.target.name]: event.target.value})
    }
    async function validateForm(event) {
        event.preventDefault()
        if(Object.values(fdata).every(v=>v!="")){
            const response  = await login_Data(fdata);
            if(response.status == "success"){
                console.log(response);
                const result = {...response};
                result.type = "login";
                setStorage(result);
                context.login(result);
                navigate("/dashboard");
            }
            else if(response.status=="failed"){
                alert(`${response.message}`);
            }
        }
        else{
            alert("Please fill all the fields");
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
                                <div className="wi10 dspl_flex mt-2 mb-5 jcl">
                                    <button className="wi3 lpg_logo" onClick={()=>{navigate("/dashboard")}}>
                                    </button>
                                </div>
                                <div className="wi10 mt-3 mb-4 jcl">
                                    <h2 className="lgn_head">Login</h2>
                                    <p className="lgn_para">Automobile & services just few click away !</p>
                                </div>
                                <form className="tac" name="login_form" onSubmit={validateForm} >
                                    {state.x == true ? <p className="wrng">*Either password or Email was wrong*</p> : <p></p>}
                                    <label className="labl1">Email *</label><br />
                                    <input type={"email"} placeholder="@gmail.com" name="email" className="signp mb-4" onChange={onvaluechange} /><br />
                                    <label className="labl">Password *</label><br />
                                    <input type={"password"} placeholder="min!8characters" name="password" className="signp" onChange={onvaluechange} />
                                    <Button className="sgnbtn" type="submit">Login</Button>
                                    <p className="al">Not registered yet?<NavLink to={"/signup"} className="sn1">Create an Account</NavLink></p>
                                    <Google_Auth_Login />
                                </form>                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
import React, { useContext, useEffect } from "react";
import "../component/Dashboard.css";
import { GlobalContext } from "../context/Globalcontext";
import Dropdown from "react-bootstrap/Dropdown"
import { BiUserCircle } from "react-icons/bi"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getStorage } from "../api/Storage";
import { contacting, user_data } from "../api/Api";
import { GoogleLogout } from "react-google-login";

function Dashboard(props) {
    const navigate = useNavigate();
    const { data, context } = useContext(GlobalContext);
    var initial_user = {
        first_name: "",
        email: "",
        picture: ""
    }
    var objct = {
        brand: "",
        image: ""
    }
    var initialcontact = {
        email: "",
        first_name: "",
        message: ""
    }
    const [userdata, setuserdata] = useState(initial_user);
    const { state, setstate } = useState(objct);
    const [contactdata, setcontactdata] = useState(initialcontact);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function onvaluechange(event) {
        setcontactdata({ ...contactdata, [event.target.name]: event.target.value })
    }
    function checkauths(event){
       if(data.auth == 0)
       {
        alert("******  Please Login  ******");
        navigate("/login");
       }
       else if(data.auth == 1)
       {
            if(event.target.name == "rentals")
            {
                console.log(event.target.name)
                navigate("/carlist")
            }
            else if(event.target.name == "services")
            {
                navigate("/servicelist")
            }
            else{
                console.log("error")
               }
       }
       else{
        console.log("error")
       }
    }
    function logout_account() {
        if (data.type == "login") {
            context.logout();
        }
        else if (data.type == "google-login") {
            context.logout();
        }
    }
    async function contactus(event) {
        event.preventDefault()
        if (data.auth == 1) {
            if (Object.values(contactdata).every(v=>v!="")) {
                alert("sending email please wait..........")
                const response = await contacting(contactdata, getStorage().token);
                if (response.status == "success") {
                    alert(`${response.message}`)
                    navigate("/dashboard")
                }
            }
            else {
                alert("please login");
                navigate("/login")
            }
        }
    }
    async function getmydata(){
        const x = getStorage();
        const y = {};
        if (x.googleId) {
            y.first_name = x.profileObj.givenName;
            y.email = x.profileObj.email;
            y.picture = x.profileObj.imageUrl;
            setuserdata(y);
        }
        else if(x.type == "login"){
            const response = await user_data(getStorage());
            setuserdata(response);
        }
    }
    useEffect(() => {
        if (localStorage.getItem("login-info")) {
            getmydata()
        }
    },[])
    return (
        <>
            <header>
                <div className="part1">
                    <div className="part1_mnbox">
                        <div className="header dspl_flx">
                            <div className="wi2">
                                <div className="logo">
                                </div>
                            </div>
                            <div className="wi8">
                                {data.auth == 0 ?
                                    <nav className="nv">
                                        <a href="#About us" className="nv_lnk">About Us</a>
                                        <a href="#Contact us" className="nv_lnk">Contact Us</a>
                                        <a className="nv_lnk" onClick={checkauths} name="rentals">Rentals</a>
                                        <a className="nv_lnk" onClick={checkauths} name="services">Services</a>
                                        <a href="/login" className="nv_lnk">Login</a>
                                        <a href="/signup" className="nv_lnk">Signup</a>
                                    </nav> :
                                    <nav className="nv">
                                        <a href="#About us" className="nv_lnk">About Us</a>
                                        <a href="#Contact us" className="nv_lnk">Contact Us</a>
                                        <a className="nv_lnk" onClick={checkauths} name="rentals">Rentals</a>
                                        <a className="nv_lnk" onClick={checkauths} name="services">Services</a>
                                        <Dropdown className="drpdwn">
                                            <Dropdown.Toggle className="usr_btn">
                                                <BiUserCircle className="usr_icn" />{userdata.first_name}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="mt-2 mr-2 p-3 tac">
                                                <div className="profilediv d-flex">
                                                    <div className="xab">                                        
                                                        <button className="gggg" onClick={handleShow}>
                                                            <img src={userdata.picture} className="profile_pic" />    
                                                        </button>
                                                    </div>
                                                    <div className="wi3 ">
                                                        <p className="username">{userdata.first_name}</p>
                                                    </div>
                                                </div>
                                                <Dropdown.Item>
                                                    <p className="useremail">{userdata.email}</p>
                                                    <p className="p-2 m-0">{userdata.address}</p>
                                                    {data.type == "login"?
                                                    <Button className="logout_btn" onClick={logout_account}>Logout</Button>
                                                    :
                                                    <GoogleLogout
                                                    clientId="711210262927-gi31rmt3ltrj06u2msvhj0lid3p3n9fu.apps.googleusercontent.com"
                                                    buttonText="Logout"
                                                    onLogoutSuccess={logout_account}
                                                    >
                                                    </GoogleLogout>
                                                    }                                                    
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </nav>                                     
                                }                          
                            </div>
                        </div>
                        <div className="div1">
                            <div className="div1_2">
                                <p className="par1">Working in the</p>
                                <h1 className="head">Automobile industry</h1>
                                <h1 className="head">to provide a better</h1>
                                <h1 className="head">Experience.</h1>
                                <p className="par2">The quality is remembered long after the price is forgotten ,</p>
                                <p className="par2">Keeping in mind the role it personify in one's entity.</p>
                                <p className="par2">A major role is played by us to provide Services to maintain the Quality.</p>
                                <Button className="button1" onClick={checkauths} name="rentals">Rent a vehicle</Button>
                                <Button className="button2" onClick={checkauths} name="services">Book Service</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section className="dspl_flx jcc bckdrk" id="About us">
                <div className="wi85 jcc">
                    <div className="wi10 ourptnr">
                        <h1 className="orptnr">About Us</h1>
                    </div>
                    <div className="dspl_flx mt-5 mb-5">
                        <div className="wi48 frstdv">
                        </div>
                        <div className="wi52 dvcont">
                            <h2 className="mblt">All About Mobility</h2>
                            <p className="mbtlp">mobile service that promotes mobility , our business was created to keep</p>
                            <p className="mbtlp">Keeping people moving is the goal of the rental industry, we deliver a</p>
                            <p className="mbtlp">yours moving.</p>
                        </div>
                    </div>
                    <div className="dspl_flx mt-5 mb-5">
                        <div className="wi52 dvcont">
                            <h2 className="mblt">Why Us</h2>
                            <p className="mbtlp">Tailor made vehicle servicing for the automotive rental industry.</p>
                            <p className="mbtlp">We understand and work with rental operators to meet all aspects of</p>
                            <p className="mbtlp">safety, warranty and service schedule compliance.</p>
                            <p className="mbtlp">Rentserv can also assist in re-marketing of all used vehicles.</p>
                        </div>
                        <div className="wi48 scndv">
                        </div>
                    </div>
                    <div className="dspl_flx mt-5 mb-5">
                        <div className="wi48 thrdv">
                        </div>
                        <div className="wi52 dvcont">
                            <h2 className="mblt">How we can help you</h2>
                            <p className="mbtlp">* Mobile vehicle maintainance & Tyres</p>
                            <p className="mbtlp">* Photographic vehicle reporting solutions</p>
                            <p className="mbtlp">* Scheduled service compliance</p>
                            <p className="mbtlp">* Rent a vehicle.</p>
                            <p className="mbtlp">* Book a vehicle for trip.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="dspl_flx jcc clrs" id="Contact us">
                <div className="wi10">
                    <div className="dspl_flx jcc">
                        <div className="wi8">
                            <h1 className="cnt">Contact Us</h1>
                            <p className="cntp">Drop us a line!</p>
                            <div className="wi10 abb" >
                                <form noValidate autoComplete="off" onSubmit={contactus}>
                                    <input placeholder="Email*" className="txtfld" name="email" onChange={onvaluechange} />
                                    <input placeholder="Name" className="txtfld" name="first_name" onChange={onvaluechange} />
                                    <textarea className="txtfld1" placeholder="Message" name="message" rows={5} onChange={onvaluechange}></textarea><br />
                                    <button className="sndbtn" type="submit">SEND</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Dashboard;

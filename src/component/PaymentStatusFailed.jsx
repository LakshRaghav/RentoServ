import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { user_data } from "../api/Api";
import { Constant } from "../api/Constant";
import { getStorage } from "../api/Storage";
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../component/payment.css";
import Paymentbutton from "./PaymentButton";

export default function PaymentStatusFailed(props)
{
    const location = useLocation();
    const navigate = useNavigate();
    const obj= {
        email:"",
        name:"",
        address:"",
        phone:"",
        Drop: "",
        order: ""
    }
    const [user, setuser] = useState(obj);
    const [receiptdata,setreceiptdata] = useState();
    async function getuserdata() {
        if(location.pathname.split("/")[1]=="servicelist")
        {
            // const respo1 = await servicedata(rent,getStorage().token);
            // setreceiptdata(respo1.data[0]);
        }
        else if(location.pathname.split("/")[1]=="carlist")
        {
            const respo1 = await bookdata(rent,getStorage().token);
            // setreceiptdata(respo1.data[0]);
        }
        const x = getStorage();
            if(x.googleId) {
                setuser({...user,email:x.profileObj.email,name:x.profileObj.givenName})
            }
            else if(x.type == "login"){
                const response = await user_data(getStorage());
                setuser({...user,email:response.email,name:response.first_name,address:response.address,phone:response.phone,order:response.order})
            }
      }
    useEffect(() => {
        if (localStorage.getItem("login-info")){
          getuserdata();
        }
      },[])
    return(
        <>                       
            <div className="wi10 headq">
                <div className="wi9 mndiv">
                    <div><img className="lo" src={`${Constant.IMAGE_URL1}/logo3.png`}></img></div>
                    <div className="wi10 d-flex mt-4 jcc">
                        <div className="usrdv"><p className="usrpara">!!!!!   Your payment has failed   !!!!!</p></div>
                    </div>
                    <div className="wi10 d-flex">
                        <div className="wi4 algn">
                            <h1 className="pamntfl">Payment Failed</h1>
                            <p className="paraq">Your Payment failed due to an error please try again go to </p>
                            <p className="paraq">detail menu and fill details required then try payment </p>
                            <p className="paraq">for your product.</p>
                            <ProgressBar now={60} striped variant="danger" className="wi9 bar"/>
                            <div className="divbarqef mb-3"><p className="bardsqef">Vehicle selection</p><p className="bardsqef mll me-5">Payment received</p><p className="bardsqef">Receipt received</p></div>
                            <button className="buttondsn1" onClick={()=>{navigate("/dashboard")}}>Back Home</button>
                        </div>
                        <div className="wi6">
                            <img src={`${Constant.IMAGE_URL1}/failed.jpg`} className="failedimgg"></img>
                        </div>
                    </div>
                </div>
            </div>            
            
        </>
    )
}
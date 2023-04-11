import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createOrder_id, setgoogleorderid, setorderdescription, setorderid, user_data, verifyPaymentStatus } from "../api/Api";
import { Constant } from "../api/Constant";
import { getStorage } from "../api/Storage";
import "../component/payment.css";
import "./Rent.css";

function Paymentbutton(props){
    const navigate = useNavigate();
    const location = useLocation();
    const {sta,rent} = useParams();
    const obj= {
        email:"",
        name:"",
        address:"Address",
        Drop: "",
        Pickup: "",
        Age: "",
        phone:"",
        Adhaar: "",
        val1: "",
        val2: ""
      }
    const [state, setstate] = useState();
    const [user ,setuser] = useState({});
       
    async function func() {
            const abc = await createOrder_id((props.price)*100);
            setstate(abc.order.id);
    }    
    async function getuserdata() {
        const x = getStorage();
            const y = {};
            if(x.googleId) {
                setuser({...user,email:x.profileObj.email,name:x.profileObj.givenName})
            }
            else if(x.type == "login"){
                const response = await user_data(getStorage());
                setuser({...user,email:response.email,name:response.first_name,address:response.address,order:response.order,phone:response.phone})
            }            
      }

      async function statusnow(data){
        const ret = await verifyPaymentStatus(data,getStorage().token);          
        if(ret.signatureIsValid=="true")
        {   var respo = {};
            if(getStorage().googleId) {
                respo = await setgoogleorderid(data,getStorage().token)
            }
            else if(getStorage().type == "login"){
                respo = await setorderid(data,getStorage().token)
            }
            console.log(respo)
            if(respo.status == "success")
            {
                if(location.pathname.split("/")[1]=="servicelist")
                {
                    const x = props.servicedata;
                    x.price = props.price; 
                    x.name=user.name
                    x.address=user.address
                    x.phone=user.phone
                    x.email=user.email
                    localStorage.setItem("order_id",JSON.stringify(data.order_id))
                    localStorage.setItem("servicelist",JSON.stringify(x))
                    navigate("/paymentstatussuccess");
                }
                else if(location.pathname.split("/")[1]=="carlist"){
                    const rdata = props.rentdata;
                    rdata.order_id = data.order_id; 
                    rdata.price = (0.18 * props.price)+props.price;                    
                    await setorderdescription(rdata,getStorage().token)
                    const x = {}
                    x.carid = rent;                    
                    localStorage.setItem("order_id",JSON.stringify(data.order_id))
                    localStorage.setItem("carlist",JSON.stringify(x))
                    navigate("/paymentstatussuccess");
                }                
            }              
            else
            {
                alert(respo.message);    
            }  
        }
        else
        {
            navigate(`/paymentstatusfailed`);
        }
    }

    var options = {
        "key": "rzp_test_iqE6sdUe3x9j2y",
        "amount": `${props.price}00`,
        "currency": "INR",
        "name": "RENTOSERV",
        "description": "Rental and Services",
        "image": `${Constant.IMAGE_URL1}/logopay.png`,
        "order_id": `${state}`,
        "handler":function (response){
            const data = {};
            data.email = user.email;
            data.order_id = response.razorpay_order_id;
            data.payment_id = response.razorpay_payment_id;
            data.signature = response.razorpay_signature;
            statusnow(data);
        },
        "prefill": {
            "name": `${user.name}`,
            "email": `${user.email}`,
            "contact": `${user.phone}`
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#592407"
        }};
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
    async function paymoney(event){
        rzp1.open();                
        event.preventDefault();
    }
    useEffect(() => {
        if (localStorage.getItem("login-info")) {
            func()
            getuserdata();
        }
      },[])
    return (
        <>
            <button onClick={paymoney} className={`${props.dsn}`}>Pay Using RAZORPAY</button>           
        </>
    )
}
export default Paymentbutton;

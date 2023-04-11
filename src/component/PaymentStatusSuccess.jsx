import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookdata, getgoogleinvoice, getuserinvoice } from "../api/Api";
import { Constant } from "../api/Constant";
import { getStorage } from "../api/Storage";
import ProgressBar from 'react-bootstrap/ProgressBar';
import "../component/payment.css";
import jsPDFInvoiceTemplate ,{OutputType} from "jspdf-invoice-template";

export default function PaymentStatusSuccess()
{
    const obj1 = {
        Brand:"",
        Model:"",
        address:"",
        email:"",
        name:"",
        packages:"",
        phone:0,
        price:0,
        val:""
    }
    const navigate = useNavigate();
    const date = new Date();
    const [user, setuser] = useState([]);
    const [receiptd,setreceipt] = useState([]);
    const [receiptdata,setreceiptdata] = useState([]);
    var rental = {
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Invoice 2021",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: `${Constant.IMAGE_URL1}/logo3.png`,
            type: 'PNG', 
            width: 53.33, 
            height: 26.66,
            margin: {
                top: 0, 
                left: 0 
            }
        },
        stamp: {
            inAllPages: true, 
            src: ``,
            type: 'WEBP', 
            width: 20, 
            height: 25,
            margin: {
                top: 0, 
                left: 0 
            }
        },
        business: {
                    name: "RENTOSERV",
                    address: "New Delhi",
                    phone: "(+91)9818422503",
                    email: "raghavlakshay15@gmail.com",
                    website: "",
                },
                contact: {
                            label: "Invoice issued for:",
                            name: `${user.first_name}`,
                            address: `${user.address}`,
                            phone: `(+91)${user.phone}`,
                            email: `${user.email}`
                        },
        invoice: {
            label: "Invoice #: ",
            num: 1,
            invDate: `Payment Date: ${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            invGenDate: `Invoice Date: ${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            headerBorder: false,
            tableBodyBorder: false,
            header: [
                {
                    title: "#", 
                    style: { 
                      width: 10
                    } 
                  }, 
                  { 
                    title: "Model",
                    style: {
                      width: 30
                    } 
                  }, 
                  { 
                    title: "Terrain",
                    style: {
                      width: 30
                    } 
                  }, 
                  { title: "Price"},
                  { title: "Color"},
                  { title: "Seats"},
                  { title: "Type"}
            ],
            table: Array.from(Array(1), (item, index)=>([
                1,
                `${receiptdata.car_model}`,
                `${receiptdata.terrain}`,
                `${receiptdata.price}`,
                `${receiptdata.car_color}`,
                `${receiptdata.seats}`,
                `${receiptdata.type}`
            ])),
            additionalRows: [{
                col1: 'Total:',
                col2: `${receiptdata.price}`,
                col3: 'ALL',
                style: {
                    fontSize: 14 
                }
            },
            {
                col1: 'GST:',
                col2: '18',
                col3: '%',
                style: {
                    fontSize: 10 
                }
            },
            {
                col1: 'SubTotal:',
                col2: `${(0.18 * receiptdata.price)+receiptdata.price}`,
                col3: 'ALL',
                style: {
                    fontSize: 10
                }
            }],
            invDescLabel: "Invoice Note",
            invDesc: "Working in the Automobile industry to provide a better Experience . The quality is remembered long after the price is forgotten , Keeping in mind the role it personify in one's entity. A major role is played by us to provide Services to maintain the Quality.",
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };
    var service = {
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Invoice 2021",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: `${Constant.IMAGE_URL1}/logo3.png`,
            type: 'PNG', 
            width: 53.33, 
            height: 26.66,
            margin: {
                top: 0, 
                left: 0 
            }
        },
        stamp: {
            inAllPages: true, 
            src: ``,
            type: 'WEBP', 
            width: 20, 
            height: 25,
            margin: {
                top: 0, 
                left: 0 
            }
        },
        business: {
                    name: "RENTOSERV",
                    address: "New Delhi",
                    phone: "(+91)9818422503",
                    email: "raghavlakshay15@gmail.com",
                    website: "",
                },
                contact: {
                            label: "Invoice issued for:",
                            name: `${receiptd.name}`,
                            address: `${receiptd.address}`,
                            phone: `+${receiptd.phone}`,
                            email: `${receiptd.email}`
                        },
        invoice: {
            label: "Invoice #: ",
            num: 1,
            invDate: `Payment Date: ${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            invGenDate: `Invoice Date: ${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            headerBorder: false,
            tableBodyBorder: false,
            header: [
                {
                    title: "#", 
                    style: { 
                      width: 5
                    } 
                  }, 
                  { 
                    title: "Brand",
                    style: {
                      width: 20
                    } 
                  }, 
                  { 
                    title: "Model",
                    style: {
                      width: 50
                    } 
                  }, 
                  { title: "Packages",
                    style: {
                        width: 60
                    }
                  },
                  { title: "Booking Date",
                   style: {
                      width: 40
                    }
                  },
                  { title: "Price",
                    style: {
                       width: 10
                    }
                  }
            ],
            table: Array.from(Array(1),(item, index)=>([
                1,
                `${receiptd.Brand}`,
                `${receiptd.Model}`,
                `${receiptd.packages}`,
                `${receiptd.val}`,
                `${receiptd.price}`
            ])),
            additionalRows: [{
                col1: 'Total:',
                col2: `${receiptd.price}`,
                col3: 'ALL',
                style: {
                    fontSize: 14 
                }
            },
            {
                col1: 'GST:',
                col2: '18',
                col3: '%',
                style: {
                    fontSize: 10 
                }
            },
            {
                col1: 'SubTotal:',
                col2: `${(0.18 * receiptd.price)+receiptd.price}`,
                col3: 'ALL',
                style: {
                    fontSize: 10
                }
            }],
            invDescLabel: "Invoice Note",
            invDesc: "Working in the Automobile industry to provide a better Experience . The quality is remembered long after the price is forgotten , Keeping in mind the role it personify in one's entity. A major role is played by us to provide Services to maintain the Quality.",
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };
      async function receipt()
      {
        if(localStorage.getItem("servicelist"))
        {
            const x = await JSON.parse(localStorage.getItem("servicelist"))
            setreceipt({...receiptd,Brand:x.Brand,
            Model:x.Model,
            address:x.address,
            email:x.email,
            name:x.name,
            packages:x.packages,
            phone:x.phone,
            price:x.price,
            val:x.val});            
        }
        else if(localStorage.getItem("carlist"))
        {
            
            const store = getStorage();
            const y = {};
            if(store.googleId) {
                const b = await JSON.parse(localStorage.getItem("order_id"));
                const response = await getgoogleinvoice(b.order_id,getStorage().token);
                setuser(response.data[0]);
            }
            else if(store.type == "login"){                
                const a = await JSON.parse(localStorage.getItem("order_id"));
                const response = await getuserinvoice(a.order_id,getStorage().token);
                setuser(response.data[0]);
            }
            
            const x = await JSON.parse(localStorage.getItem("carlist"));
            const respo1 = await bookdata(x.carid,getStorage().token);
            setreceiptdata(respo1.data[0]);
        }
        else{
            alert("receipt could not be generated");
        }
        
        
      }
      function invoice()
    {
        
        if(localStorage.getItem("carlist"))
        {
            jsPDFInvoiceTemplate(rental);
            localStorage.removeItem("carlist");
        }
        else if(localStorage.getItem("servicelist"))
        {
            jsPDFInvoiceTemplate(service);
            // localStorage.removeItem("servicelist")
        }
    }
    console.log(receiptd)
    useEffect(() => {
        if(localStorage.getItem("login-info")){
            receipt();
        }
      },[])
    return(
        <>            
            <div className="wi10 headq1">
                <div className="wi9 mndiv1">
                    <div><img className="lo1" src={`${Constant.IMAGE_URL1}/logo3.png`}></img></div>
                    <div className="wi10 d-flex mt-4 jcc">
                        <div className="usrdv1"><p className="usrpara1">!!!!!   Your payment was successful   !!!!!</p></div>
                    </div>
                    <div className="wi10 d-flex">
                        <div className="wi4 algn1">
                            <h1 className="pamntfl1">Payment Success</h1>
                            <p className="paraq1">Your Payment was successful your vehicle will reach near you </p>
                            <p className="paraq1">on the mentioned date in the invoice please  </p>
                            <p className="paraq1">download it.</p>
                            <ProgressBar now={60} striped variant="success" className="wi9 bar1 mb-3"/>
                            <div className="divbarqef mb-3"><p className="bardsqef">Vehicle selection</p><p className="bardsqef mll me-5">Payment received</p><p className="bardsqef">Receipt received</p></div>
                            <button className="buttondsn2" onClick={invoice}>Invoice</button>
                            <button className="buttondsn11" onClick={()=>{navigate("/dashboard")}}>Back Home</button>
                        </div>
                        <div className="wi6">
                            <img src={`${Constant.IMAGE_URL1}/success.png`} className="failedimgg1"></img>
                        </div>
                    </div>
                </div>
            </div>                      
            
        </>
    )
}
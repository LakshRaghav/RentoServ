import { Header1 } from "./Header";
import Dropdown from 'react-bootstrap/Dropdown';
import TextField from '@mui/material/TextField';
import Button from "react-bootstrap/Button"
import { useNavigate, useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { ImCross } from "react-icons/im"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import { getStorage } from "../api/Storage";
import { user_data } from "../api/Api";
import Paymentbutton from "./PaymentButton";

export default function Services() {
    const {state} = useParams();
    const navigate = useNavigate();
    var initial_user = {
        first_name: "",
        email: "",
        address:"address",
    }
    var obj1 =
    {
        Brand: "Please Select Vehicle Brand",
        Model: "Please Select Vehicle Model",
        packages: "Please Select a Vehicle Package",
        val: ""
    }
    const date = new Date();
    const [mydata, setmydata] = useState(initial_user);    
    const[money,setmoney] = useState();    
    const servicedata = {};
    const [dat1, setdat1] = useState("");
    const [value, setValue] = useState(new Date('2022-06-24T21:11:54'));
    const [brand, setbrand] = useState(obj1);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleshow = () => setShow(true); 

    function Servicebook(){
        if(Object.values(brand).every(v=>v!="")&& money!=null)
        {
            handleshow()
        }
        else{
            console.log(brand)
            alert("********** Required* fields have not been filled *********")
        }
    }
    const handleChange = d => {
        setValue(d);
        const my = new Date(d)
        setbrand({ ...brand, val: `${my.getDate()} / ${my.getMonth()+1} / ${my.getFullYear()}  ${my.getHours()}:${my.getMinutes()}` })
        let days = 5;
        const my1 = new Date(d);
        my1.setDate(my.getDate() + 1)
        setdat1(`${my1.getDate()} / ${my1.getMonth()+1} / ${my1.getFullYear()}  ${my.getHours()}:${my.getMinutes()}`)
    }
    
    function select(event){
        setbrand({...brand,Brand:event.target.name});
    }
    function select1(event){
        setbrand({...brand,Model:event.target.name});
    }
    function select4(event){
        if(event.target.name=='Package 1 : Engine Oil Change | Washing')
        {             console.log("hello")
            setmoney(5000);
        }
        else if(event.target.name == "Package 2 : Engine Oil Change | Washing | Detailing")
        {
            setmoney(7500);
        }
        else if(event.target.name == "Package 3 : Complete Anual Servicing")
        {
            setmoney(10000);
        }
        setbrand({...brand,packages:event.target.name});
    }

    async function getmydata(){
        const x = getStorage();
        const y = {};
        if (x.googleId) {
            y.first_name = x.profileObj.givenName;
            y.email = x.profileObj.email;
            y.picture = x.profileObj.imageUrl;
            setmydata(y);
        }
        else if(x.type == "login"){
            const response = await user_data(getStorage());
            setmydata(response);
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
                <Header1 />
            </header>
            <section>
                <div className="wi10 dspl_flx jcc serv_box">
                    <div className="wi7 p-2 form_box">
                        <form>
                            <label className="brand">Brand </label>
                            <Dropdown className="dropdwn">
                                <Dropdown.Toggle className="dropdwn_title" variant="">
                                    {brand.Brand}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdwn_menu">
                                    <Dropdown.Item style={{ overflowY: "auto", height: "100px" }}>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Maruti Suzuki" onClick={select}>Maruti Suzuki</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Skoda" onClick={select}>Skoda</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Mahindra & Mahindra" onClick={select}>Mahindra & Mahindra</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Toyota" onClick={select}>Toyota</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Kia" onClick={select}>Kia</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Tata Motors" onClick={select}>Tata Motors</Dropdown.Item>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <label className="brand">Model</label>
                            <Dropdown className="dropdwn">
                                <Dropdown.Toggle className="dropdwn_title" variant="">
                                    {brand.Model}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdwn_menu">
                                    <Dropdown.Item style={{ overflowY: "auto", height: "100px" }}>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Model : suv | Variant : Petrol | Seats : 4,5,7" onClick={select1}>Model : suv | Variant : Petrol | Seats : 4,5,7</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Model : suv | Variant : Diesel | Seats : 4,5,7" onClick={select1}>Model : suv | Variant : Diesel | Seats : 4,5,7</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Model : Hatchback | Variant : Petrol | Seats : 4,5" onClick={select1}>Model : Hatchback | Variant : Petrol | Seats : 4,5</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Model : Hatchback | Variant : Diesel | Seats : 4,5" onClick={select1}>Model : Hatchback | Variant : Diesel | Seats : 4,5</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Model : Sedan | Variant : Petrol | Seats : 5" onClick={select1}>Model : Sedan | Variant : Petrol | Seats : 5</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Model : Sedan | Variant : Diesel | Seats : 5" onClick={select1}>Model : Sedan | Variant : Diesel | Seats : 5</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Model : Offroader | Variant : Petrol | Seats : 4,5,7" onClick={select1}>Model : Offroader | Variant : Petrol | Seats : 4,5,7</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Model : Offroader | Variant : Diesel | Seats : 4,5,7" onClick={select1}>Model : Offroader | Variant : Diesel | Seats : 4,5,7</Dropdown.Item>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <label className="brand">Package</label>
                            <Dropdown className="dropdwn">
                                <Dropdown.Toggle className="dropdwn_title" variant="">
                                    {brand.packages}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdwn_menu">
                                    <Dropdown.Item style={{ overflowY: "auto", height: "100px" }}>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Package 1 : Engine Oil Change | Washing" onClick={select4}>Package 1 : Engine Oil Change | Washing</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Package 2 : Engine Oil Change | Washing | Detailing" onClick={select4}>Package 2 : Engine Oil Change | Washing | Detailing</Dropdown.Item>
                                        <Dropdown.Item className="dropdwn_mtxt" name="Package 3 : Complete Anual Servicing" onClick={select4}>Package 3 : Complete Anual Servicing</Dropdown.Item>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <label className="brand">Package </label>
                            <div className="wi4 srvdate">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={0}>
                                        <DateTimePicker
                                            className='muibox'
                                            label="Select Book Date"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            minDate={date}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </div>
                            <Button className="srv_butto" onClick={() => {Servicebook()}}>Book Service</Button>
                        </form>
                    </div>
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    className="modl"
                >
                    <Modal.Header className="bbtm">
                        <ImCross className="crossbtnn" onClick={() => { handleClose() }} />
                        <Modal.Title className="modl_title">
                            <div className="modl_logo"></div>
                            <p className="modl_rcpt">Receipt</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="dspl_flx">
                            <div className="wi3">
                                <p className="Frm">From</p>
                                <p className="frm1">RentServ Pvt Ltd.</p>
                                <p className="frm1">Near India Gate</p>
                                <p className="frm1">RentServ@gmail.com</p>
                                <p className="frm1">New Delhi 110045</p>
                            </div>
                            <div className="wi4">
                                <p className="Frm">To</p>
                                <p className="frm1">{mydata.first_name}</p>
                                <p className="frm1">{mydata.address}</p>
                                <p className="frm1">{mydata.email}</p>
                                <p className="frm1">{state}</p>
                            </div>
                            <div className="wi3">
                                <p className="Frm">Drop Dated :</p>
                                <p className="fnttt"> {brand.val}</p>
                                <p className="Frm">Pickup Date :</p>
                                <p className="fnttt"> {dat1}</p>
                            </div>
                        </div>
                        <div className="dspl_flx mt-5">
                            <div className="wi7">
                                <h5>{brand.Model}</h5>
                                <p className="rcpt">Brand : {brand.Brand}</p>
                                <p className="rcpt">Model : {brand.Model}</p>
                                <p className="rcpt">Package : {brand.packages}</p>
                            </div>
                        </div>
                        <div className="dspl_flx jce">
                            <div className="wi3 tae">
                                <p className="gst m-0 p-1 me-2">Amount : ₹ {money}</p>
                                <p className="gst m-0 p-1 me-2">Gst price : ₹ {18 / 100 * (money)}</p>
                                <p className="gst m-0 p-1 me-2">Total price : ₹ {(0.18 * (money))+money}</p>
                            </div>
                        </div>
                        <div>
                            <p className="trms">Terms & Conditions Apply</p>
                            <p className="trms1">Payment will be valid if paid within 5 Hrs of Booking</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Paymentbutton price={(0.18 * (money))+money} dsn={"modalpaydsn"} servicedata={brand}/>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    )
}
import { useNavigate, useParams } from "react-router-dom";
import "./Rent.css";
import Button from "react-bootstrap/esm/Button";
import Header from "./Header";
import Modal from 'react-bootstrap/Modal';
import { useState ,useEffect} from "react";
import { ImCross } from "react-icons/im"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Constant } from "../api/Constant";
import { bookdata, user_data } from "../api/Api";
import { getStorage } from "../api/Storage";
import { Stack } from "react-bootstrap";
import Paymentbutton from "./PaymentButton";

export default function Rent(props) {
  const { state,rent } = useParams();
  const obj= {
    email:"",
    name:"",
    address:"Address",
    Drop: "",
    Pickup: "",
    Age: "",
    Adhaar: "",
    val1: "2023-01-23T21:11:54",
    val2: ""
  }

  const [formst, setformst] = useState(obj);
  const [cardata,setcardata] = useState([]);
  const [value, setValue] = useState(new Date(formst.val1));
  const [value1, setValue1] = useState(new Date(formst.val1));

  const [show, setShow] = useState(false);
  const handleClose =()=> setShow(false);
  const handleshow =()=> setShow(true);

  async function vis(){
    if(Object.values(formst).every(v=>v!="")){
      if(formst.Age>=18 && formst.Adhaar>99999999999)
      {
        handleshow();
      }
      else if(formst.Age<18)
      {
        alert("Please Enter a Valid Age  ....Above 18....")
      }
      else if(formst.Adhaar<100000000000)
      {
        alert("Please enter a valid 12-digit adhaar number")
      }
      
    }
    else{
      alert("Required* fields has not been filled");
    }
  }

  const onValueChange = (event) => {
    setformst({ ...formst, [event.target.name]: event.target.value })
  }  
  const handleChange = (d) => {
    setValue(d);
    var my = new Date(d);
    setformst({ ...formst, val1: `${my.getDate()} / ${my.getMonth()+1} / ${my.getFullYear()}` });
  }
  const handleChanger = (d1) => {
    setValue1(d1);
    var my = new Date(d1);
    setformst({ ...formst, val2: `${my.getDate()} / ${my.getMonth()+1} / ${my.getFullYear()}` });
  }
  async function getcardata() {
    const response = await bookdata(rent,getStorage().token);
    setcardata(response.data[0]);
    const x = getStorage();
        const y = {};
        if(x.googleId) {
            setformst({...formst,email:x.profileObj.email,name:x.profileObj.givenName})
        }
        else if(x.type == "login"){
            const response = await user_data(getStorage());
            setformst({...formst,email:response.email,name:response.first_name,address:response.address})
        }
  }
useEffect(() => {
    if (localStorage.getItem("login-info")) {
      getcardata();
    }
  },[])
  return (
    <>
      <header>
        <Header />
      </header>
      <section className="dspl_flx jcc">
        <div className="rent_back wi10 dspl_flx">
          <div className="wi5 dspl_flx jcc">
            <div className="wi8 rent_form1 dspl_flx jcc">
              <div className="wi9 p-2">
                <h3>Book a Car Rental</h3>
                <div className="dspl_flx jcc mt-5">
                  <div className="wi4">
                    <Box
                      component="form"
                      sx={{ '& > :not(style)': { width: '22ch' } }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField id="outlined-basic" label="Vehicle Drop Location" variant="outlined" name="Drop" onChange={onValueChange} />
                    </Box>
                  </div>
                  <div className="wi1"></div>
                  <div className="wi4">
                    <Box
                      component="form"
                      sx={{ '& > :not(style)': { width: '22ch' } }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField id="outlined-basic" label="Vehicle Pickup Location" variant="outlined" name="Pickup" onChange={onValueChange}/>
                    </Box>
                  </div>
                </div>
                <div className="dspl_flx jcc mt-5">
                  <div className="wi4">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DateTimePicker
                          className='muibox'
                          label="Drop Date and Time"
                          value={value}
                          onChange={handleChange}
                          renderInput={(params) => <TextField {...params} />}
                          disablePast
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                  <div className="wi1"></div>
                  <div className="wi4">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DateTimePicker
                          className='muibox'
                          label="Pickup Date and Time"
                          value={value1}
                          onChange={handleChanger}
                          renderInput={(params) => <TextField {...params} />}
                          disablePast
                        />
                      </Stack>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="dspl_flx jcc mt-5">
                  <div className="wi4">
                    <Box
                      component="form"
                      sx={{ '& > :not(style)': { width: '22ch' } }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField id="outlined-basic" label="Your Age at time of pickup" variant="outlined" name="Age" onChange={onValueChange}/>
                    </Box>
                  </div>
                  <div className="wi1"></div>
                  <div className="wi4">
                    <Box
                      component="form"
                      sx={{ '& > :not(style)': { width: '22ch' } }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField id="outlined-basic" label="Adhaar-Card Number" variant="outlined" name="Adhaar" onChange={onValueChange}/>
                    </Box>
                  </div>
                </div>
                <Button className="rent_btn" onClick={() => vis()}>Book Rental Now</Button>
              </div>
            </div>
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
              <p className="modl_rcpt">Summary</p>
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
                <p className="frm1">{formst.name}</p>
                <p className="frm1">{formst.Drop}</p>
                <p className="frm1">{formst.email}</p>
                <p className="frm1">{state}</p>
              </div>
              <div className="wi3 tae">
                <p className="Frm">Drop Dated :</p>
                <p className="date_fnt"> {formst.val1}</p>
                <p className="Frm">Pickup Date :</p>
                <p className="date_fnt"> {formst.val2}</p>
              </div>
            </div>
            <div className="dspl_flx mt-5">
              <div className="wi3">
                <img src={`${Constant.IMAGE_URL}/${cardata.image}`} className="imgag" />
              </div>
              <div className="wi7 crtxt">
                <h5>{cardata.car_model_year}</h5>
                <p className="rcpt">Seats: {cardata.seats}</p>
                <p className="rcpt">Driven: {cardata.driven} Kms</p>
              </div>
            </div>
            <div className="dspl_flx jce">
              <div className="wi3 tae">
                <p className="gst m-0 p-1 me-2">Amount : ₹ {cardata.price}</p>
                <p className="gst m-0 p-1 me-2">Gst price : ₹ {(18 / 100) * cardata.price}</p>
                <p className="gst m-0 p-1 me-2">Total price : ₹ {(0.18 * cardata.price)+cardata.price}</p>
              </div>
            </div>
            <div>
              <p className="trms">Terms & Conditions Apply</p>
              <p className="trms1">Payment will be valid if paid within 5 Hrs of Booking</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Paymentbutton productid={cardata._id} price={(0.18 * cardata.price)+cardata.price} dsn={"modalpaydsn"} rentdata = {formst}/>
          </Modal.Footer>
        </Modal>
      </section>
      <footer>
      </footer>
    </>
  )
}









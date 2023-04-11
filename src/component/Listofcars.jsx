import Header from "./Header";
import "./Carlist.css";
import { AiFillStar } from "react-icons/ai";
import { ImLocation, ImLocation2 } from "react-icons/im";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { offercardata, receive_cardata} from "../api/Api";
import {CiDiscount1} from "react-icons/ci";
import { getStorage } from "../api/Storage";
import { Constant } from "../api/Constant";

export default function Listofcars(props) {
    const {state} = useParams();
    const navigate = useNavigate();
    const [cardata,setcardata] = useState([]);
    const [offer_data,setoffer_data] = useState([]);
    const booking = (mydata) => {
        navigate(`${mydata._id}`);
    }
    async function getAllCarData(){
        const response = await receive_cardata(state,getStorage().token);
        setcardata(response.data);
        const respo = await offercardata(state,getStorage().token);
        setoffer_data(respo.data);        
    }
    useEffect(()=>{
        if(localStorage.getItem("login-info"))
        {
            getAllCarData()
        }
    },[])
    return ( 
        <>
            <header>
                <Header />
            </header>
            <section>
                <div className="wi10 dspl_flx">
                    <div className="wi25 p-2 jcc lftdv"> 
                        <p className="offer">Our Highest Rated Cars</p>                
                        {offer_data.map((y) =>
                        <>
                            <div className="wi95 mb-3 mt-2 crddd">
                                <CiDiscount1 className="p-0 m-0 offericon" />
                                <div className="wi10 bg-primary br">
                                    <img src={`${Constant.IMAGE_URL}/${y.image}`} className="img" />
                                </div>
                                <div className="wi10 p-2">
                                    <h5>Our Best Rated Vehicle.</h5>
                                    <p className="p-0 m-0 bst">{y.brand} {y.car_model}</p>
                                    <p className="car_type1">{y.type} . {y.variant} . {y.seats} Seats</p>
                                    <p className="car_ratings1"><AiFillStar /> {y.rating} . {y.driven} Kms Driven.</p>
                                    <p className="pricee">₹ {y.price}</p>
                                    <Button className="bookbtnn" onClick={() => { booking(y) }}>Book Now</Button>
                                </div>
                            </div>
                        </>
                        )}
                    </div>
                    <div className="wi75">
                        <div className="wi10">
                            <p className="ctyy">There are {cardata.length} Vehicles available in {state}.</p>
                        </div>
                        {cardata.map((x) => 
                        <>
                            <div className="wi10 dspl_flx mb-2 psnrlt" onClick={() => { booking(x) }}>
                                <div className="wi25 p-0 m-0">
                                    <img src={`${Constant.IMAGE_URL}/${x.image}`} className="imggg"></img>
                                </div>
                                <div className="wi75">
                                    <p className="car_model">{x.brand} {x.car_model}</p>
                                    <p className="car_type">{x.type} . {x.variant} . {x.seats} Seats</p>
                                    <p className="car_ratings"><AiFillStar /> {x.rating} . {x.driven} Kms Driven.</p>
                                    {x.availability == true ?
                                        <p className="car_avlblty"><ImLocation2 />This Vehicle is Available.</p> :
                                        <p className="car_avlblty"><ImLocation />This Vehicle is Not Available</p>
                                    }
                                    <p className="price">₹ {x.price}</p>
                                    <Button className="bookbtn" onClick={() => { booking(x) }}>Book Now</Button>
                                </div>
                            </div>
                        </> 
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
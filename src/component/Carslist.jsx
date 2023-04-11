import Header from "./Header";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import "./Carlist.css"
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import { useNavigate, useParams } from "react-router-dom";
import { receive_cardata } from "../api/Api";
import { getStorage } from "../api/Storage";

export default function Carlist() {
    var object = {
        City: "Please Select State"
    }
    const navigate = useNavigate();
    const [mystate, setmystate] = useState(object);
    const { data, context } = useContext(GlobalContext)
    
    const findcars = () => {
        if(mystate.City == "Please Select State")
        {
            alert("************** Please select state to cind cars in ************")
        }
        else{
            navigate(`${mystate.City}`)
        }
    }
    const select = (event) => {
        var object1 = {
            City: event.target.name
        }
        setmystate(object1);
    }
    return (
        <>
            <header>
                <Header />
            </header>
            <section>
                <div className="crlst_back dspl_flx jcc">
                    <div className="wi9 dspl_flx jcc">
                        <div className="wi4 p-5 dspl_flx jcc carlst_form">
                            <Dropdown className="carfldrp">
                                <Dropdown.Toggle variant="" className="carhddrp">
                                    {mystate.City}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="cardrpdwn">
                                    <Dropdown.Item style={{ overflowY: "auto", height: "100px" }}>
                                        <Dropdown.Item className="drpdwn_txt" name="New Delhi" defaultValue={"New Delhi"} onClick={select}>New Delhi</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Uttar Pradesh" onClick={select}>Uttar Pradesh</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Haryana" onClick={select}>Haryana</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Himachal Pradesh" onClick={select}>Himachal Pradesh</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Rajasthan" onClick={select}>Rajasthan</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Maharastra" onClick={select}>Maharastra</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="West Bengal" onClick={select}>West Bengal</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Tamil Nadu" onClick={select}>Tamil Nadu</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Punjab" onClick={select}>Punjab</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Uttarakhand" onClick={select}>Uttarakhand</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Odisha" onClick={select}>Odisha</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Sikkim" onClick={select}>Sikkim</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Madhya Pradesh" onClick={select}>Madhya Pradesh</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Kerala" onClick={select}>Kerala</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Karnataka" onClick={select}>Karnataka</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Goa" onClick={select}>Goa</Dropdown.Item>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button className="fndcar" onClick={findcars}>Find Cars</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
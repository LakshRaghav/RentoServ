import { Header1 } from "./Header";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import { useContext, useState } from "react";
import { GlobalContext } from "../context/Globalcontext";
import { useNavigate } from "react-router-dom";
import "./Servicelist.css"

export default function Servicelist() {
    var object = {
        City: "Please Select State"
    }
    const navigate = useNavigate();
    const [mystate, setmystate] = useState(object);
    const { data, context } = useContext(GlobalContext);
    function formsubmitted() {
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
                <Header1 />
            </header>
            <section>
                <div className="crlst_backk dspl_flx jcc">
                    <div className="wi9 dspl_flx jcc">
                        <div className="wi4 p-5 dspl_flx jcc carlst_form">
                            <Dropdown className="carfldrp">
                                <Dropdown.Toggle variant="" className="carhddrp">
                                    {mystate.City}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="cardrpdwn">
                                    <Dropdown.Item style={{ overflowY: "auto", height: "100px" }}>
                                        <Dropdown.Item className="drpdwn_txt" name="New Delhi" defaultValue={"New Delhi"} onClick={(event) => { select(event) }}>New Delhi</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Uttar Pradesh" onClick={(event) => { select(event) }}>Uttar Pradesh</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Haryana" onClick={(event) => { select(event) }}>Haryana</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Himachal Pradesh" onClick={(event) => { select(event) }}>Himachal Pradesh</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Rajasthan" onClick={(event) => { select(event) }}>Rajasthan</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Maharastra" onClick={(event) => { select(event) }}>Maharastra</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="West Bengal" onClick={(event) => { select(event) }}>West Bengal</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Tamil Nadu" onClick={(event) => { select(event) }}>Tamil Nadu</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Punjab" onClick={(event) => { select(event) }}>Punjab</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Uttarakhand" onClick={(event) => { select(event) }}>Uttarakhand</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Odisha" onClick={(event) => { select(event) }}>Odisha</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Sikkim" onClick={(event) => { select(event) }}>Sikkim</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Madhya Pradesh" onClick={(event) => { select(event) }}>Madhya Pradesh</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Kerala" onClick={(event) => { select(event) }}>Kerala</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Karnataka" onClick={(event) => { select(event) }}>Karnataka</Dropdown.Item>
                                        <Dropdown.Item className="drpdwn_txt" name="Goa" onClick={(event) => { select(event) }}>Goa</Dropdown.Item>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button className="fndcarr" onClick={() => { formsubmitted() }}>Book Service</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
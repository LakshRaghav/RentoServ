import React, { useState, useEffect, useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import "../auth/Auth.css";
import { google_auth_Data } from "../api/Api";
import { clearStorage, setStorage } from "../api/Storage";
import { GlobalContext } from "../context/Globalcontext";

function Google_Auth_Login() {
    const navigate = useNavigate();
    const { data, context } = useContext(GlobalContext);
    const clientId = "711210262927-gi31rmt3ltrj06u2msvhj0lid3p3n9fu.apps.googleusercontent.com";
    const onSuccess = async (res) => {           
        const obj = {};
        obj.token = res.tokenId;
        const response = await google_auth_Data(obj);
        if(response.status == "success"){
            const result = {...res};
            result.token = response.token;
            result.type = "google-login";
            setStorage(result);
            context.login(result);
            navigate("/dashboard");
        }
    };
    const onFailure = (err) => {
        console.log("failed", err);
    };      
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "https://www.googleapis.com/auth/bigquery"
            });
        };
        gapi.load("client:auth2", initClient);
    },[]);
    return (
        <form className=" mt-2 tac">
            <button>
                <GoogleLogin
                clientId={clientId}     
                buttonText="Connect Using Google Accounts"
                onFailure={onFailure}
                onSuccess={onSuccess}
                cookiePolicy={"single_host_origin"}
                isSignedIn={false}
                />
            </button>
        </form>
    );
}
export default Google_Auth_Login;
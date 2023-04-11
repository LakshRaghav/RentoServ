import { Constant } from "./Constant";
import { getStorage } from "./Storage";
export const login_Data = async (data) => {
    const response = await fetch(`${Constant.API_URL}/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
export const signup_Data = async (data) => {
    const response = await fetch(`${Constant.API_URL}/signup`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
export const google_auth_Data = async (data) => {
    const response = await fetch(`${Constant.API_URL}/google_login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
export const user_data = async (data) => {
    const response = await fetch(`${Constant.API_URL1}/getdetail`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${data.token}` }
    });
    return response.json();
}
export const contacting = async (data, token) => {
    const response = await fetch(`${Constant.API_URL1}/getmailresponse`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
export const receive_cardata = async (data,token) => {
    const response = await fetch(`${Constant.API_URL2}/cardetail?state=${data}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });
    return response.json();
}
export const offercardata = async (data,token) => {
    const response = await fetch(`${Constant.API_URL2}/offercardetail?state=${data}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });
    return response.json();
}
export const bookdata = async (data,token) => {
    const response = await fetch(`${Constant.API_URL2}/mycardata?cars=${data}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });
    return response.json();
}
export const createOrder_id = async (data,token) => {
    const response = await fetch(`${Constant.API_URL3}/create/orderId`, {
        method: "POST",
        timeout: 0,
        headers: { "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: data})
    });
    return response.json();
} 
export const verifyPaymentStatus = async (data,token) => {
    const response = await fetch(`${Constant.API_URL3}/api/payment/verify`, {
        method: "POST",
        timeout: 0,
        headers: { "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}
export const setorderid = async (data,token) => {
    const response = await fetch(`${Constant.API_URL1}/userdata`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` ,
        'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();    
}
export const setgoogleorderid = async (data,token) => {
    const response = await fetch(`${Constant.API_URL1}/googleuserdata`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` ,
        'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();    
}
export const setorderdescription = async (data,token) => {
    const response = await fetch(`${Constant.API_URL1}/orderdescription`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();    
}
export const getuserinvoice = async (data,token) => {
    const response = await fetch(`${Constant.API_URL1}/invoiceuser?order_id=${data}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`},
    });
    return response.json();    
}
export const getgoogleinvoice = async (data,token) => {
    const response = await fetch(`${Constant.API_URL1}/invoiceuser?order_id=${data}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}`},
    });
    return response.json();    
}
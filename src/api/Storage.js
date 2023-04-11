export function setStorage(data){
    console.log(data);
    localStorage.setItem("login-info",JSON.stringify(data));
}
export function getStorage(){
    return JSON.parse(localStorage.getItem("login-info"))
}
export function clearStorage(){
    const obj = {};
    localStorage.clear("login-info")
    obj.type = "logout"
    return obj
}
export function getToken(){
    if(localStorage.getItem("login-info")){
    return JSON.parse(localStorage.getItem("login-info")).token
    }
    else{
        return false;
    }
}
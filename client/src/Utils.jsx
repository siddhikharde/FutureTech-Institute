import {jwtDecode} from "jwt-decode";
const setPageTitle=({title})=>{
    document.title=`Future Tech-${title}`

}

const isTokenExpired=(token)=>{
    if(!token) return true;
    try{
        const decode=jwtDecode(token);
        const currentTime=Date.now()/1000;
        return decode.exp <currentTime;

    }catch(e){
        return true;
    }
}
export {setPageTitle, isTokenExpired}
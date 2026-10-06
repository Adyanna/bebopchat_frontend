import { redirect } from "react-router";

export const ProtectedRoute=()=>{
    const token = localStorage.getItem('token')||sessionStorage.getItem('token');
    if(!token){
        throw redirect('/login');
    }
    return null;
}
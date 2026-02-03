import { useRef } from "react"
import { Button } from "../components /Button"
import { InputComponent } from "../components /input"
import axios from "axios"
import { backendUrl } from "../config"
import { useNavigate } from "react-router-dom"
import Dashboard from "./Dashboard"



export const SignIn=()=>{
    const usernameRef = useRef<any>("");
    const passwordRef = useRef<any>("");
    const navigate = useNavigate();
    async function signin(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;
        
        const response = await axios.post(`${backendUrl}${"/api/v1/signin"}`,{
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt)
        console.log(jwt);
        navigate("/dashboard")
        // redirect the user to the dashboard 
}
    return(<div className="h-screen w-screen bg-gray-20 flex justify-center items-center">
            <div className="bg-white rounded border min-w-48">
                <div className="text-blue-700 text-2xl flex justify-center p-4 ">Sign In</div>
                <InputComponent reference={usernameRef} placeholder="Username" />
                <InputComponent reference={passwordRef} placeholder="Password" />
                <div className="flex justify-center">
                    <Button variant="primary" size="md" text="Signin" onClick={signin}/>
                </div>
            </div>
    
        </div>)
}
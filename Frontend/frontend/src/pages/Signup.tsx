import { useRef } from "react"
import { Button } from "../components /Button"
import { InputComponent } from "../components /input"
import axios from "axios"
import { backendUrl } from "../config"
import { useNavigate } from "react-router-dom"

export const Signup=()=>{
    const usernameRef = useRef<any>("");
    const passwordRef = useRef<any>("");
    const navigate = useNavigate();

    async function signup(){
        const username=usernameRef.current?.value;
        const password=passwordRef.current?.value;
        await axios.post(`${backendUrl}${"/api/v1/signup"}`,{
            username,
            password
        })
        navigate("/signin")
        console.log("You have signed up");
    }
    return(<div className="h-screen w-screen bg-gray-20 flex justify-center items-center">
        <div className="bg-white rounded border min-w-48">
            <div className="text-blue-700 text-2xl flex justify-center p-4 ">Sign Up</div>
            <InputComponent reference={usernameRef} placeholder="Username" />
            <InputComponent reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center">
                <Button variant="primary" loading={false} size="md" text="Signup" onClick={signup}/>
            </div>
        </div>

    </div>)
}
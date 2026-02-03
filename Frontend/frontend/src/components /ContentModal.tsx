
import { CloseIcon } from "../icons/CloseIcon"
import { InputComponent } from "./input"
import { Button } from "./Button"


interface ModalProps{
    open:boolean,
    onClose:()=>void
}
//controlled component
export const ContentModal=(porps:ModalProps)=>{
  
    return(<div>
        {porps.open && <div className="w-screen h-screen bg-gray-500 fixed top-0 left-0 opacity-60 flex justify-center">
            <div className="flex flex-col justify-center"><span className="bg-white p-5 opacity-100 rounded-lg">
                <div className="flex justify-end">
                    <CloseIcon size="md" onClick={porps.onClose}/>
                </div>
                <div className="flex justify-center">
                    CREATE CONTENT
                </div>
                <div>
                    <InputComponent  placeholder={"titles"}/>
                </div>
                <div>
                    <InputComponent  placeholder={"link"}/>
                </div>
                <div className="flex justify-center">
                    <Button variant="primary" text="Submit" size="lg" onClick={()=>{console.log()}}/>
                </div>
                </span></div>
    </div> }
    </div>)
}
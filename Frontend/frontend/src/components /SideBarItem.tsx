import type { ReactElement } from "react";

interface SideBarItemProps{
    text:string,
    icon:ReactElement
}

export const SideBarItem=(props:SideBarItemProps)=>{
    return(<div className="flex  items-center m-4 hover:bg-slate-300 rounded-lg py-2 px-3">
        {props.icon}
        <div className="ml-3">{props.text}</div>
        
        
    </div>)
}
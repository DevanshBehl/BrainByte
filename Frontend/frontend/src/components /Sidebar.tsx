import { Brain } from "../icons/Brain"
import { ShareIcon } from "../icons/ShareIcon"
import { SideBarItem } from "./SideBarItem"

export const Sidebar=()=>{
    return(<div className="h-screen w-72 bg-white border-r border-slate-400 fixed left-0 top-0">
        
    <div className="text-blue-700 text-2xl m-5 flex items-center">
        <div className="color-blue-700 hover:bg-slate-300 p-3 rounded-lg"><Brain size="lg"/></div>
        <div className="pl-1">BrainByte</div></div>
    <SideBarItem text="Twitter" icon={<ShareIcon size="md"/>}/>
    <SideBarItem text="Youtube" icon={<ShareIcon size="md"/>}/>
    </div>)
}
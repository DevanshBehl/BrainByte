import { useState } from "react";
import { Button } from "../components /Button";
import { Card } from "../components /Card";
import { ContentModal } from "../components /ContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components /Sidebar";

function Dashboard(){
  const [modalOpen,setModalOpen]=useState(false);
  return (<div >
    <div>
      <Sidebar/>
    </div>
    <div className="ml-72 h-screen bg-slate-100">
    <ContentModal open={modalOpen} onClose={()=>{setModalOpen(false)}}/>
  <div className="flex justify-end">
    <Button variant="primary" size="md" text="Add content" onClick={()=>{setModalOpen(true)}} startIcon={<PlusIcon size="md"/>}/>
    <Button variant="secondary" size="md" onClick={()=>{console.log()}} text="Share Brain" startIcon={<ShareIcon size="md"/>}/>
  </div>
    
    <Card title="Youtube" type="youtube" link="https://www.youtube.com/watch?v=kIEh73-8Bm4"/>
    </div>
    </div>
  )
}
export default Dashboard;



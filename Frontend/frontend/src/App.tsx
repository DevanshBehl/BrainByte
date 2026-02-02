import { useState } from "react";
import { Button } from "./components /Button";
import { Card } from "./components /Card";
import { ContentModal } from "./components /ContentModal";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App(){
  const [modalOpen,setModalOpen]=useState(false);
  return (<div >
    <ContentModal open={modalOpen} onClose={()=>{setModalOpen(false)}}/>
  <div className="flex justify-end">
    <Button variant="primary" size="md" text="Add content" onClick={()=>{setModalOpen(true)}} startIcon={<PlusIcon size="md"/>}/>
    <Button variant="secondary" size="md" onClick={()=>{console.log()}} text="Share Brain" startIcon={<ShareIcon size="md"/>}/>
  </div>
    
    <Card title="Youtube" type="youtube" link="https://www.youtube.com/watch?v=kIEh73-8Bm4"/>
    </div>
  )
}
export default App;

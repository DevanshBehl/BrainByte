import { Button } from "./components /Button";
import { PlusIcon } from "./icons/PlusIcon";

function App(){
  return (<>
    <Button variant="primary" size="lg" onClick={()=>{
      console.log("working");
    }} text="SignUp" startIcon={<PlusIcon size={"lg"}/>}/>
    <Button variant="secondary" size="md" onClick={()=>{
      console.log("wokring");
    }} text="SignUp" startIcon={<PlusIcon size={"lg"}/>}/>
    <Button variant="primary" size="md" onClick={()=>{
      console.log("wokring");
    }} text="SignUp" startIcon={<PlusIcon size={"sm"}/>}/>
    </>
  )
}
export default App;

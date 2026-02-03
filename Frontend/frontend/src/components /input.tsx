interface InputProps{
    placeholder:string,
    reference?:any
}

export const InputComponent = (props:InputProps)=>{
    return(<div>
    <input placeholder={props.placeholder} ref={props.reference} className="bg-slate-200 rounded-lg border-1 border-slate-700 p-2 m-3"></input></div>)
}
interface InputProps{
    placeholder:string,
    onChange:()=>void
}

export const InputComponent = (props:InputProps)=>{
    return(<input placeholder={props.placeholder} className="bg-slate-200 rounded-lg border-1 border-slate-700 p-2 m-3"></input>)
}
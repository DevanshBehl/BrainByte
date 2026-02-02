
interface ButtonProps{
    size:"lg" | "sm" |"md";
    variant:"primary"|"secondary";
    text:string ;
    startIcon?:any;
    endIcon?:any;
    onClick:()=>void;
}
const variantStyles ={
    "primary":"bg-blue-600 text-white ",
    "secondary":"bg-blue-200 text-blue-700"
}
const sizeStyles={
    "lg":" m-3 py-3 px-6 rounded-xl",
    "md":" py-2 px-6 m-3 rounded-xl",
    "sm":" py-2 px-4 m-3 rounded-xl"
}
const defaultStyle="flex items-center justify-center cursor-pointer"
export const Button=(props : ButtonProps)=>{
    return(<button onClick={props.onClick}  className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyle}`}> {props.startIcon}<div className="pr-2 pl-2">{props.text}</div>{props.endIcon} </button>)
};

// 47:29
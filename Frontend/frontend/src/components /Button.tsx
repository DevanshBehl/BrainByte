
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
    "lg":" m-4 py-2 px-8 rounded-xl",
    "md":" py-2 px-6 m-4 rounded-xl",
    "sm":" py-2 px-4 m-4 rounded-xl"
}
const defaultStyle="flex items-center cursor-pointer"
export const Button=(props : ButtonProps)=>{
    return(<button  className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyle}`}> {props.startIcon}<div className="pr-2 pl-2">{props.text}</div>{props.endIcon} </button>)
};


// 45:12 

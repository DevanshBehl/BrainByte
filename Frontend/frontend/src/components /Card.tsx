import { PlusIcon } from "../icons/PlusIcon"
interface CardProps{
    title:string,
    link:string,
    type:"youtube"|"twitter"
}

export const Card=(props:CardProps)=>{
    return<div className=" m-8 p-4 bg-white rounded-md shadow-sm max-w-80   border-1 border-slate-200">
        <div className="flex justify-between">
            <div className="flex items-center text-md"><PlusIcon size="lg"/> {props.title}</div>
            <div className="flex items-center">
                <a href={props.link} target="_blank">
                <div className="pr-2 text-slate-600 "><PlusIcon size="lg"/></div>
                </a>
                <div className="text-slate-600"><PlusIcon size="lg"/></div>
            </div>

        </div>
        <div>
            {props.type==="youtube" && <iframe className="w-full p-4" src={props.link.replace("watch","embed").replace("?v=","/")} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
            
            {props.type==="twitter" && <blockquote className="twitter-tweet">
  <a href={props.link.replace("x.com","twitter.com")}></a> 
</blockquote> }
            
        </div>
    </div>
}
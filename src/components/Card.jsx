import { useState } from "react";

function Card(props){
    const [title, setTitle] = useState(props.title);

    return (
        <div class="m-2 w-full md:w-1/2 xl:w-1/3 p-6 w-[19.875rem] rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
            <div class="flex items-center p-4 pb-0">
            <div class="ml-4 flex-auto">
            <div class="text-lg flex justify-center">
            <h3>{props.title}</h3>
            </div>
            </div>
            </div>
            <div class="flex gap-3 p-4 flex justify-center">
            <div class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Edit Card</div>
            <div class="pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">Delete Card</div></div>
        </div>
    );
}

export default Card;
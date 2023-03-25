import React, {useState} from "react";
import Bucket from "./Bucket";
import { PlusCircleIcon } from '@heroicons/react/24/solid'

function Home(){
    const [bucket, setBucket]= useState([]);
    const [showForm, setShowForm]= useState(false);

    function addBucket(name){
        setShowForm(false);
        const newBucket = <Bucket name={name} />;
        setBucket([...bucket, newBucket]);
    }
    return (
        <>
            <PlusCircleIcon className="h-12 w-12 text-black-500" onClick={()=>{
                setShowForm(true);
            }}/>

            {
                showForm? 

                    <form onSubmit={(event)=>{
                        event.preventDefault();
                        addBucket(event.target.name.value);
                        event.target.reset();
                    }}>
                        
                    <input
                        type="text"
                        name="name"
                        className="block w-30 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Enter bucket Name"
                        required
                    />

                    <button type="submit">Add to Bucket</button>
                    </form>

                : null
            }
            {loadBuckets(bucket)}
        </>    
    )
}

function loadBuckets(bucket){
    return bucket.map((singleBucket)=>{
        return(
            <div class="w-[19.875rem] rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
                <div class="flex items-center p-4 pb-0">
                <div class="ml-4 flex-auto">
                <div class="font-medium">{singleBucket}
                </div>
                </div>
                </div>
                <div class="flex gap-3 p-4">
                <div class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Show Bucket</div>
                <div class="pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">Delete Bucket</div></div>

            </div>
        )
    })
}




export default Home;
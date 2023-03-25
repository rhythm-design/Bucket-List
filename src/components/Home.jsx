import React, {useState} from "react";
import Bucket from "./Bucket";
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BucketPage from "./BucketPage";


function Home(){
    const [bucket, setbucket]= useState([]);
    const [showForm, setShowForm]= useState(false);
    const [plusBtn,setPlusBtn]=useState(true);
    const [bucketCount,setBucketCount]= useState(0);

    function addBucket(name){
        setShowForm(false);
        const newBucket = { id: bucketCount, name, cards: [] };
        setBucketCount((bucketCount)=>{
            return bucketCount+1;
        })
        setbucket([...bucket, newBucket]);
    }
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <Routes>
                <Route path="/" element={
                <div>
                    <div id="add-bucket-area" class="flex justify-center">
                        {
                            plusBtn?
                                <>
                                    <span class="pt-2 text-xl font-bold">Want to add a new Category, click here--</span>
                                    <PlusCircleIcon className="block h-12 w-12 mb-4 text-indigo-600" onClick={()=>{
                                        setShowForm(true);
                                        setPlusBtn(false);
                                    }}/>
                                </>
                            :null
                        }
                        {
                            showForm ?
                                <form onSubmit={(event)=>{
                                    event.preventDefault();
                                    addBucket(event.target.name.value);
                                    event.target.reset();
                                    setPlusBtn(true);
                                }}>
                                <input
                                    type="text"
                                    name="name"
                                    className="inline-block w-30 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Enter bucket Name"
                                    required
                                />
                                <button type="submit" class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 border rounded">Add to Bucket</button>
                                </form>
                            : null
                        }
                    </div>
                    <div class="flex flex-wrap justify-center">
                    { loadBuckets(bucket) }
                    </div>
                </div>
                } />
                <Route path="/bucket/:id" element={<BucketPage buckets={bucket} setBuckets={setbucket} />} />
        </Routes>
    </Router> 
    )
}

function loadBuckets(bucket){
    return bucket.map((singleBucket)=>{
        return(
            <div class="m-2 w-full md:w-1/2 xl:w-1/3 p-6 w-[19.875rem] rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
                <div class="flex items-center p-4 pb-0">
                <div class="ml-4 flex-auto">
                <div class="text-lg flex justify-center">
                <Bucket key={singleBucket.id} id={singleBucket.id} name={singleBucket.name} />
                </div>
                </div>
                </div>
                <div class="flex gap-3 p-4 flex justify-center">
                <div class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"><Link to={`/bucket/${singleBucket.id}`}>Show Bucket</Link></div>
                <div class="pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">Delete Bucket</div></div>

            </div>
        )
    })
}

export default Home;
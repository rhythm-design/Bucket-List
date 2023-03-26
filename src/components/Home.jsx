import React, {useState, useEffect} from "react";
import Bucket from "./Bucket";
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BucketPage from "./BucketPage";


function Home(){
    const [bucket, setbucket]= useState(JSON.parse(localStorage.getItem('bucket')) || []);
    const [showForm, setShowForm]= useState(false);
    const [plusBtn,setPlusBtn]=useState(true);
    const [bucketCount,setBucketCount]= useState(0);

    useEffect(() => {
        localStorage.setItem('bucket', JSON.stringify(bucket));
    }, [bucket]);


    function addBucket(name){
        setShowForm(false);
        const newBucket = { id: bucketCount, name, cards: [] };
        setBucketCount((bucketCount)=>{
            return bucketCount+1;
        })
        setbucket([...bucket, newBucket]);
    }

    function loadBuckets(bucket){
        return bucket.map((singleBucket)=>{
            return(
                <Bucket key={singleBucket.id} id={singleBucket.id} name={singleBucket.name} buckets={bucket} setBuckets={setbucket} />
            )
        })
    }
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <Routes>
                <Route path="/" element={
                <div>
                    <h1 class="text-5xl pb-7 font-bold flex justify-center">Create Bucket List By Category</h1>
                    <div id="add-bucket-area" class="flex justify-center">
                        {
                            plusBtn?
                                <>
                                    <span class="pt-2 text-xl font-bold">Want to add a new Category, click here--</span>
                                    <button><PlusCircleIcon className="block h-12 w-12 mb-4 text-indigo-600" onClick={()=>{
                                        setShowForm(true);
                                        setPlusBtn(false);
                                    }}/></button>
                                </>
                            :null
                        }
                        {
                            showForm ?
                                <form onSubmit={(event)=>{
                                    event.preventDefault();
                                    addBucket(event.target.name.value);
                                    //handleAddBucket();
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


export default Home;
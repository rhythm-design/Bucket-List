import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

function BucketPage({ buckets, setBuckets }) {
  const { id } = useParams();
  const bucket = buckets.find(bucket => bucket.id === parseInt(id));
  const [cards, setCards] = useState(bucket.cards);

  useEffect(() => {
    const storedCards = localStorage.getItem(`bucket-${id}-cards`);
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, [id]);

  useEffect(() => {
    const newBuckets = [...buckets];
    const index = newBuckets.findIndex((bucket) => bucket.id === parseInt(id));
    if (index !== -1) {
      newBuckets[index].cards = cards;
      setBuckets(newBuckets);
      localStorage.setItem(`bucket-${id}-cards`, JSON.stringify(cards));
    }
  }, [cards, buckets, id, setBuckets]);

  
  function addCard(title) {
    const newCard = { id: cards.length + 1, title};
    setCards([...cards, newCard]);
  }

  return (
    <div>
      <h1 class="text-5xl pb-7 font-bold flex justify-center">{bucket.name}</h1>
      <div class="flex justify-center">
        <form onSubmit={(event) => {
            event.preventDefault();
            addCard(event.target.title.value);
            event.target.reset();
        }}>
            <input 
                type="text" 
                name="title" 
                className="inline-block w-30 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                placeholder="Title" 
                required />
            <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 border rounded" type="submit">Add Card</button>
        </form>
      </div>
      <div class="flex flex-wrap justify-center">
        {loadCards(cards)}
      </div>
    </div>
  );
}

function loadCards(cards){
    
    return cards.map((card,index)=>{
        return(
            <div class="m-2 w-full md:w-1/2 xl:w-1/3 p-6 w-[19.875rem] rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
                <div class="flex items-center p-4 pb-0">
                <div class="ml-4 flex-auto">
                <div class="text-lg flex justify-center">
                <Card key={index} title={card.title}/>;
                </div>
                </div>
                </div>
                <div class="flex gap-3 p-4 flex justify-center">
                <div class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Delete card</div>
                <div class="pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">Delete Bucket</div></div>

            </div>
        )
    })
}

export default BucketPage;

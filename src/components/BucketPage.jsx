import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

function BucketPage({ buckets, setBuckets }) {
  const { id } = useParams();
  const bucket = buckets.find(bucket => bucket.id === parseInt(id));
  const [cards, setCards] = useState(bucket.cards);

  // useEffect(() => {
  //   const storedCards = localStorage.getItem(`bucket-${id}-cards`);
  //   if (storedCards) {
  //     setCards(JSON.parse(storedCards));
  //   }
  // }, [id]);

  // useEffect(() => {
  //   const newBuckets = [...buckets];
  //   const index = newBuckets.findIndex((bucket) => bucket.id === parseInt(id));
  //   if (index !== -1) {
  //     newBuckets[index].cards = cards;
  //     setBuckets(newBuckets);
  //     localStorage.setItem(`bucket-${id}-cards`, JSON.stringify(cards));
  //   }
  // }, [cards, buckets, id, setBuckets]);



  
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
          <Card
            title={card.title}
            videoUrl="4P_umaaH2DU"
          />
          //<Card key={index} title={card.title}/>
        )
    })
}

export default BucketPage;

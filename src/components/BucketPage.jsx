import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

function BucketPage({ buckets, setBuckets }) {
  const { id } = useParams();
  const bucket = buckets.find(bucket => bucket.id === parseInt(id));

  const [cards, setCards] = useState(() => {
    const savedCards = JSON.parse(localStorage.getItem(`bucket-${id}-cards`));
    return savedCards ?? [];
  });
  const videoURLList= ["iUO3_Ub85I8","IscGtF_A14A","6n3BunmIHqY","e-ORhEE9VVg","b1kbLwvqugk","UO0N7j9yI10","221F55VPp2M","RjpvuPAzJUw","T9RRe4ZsSGw","fgdpvwEWJ9M","OA1xMnDauWQ",
  "OOQI6zAwoJc","Jg0TFzprzV0","_VD6TGvyTJY","0dRHdarYl30"]

  useEffect(() => {
    localStorage.setItem(`bucket-${id}-cards`, JSON.stringify(cards));
  }, [id, cards]);

  function logEvent(event) {
    const time = new Date().toUTCString();
    const logEntry = { time, event };
    const logs = JSON.parse(localStorage.getItem('logs')) || [];
    logs.push(logEntry);
    localStorage.setItem('logs', JSON.stringify(logs));
  }
  
  function addCard(title, randomVideo) {
    

    const newCard = { id: cards.length + 1, title, randomVideo};
    setCards([...cards, newCard]);
    logEvent(`Created new Card "${newCard}"`);
  }

  return (
    <div>
      <h1 class="text-5xl pb-7 font-bold flex justify-center">{bucket.name}</h1>
      <div class="flex justify-center">
        <form onSubmit={(event) => {
            event.preventDefault();
            const randomVideo= videoURLList[Math.floor(Math.random()*videoURLList.length)]
            addCard(event.target.title.value, randomVideo);
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
        {loadCards(cards,videoURLList)}
      </div>
    </div>
  );
}

function loadCards(cards,videoURLList){
    
    return cards.map((card,index)=>{
        return(
          <Card
            title={card.title}
            randomVideo={card.randomVideo}
          />
        )
    })
}

export default BucketPage;

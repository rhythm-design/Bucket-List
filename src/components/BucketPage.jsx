import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

function BucketPage(props) {
  const { id } = useParams();
  const bucket = props.buckets.find(bucket => bucket.id === parseInt(id));
  const [cards, setCards] = useState(bucket.cards);

  function addCard(title, content) {
    const newCard = { title, content };
    setCards(cards.concat(newCard));
  }

  return (
    <div>
      <h2>{bucket.name}</h2>
      <form onSubmit={(event) => {
        event.preventDefault();
        addCard(event.target.title.value, event.target.content.value);
        event.target.reset();
      }}>
        <input type="text" name="title" placeholder="Title" required />
        <textarea name="content" placeholder="Content" required />
        <button type="submit">Add Card</button>
      </form>
      <div>
        {cards.map((card, index) => {
          return <Card key={index} title={card.title} content={card.content} />;
        })}
      </div>
    </div>
  );
}

export default BucketPage;

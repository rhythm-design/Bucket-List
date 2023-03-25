import { useState } from "react";
function Card(props){
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    return (
        <div>
        <h3>{title}</h3>
        <p>{content}</p>
        </div>
    );
}

export default Card;
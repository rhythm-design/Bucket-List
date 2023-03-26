import { useState } from "react";

function Card(props){
    const [title, setTitle] = useState(props.title);

    return (
        <div>
        <h3>{title}</h3>
        </div>
    );
}

export default Card;
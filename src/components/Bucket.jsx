import React from "react";
import { Link } from 'react-router-dom';

function Bucket(props){
    return (
        <div>
          <Link to={`/bucket/${props.id}`}>{props.name}</Link>
        </div>
      );
}

export default Bucket;
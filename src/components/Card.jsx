import { useState } from "react";
import "./Card.css"

function Card(props){
    const [title, setTitle] = useState(props.title);
    const [showModal, setShowModal]= useState(false);

    const toggleModal = () =>{
        setShowModal(!showModal)
    }

    return (
        <div class="m-2 p-2 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
          <div class="flex items-center p-4 pb-0">
          <div class="ml-4 flex-auto">
          <div class="flex justify-center">
          <div className="card-container" onClick={toggleModal}>
             <div className="card">
                 <div className="card-thumbnail">
                <img src={`https://img.youtube.com/vi/${props.videoUrl}/hqdefault.jpg`} alt={title} />
                </div>
                 <div className="card-title">{title}</div>
             </div>
             {showModal && (
                <div className="modal-container" onClick={toggleModal}>
                <div className="modal">
                    <div className="video-container">
                        <iframe width="560" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${props.videoUrl}`}
                            title={title}
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen></iframe>
                        </div>
                </div>
                </div>
            )}
            </div>
          </div>
          </div>
          </div>
          <div class="flex gap-3 p-4 flex justify-center">
          <div class="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Edit Card</div>
          <div class="pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">Delete Bucket</div></div>
      </div>
    );
}

export default Card;
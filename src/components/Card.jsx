import { useState } from "react";
import "./Card.css"

function Card({title, randomVideo}){
    const [modifiedTitle, setModifiedTitle] = useState(title);
    const [showModal, setShowModal]= useState(false);
    const [editMode, setEditMode]=useState(false);
    const [modifiedVideo, setModifiedVideo]= useState(randomVideo);

    const toggleModal = () =>{
        if(!showModal){
            logEvent(`Card clicked: "${modifiedTitle}" VideoID Played: "${modifiedVideo}"`);
        }
        setShowModal(!showModal)
    }

    const handleTitleChange = (e) => {
        setModifiedTitle(e.target.value);
    }

    const handleEditClick = () => {
        setEditMode(!editMode);
    }

    function handleLink(link){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = link.match(regExp);
        return (match&&match[7].length==11)? match[7] : "";
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        setModifiedVideo(modifiedVideo)
        setEditMode(false);
    }

    function logEvent(event) {
        const time = new Date().toUTCString();
        const logEntry = { time, event };
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        logs.push(logEntry);
        localStorage.setItem('logs', JSON.stringify(logs));
      }

    const handleLinkChange = (e) => {
        setModifiedVideo(e.target.value);
    }

    return (
        <div class="m-2 p-2 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
          <div class="flex items-center p-4 pb-0">
          <div class="ml-4 flex-auto">
          <div class="flex justify-center">
            {
                editMode?
                    <form id= "edit-form" onSubmit={handleEditSubmit}>
                        <input 
                            type="text" 
                            value={modifiedTitle} 
                            className="block w-30 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            placeholder="Enter New title" 
                            onChange={handleTitleChange}
                            required />

                        <input 
                            type="text" 
                            value={modifiedVideo}
                            className="block w-30 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            placeholder="Enter New Youtube link " 
                            onChange={handleLinkChange}
                            required />
                       
                        <button className=" bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 border rounded" type="submit">Save</button>
                        <button className=" pointer-events-auto rounded-md py-2 px-4 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50" onClick={handleEditClick}>Cancel Edit</button>
                    </form>
                : 
                <div className="card-container" onClick={toggleModal}>
                <div className="card">
                    <div className="card-thumbnail">
                        <img src={`https://i.ytimg.com/vi/${handleLink(modifiedVideo)}/maxresdefault.jpg`} alt={modifiedTitle}/>
                    </div>
                    <div className="card-title">{modifiedTitle}</div>
                </div>
                {showModal && (
                    <div className="modal-container">
                        <div className="modal">
                            <div className="video-container">
                                <iframe width="560" 
                                    height="315" 
                                    src={`https://www.youtube.com/embed/${handleLink(modifiedVideo)}`}
                                    title={modifiedTitle}
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen
                                    controls></iframe>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            }
          </div>
          </div>
          </div>
          <div class="flex gap-3 p-4 flex justify-center">
            {
                !editMode?
                    <>
                        <button className="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"  onClick={handleEditClick}>Edit Card</button>
                    </>
                :
                null
            }
        </div>
      </div>
  );
}

export default Card;



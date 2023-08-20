import React, {useState,useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
export const Addnote = () => {
    const context = useContext(NoteContext)
    const {addNote}=context
    const [note, setNote] = useState({title:"",description:"",tag:""})
// Here useState is used to set the value of the const note.
// setNote is used to update the note at any time

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note);
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        
        <div >
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlfor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    
                </div>
                <div className="mb-3">
                    <label htmlfor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

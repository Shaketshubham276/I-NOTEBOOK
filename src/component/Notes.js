import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { Addnote } from './Addnote'
import { Noteitems } from './Noteitems'
const Notes = () => {


    const context = useContext(NoteContext)
    const {notes,addNote}=context
    
    return (
        <>
        <Addnote/>
        <div className="row my-3">
            <h2>Your notes</h2>
            {notes.map((note) => {
                return <Noteitems key={note._id} note={note}/>
            })}
        </div>
        </>
    )
}

export default Notes;
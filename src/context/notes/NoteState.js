
import NoteContext from "./NoteContext"
import {useState} from 'react';

const NoteState=(props)=>{
    const notesinitial=[
        {
          "_id": "6200e996232f584cd77ba441",
          "title": "My Title",
          "description": "EAt one apple a day",
          "tag": "Personal",
          "date": "2022-02-07T09:42:46.966Z",
          "__v": 0
        },
        {
          "_id": "6200e9ac232f584cd21ba443",
          "title": "My Title",
          "description": "EAt green vegetables",
          "tag": "Personal",
          "date": "2022-02-07T09:43:08.246Z",
          "__v": 0
        },
        {
          "_id": "6200e996234f584cd77ba441",
          "title": "My Title",
          "description": "EAt one apple a day",
          "tag": "Personal",
          "date": "2022-02-07T09:42:46.966Z",
          "__v": 0
        },
        {
          "_id": "6200e9ac232f584cd77fg443",
          "title": "My Title",
          "description": "EAt green vegetables",
          "tag": "Personal",
          "date": "2022-02-07T09:43:08.246Z",
          "__v": 0
        },
        {
          "_id": "6200e996232f584cd44ba441",
          "title": "My Title",
          "description": "EAt one apple a day",
          "tag": "Personal",
          "date": "2022-02-07T09:42:46.966Z",
          "__v": 0
        },
        {
          "_id": "6200e9ac232f584c377ba443",
          "title": "My Title",
          "description": "EAt green vegetables",
          "tag": "Personal",
          "date": "2022-02-07T09:43:08.246Z",
          "__v": 0
        },
        {
          "_id": "6200e996232f584cd77bf441",
          "title": "My Title",
          "description": "EAt one apple a day",
          "tag": "Personal",
          "date": "2022-02-07T09:42:46.966Z",
          "__v": 0
        },
        {
          "_id": "6200e9ac232f584cd77ba443",
          "title": "My Title",
          "description": "EAt green vegetables",
          "tag": "Personal",
          "date": "2022-02-07T09:43:08.246Z",
          "__v": 0
        },
        {
          "_id": "6200e996232f584cd77ba541",
          "title": "My Title",
          "description": "EAt one apple a day",
          "tag": "Personal",
          "date": "2022-02-07T09:42:46.966Z",
          "__v": 0
        },
       
      ]

      const [notes, setNotes] = useState(notesinitial)
    
      // ADD a note
      const addNote=(title,description,tag)=>{
       const note= {
          "_id": "6200e9ac232f584dd77ba443",
          "title": "My Title",
          "description": "EAt green vegetables[ADDED]",
          "tag": "Personal",
          "date": "2022-02-07T09:43:08.246Z",
          "__v": 0
        }
        setNotes(notes.push(note))
      }

      // Delete a note
      const deleteNote=()=>{

      }
      // Edit a note
      const editNote=()=>{

      }


    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
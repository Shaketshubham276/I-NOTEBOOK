const express=require('express');
const router=express.Router();
const fetchuser=require('../middleware/fetchuser')
const Note=require('../models/note')
const {body,validationResult}=require('express-validator')

//ROUTE1 Get all the notes using get "/api/auth/getuser".
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Note.find({user:req.user.id});
        
        res.json(notes)
        
    } catch (error) {
        res.status(500).send("Some error occured")
    }
})
//ROUTE2 Add a new note using POST "/api/auth/addnote".LOGIN REQUIRED
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Enter a valid description').isLength({min:5})
    
],async (req,res)=>{
    try {
        const {title,description,tag}=req.body
        const errors=validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})    
        }
        const note=new Note({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save()
        
        res.json(savedNote)
        
    } catch (error) {
        res.status(500).send("Some error occured")
    }
})
// Route3: Update an existing note using POST "/api/auth/updatenote" .Login required
router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body
    // Create a newnote object
    const newNote={};
    if(title){
        newNote.title=title
    }
    if(description){
        newNote.description=description
    }
    if(tag){
        newNote.tag=tag
    }

    // Find the note to be updated and update it
    let note= await Note.findById(req.params.id)
    if(!note){

      return res.status(404).send("not found")

    }
    // if (note.user.toString() !==req.user.id){
    //     return res.status(401).send("Not Allowed")
    // }
    note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});

})
// route4 delete notes :Delete"/api/auth/deletenote".
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    // Find the id from which the note should be deleted
    let note=await Note.findById(req.params.id);
    console.log(req.params.id)
    console.log(note)
    if(note){return res.status(404).send("Not Found")}
    // Allow Deletion only if user owns the note


    // if(note.user.toString() !==req.user.id){
    //     return res.status(401).send("not allowed")
    // }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Notes has been deleted"})
})

module.exports=router
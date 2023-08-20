const express=require('express');
const router=express.Router();
const User=require('../models/User');
const {body,validationResult}=require('express-validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET='Shaketisagood@#boy';
 
//ROUTE1 Create a user using: POST "/api/auth/". Doesn't require Auth
router.post('/createserver',[
    body('name','Enter a valid name').isLength({min:2}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password should be not less than 5 characters').isLength({min:5})
],async(req,res)=>{

    // If there are errors return Bad request and the errors
    const errors=validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})    
    } 
    
    // Check whether the user with same email exists already
    try {
        
        let user=await User.findOne({email:req.body.email})
        if (user){
            return res.status(400).json({error:"Sorry a user with this email already exist"})
        }
        
        const salt= await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt)
        

        // Create a new user
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
    
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        console.log(authToken);
        
        // .then(user=>res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:'Please Enter a unique value for email'})})
        res.json(authToken)
    } 
    catch (error) {
        
        res.status(500).send("Some error occured")
    }
    
})
//ROUTE2 Authenticate a user using POST "/api/auth/login". No login required
router.post('/login',[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password cannot be blank").exists()
],
async (req,res)=>{
    const errors=validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})    
    } 
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email})
        console.log(user)
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credi"})
        }
        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credi"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET)
        res.json({authToken})
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("someerrorsoccured")
    }
})
// ROUTE3 Get loggedin User Details using: POST "/api/auth/login/getuser".login required
router.post('/getuser',fetchuser,async (req,res)=>{
try {
    userID=req.user.id
    const user=await User.findById(userID).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message) ;
    res.status(500).send("someerrorsoccured")
}
}
)


module.exports=router
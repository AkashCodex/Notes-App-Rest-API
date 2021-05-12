var express = require('express');
const { route } = require('../app');
var router = express.Router();
router.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next){
  res.send('respond with a resource');
});




// Task-1 User Register
// req.body

let usersList=[];


router.post('/userregister',(req,res)=>{
console.log("Users Register Hit!");  

/*
let userRegisterDetails={
  name : req.body.name,
  password : req.body.password,
  email : req.body.email,
  mobileNumber:req.body.mobileNumber,
  dob:req.body.dob
 }
*/

usersList.filter((userdetails)=>{
 if(req.body.email == userdetails.email){
  res.json("This user is already registered with same email Id Please enter another User details having some other email ID");
 }
});


usersList.push(req.body);  //userRegiusterDetails not defined 
 //res.json(userRegisterDetails);
//res.send({userRegisterDetails});
res.json(usersList);

});


// Task-2 User Login + match the name and password with your save data

// array of object

//user

router.post('/userlogin',(req,res)=>{
console.log("userLogin Hit!");
let {email,password} = req.body;


//map
//filter
usersList.filter( details => {
 if(!email){
  res.send({ message:"Email is mandatory to login Give your email id as well to Login"}); 
 }   
 if(details.email === email && details.password === password){
   res.send({ message: "Login Success"});
 }
 else{
  res.send({ message: "Login failed"});
 }
});
});



// Task-3 createNotes + String

let userNotesList=[];


router.post('/createnotes',(req,res)=>{
console.log("createNotes List");  




usersList.filter((data)=>{
 if(req.body.email != data.email){
   res.json({ message :"This user is not exist Please Register your account to create notes !"});
 }
});

userNotesList.push(req.body);
res.json(userNotesList);
});


// task-4 read other Notes-getId

// Sanjay Logic
/*
router.get('/readnotes/:id',(req,res)=>{
 console.log("readnotes List Sanjay");
 let id = req.params.id;
 let index = userNotesList.findIndex((detail)=>{
   return(userNotesList.id ==  Number.parseInt(id));
 })
 if(index >= 0){
   let getValueIndex = userNotesList[index];
   getValueIndex.note = note;
   res.send(getValueIndex.note);
 }
});
*/

//Akash Logic 
// 1.id read
// 2.needs to match userNotesList.id == id(my id read) 
// 3. get the note value from userNotesList.id.userNotes;
// 4.end

router.get('/readnotes',(req,res)=>{
console.log("readnotes List Akash");

let {email}=req.body;

userNotesList.filter((notesdata)=>{
 if(notesdata.email === email){
  res.json(userNotesList);
 }
 else{
  res.send({message : " email not found "});
 }
});

if(userNotesList.length == 0){
  res.json("Notes does not exist in database So you can't read from it");
}
/*
userNotesList.filter((notesdetails)=>{
  if(notesdetails.size == 0){
    console.log("Notes does not exist in database!");
   }
});*/
});


/*
router.get(‘/readnotes’,(req,res) =>{
  console.log(‘readnotes hit’);
  let{email} = req.body;
  userNote.filter( detail =>{
    if(detail.email === email){
      res.json(userNote);
    }else {
      res.send({message : “email not found”});
    }
  })
});
*/








// try to use Des

// task-5 delete my Notes

//you should actual delete from array and return modified array


router.delete('/deletenotes',async(req,res)=>{
console.log("delete User Hit!");

console.log("Before Deletion");

console.log(userNotesList);

let {email} = req.body;

let filterList;

filterList = await userNotesList.filter((notedetails) => {
 if(notedetails.email != email){
   console.log(email);
   return notedetails;
 }
 // data exchange ->json
 // browser -> send
});



if(filterList.length == 0){
  res.json("You can't delete it further as nothing is exist in database");
}
else{
  res.json(filterList);
}

console.log("After deletion");
console.log(filterList);
});




module.exports = router;

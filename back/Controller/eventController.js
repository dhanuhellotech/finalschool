const Event = require('../Models/Event');
const multer = require('../middlewares/upload');
const sharp = require("sharp")
const cloudinary = require("../middlewares/cloudinary")


const uploadImage = multer.single('image');

const getevents =async(req,res)=>{
  let events
  try {
    events = await Event.find()
  } catch (err) {
    console.log(err)
  }
  if(!events){
    return res.status(404).json({message:"cannot find events"})
  }else{
    return res.status(200).json(events)
  }
}

const resizeImage = async(req,res,next)=>{
  try {
    const resizedImage = await sharp(req.file.buffer)
    .resize(300,250)
    .toFormat("jpeg")
    .jpeg({quality:50})
    .toBuffer()
    req.image = resizedImage.toString( 'base64')
    next()
  } catch (err) {
    console.log(err)
    return res.status(404).json({message:"cannot get buffer image"})
  }
}

const addImagetoCloud = async(req,res,next)=>{
  
   try {
    const result =await cloudinary.uploader.upload(`data:image/jpeg;base64,${req.image}`,{
      folder:"events"
    })
    req.result = result
    next()
   } catch (err) {
    //console.log(err)
    return res.status(404).json({message:"cannot save image"})
   }
}

const addEvent =async(req,res)=>{
  let newEvent
  try {
    newEvent =new Event({
      title:req.body.title,
      imageUrl:req.result.secure_url,
      description:req.body.description, 
      pid:req.result.public_id,
      category:req.body.category
    })
    await newEvent.save()
  } catch (err) {
    console.log(err)
  }
  if(!newEvent){
    return res.status(404).json({message:"event not added"})
  }
  else{
    return res.status(200).json(newEvent)
  } 
}

const deleteEvent=async(req,res)=>{
   const id = req.params.id
   let del
   try {
    del = await Event.findByIdAndDelete(id)
   } catch (err) {
    console.log(err)
   }
   if(!del){
    return res.status(404).json({message:"item cannot be removed"})
   }
   else{
    return res.status(200).json("event deleted successfully")
   }
}

const updateEvent = async(req,res)=>{

  const id = req.params.id
  let updatedEvent
  const {title,description,category}=req.body
  try {
    updatedEvent = await Event.findByIdAndUpdate(id,{
      title,
      imageUrl:req.file.filename,
      description,
      category
    },{new:true})
  } catch (err) {
    console.log(err)
  }
  if(!updatedEvent){
    return res.status(404).json({message:"cennot update events"})
  }else{
    return res.status(200).json(updatedEvent)
  }
}

module.exports ={getevents,addEvent,uploadImage,deleteEvent,updateEvent,resizeImage,addImagetoCloud}

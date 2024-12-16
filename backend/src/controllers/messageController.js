import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from 'cloudinary'
export const getUserforsidebar=async(req,res)=>{
    try {
        const logedUserId = req.user._id;
        const filteredUser= await User.find({_id:{$ne:logedUserId}}).select("-password");
    } catch (error) {
        console.log("Error in getUserforsidebar:",error.message);
        res.status(500).json({message:"Internal server error"});
    }

};

export const getmessages= async(req,res)=>{
         try {
            const {id:userToChatId}=req.params
            const myId= req.user._id;

            const messages= await Message.find({
                $or:[
                    {senderId:myId, receiverId:userToChatId},
                    {senderId:userToChatId, receiverId:myId}
                ]
            })
            res.status(200).json({messages})
         } catch (error) {
            console.log("Error in getmessages:",error.message);
        res.status(500).json({message:"Internal server error"});
         }
};

 export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse= await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage= new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
            
        });
        await newMessage.save();
        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Error in sendMessage:",error.message);
        res.status(500).json({message:"Internal server error"});
    }
 }

const MessagesModel = require("../models/MessagesModel")
const AddMessage = async(req,res) =>{
    try{
   const AddedMessage = await MessagesModel.create(req.body)
   res.status(200).json({
         message: "Message Added Successfully",
            data: AddedMessage
   })
    }catch(err){
   res.status(500).json({
        message: err.message || "Internal Server Error"
   })
    }
}
module.exports = {
    AddMessage
}
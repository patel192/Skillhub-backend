const AdminLogModel = require("../models/AdminLogModel")
const AddAdminLog = async (req,res) => {
    try{
     const AddedAdminLog = await AdminLogModel.create(req.body)
     res.status(200).json({
        Message:"Admin Log Added Successfully",
        data:AddedAdminLog
     })
    }catch(err){
     res.status(500).json({
        message:err.message || "Internal Server Error"
     })
    }
} 
module.exports = {
    AddAdminLog
}
module.exports = {AddAdminLog}
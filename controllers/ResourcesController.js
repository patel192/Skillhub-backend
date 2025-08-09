const ResourcesModel = require("../models/ResourcesModel")
const AddResource = async (req, res) => {
    try{
        const AddedResource = await ResourcesModel.create(req.body)
        res.status(200).json({
            message: "Resource Added Successfully",
            data: AddedResource
        })
    }catch(err){
        res.status(500).json({
            message: err.message || "Internal Server Error"
        })
    }
}
module.exports = {
    AddResource
}
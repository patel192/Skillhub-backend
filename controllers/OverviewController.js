const OverviewModel = require("../models/OverviewModel")
const AddOverview = async (req, res) => {
    try{
   const AddedOverview = await OverviewModel.create(req.body)
   res.status(200).json({
            message: "Overview Added Successfully",
            data: AddedOverview
   })
    }catch(err){
   res.status(500).json({
        message: err.message || "Internal Server Error"
   })
    }
}
module.exports = {
    AddOverview
}
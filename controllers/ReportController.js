const ReportModel = require("../models/ReportModel")
const AddReport = async (req, res) => {
    try{
   const AddedReport = await ReportModel.create(req.body)
   res.status(200).json({
            message: "Report Added Successfully",
            data: AddedReport
   })
    }catch(err){
   res.status(500).json({
        message: err.message || "Internal Server Error"
   })
    }
}
module.exports = {
    AddReport
}
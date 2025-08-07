const EnrollmentController = require("../models/EnrollmentModel")
const AddEnrollment = async (req, res) => {
    try{
        const AddedEnrollment = await EnrollmentController.create(req.body)
        res.status(200).json({
            message: "Enrollment Added Successfully",
            data: AddedEnrollment
        })
    }catch(err){
        res.status(500).json({
            message: err.message || "Internal Server Error"
        })
    }

    
}
module.exports={
    AddEnrollment
}
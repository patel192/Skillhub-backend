const CertificateModel = require("../models/CertificatesModel")
const AddCertificate = async (req,res) => {
    try{
    const AddedCertificate = await CertificateModel.create(req.body)
    res.status(200).json({
        message:"Certificate Added Successfully",
        data:AddedCertificate
    })
    }catch(err){
     res.status(500).json({
        message:err.message || "Internal Server Error"
     })
    }
}
module.exports={
    AddCertificate
}
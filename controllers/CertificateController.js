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
const GetCertificatesByUserId = async (req,res) => {
    try{
   const Certificates = await CertificateModel.find({userId:req.params.userId})
   res.status(200).json({
    success:true,
    data:Certificates
   })
    }catch(err){
  res.status(500).json({
    success:false,
    message:err.message
  })
    }
}
module.exports={
    AddCertificate,GetCertificatesByUserId
}
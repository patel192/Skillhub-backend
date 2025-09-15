const route = require("express").Router()
const CertificateController = require("../controllers/CertificateController")
const authMiddleware = require("../middleware/authMiddleware")
route.post("/certificate",authMiddleware.verifyToken,authMiddleware.isAdmin,CertificateController.AddCertificate)
route.get("/certificates/:userId",authMiddleware.verifyToken,CertificateController.GetCertificatesByUserId)
module.exports = route;
const route = require("express").Router()
const CertificateController = require("../controllers/CertificateController")
route.post("/certificate",CertificateController.AddCertificate)
route.get("/certificates/:userId",CertificateController.GetCertificatesByUserId)
module.exports = route;
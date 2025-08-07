const route = require("express").Router()
const CertificateController = require("../controllers/CertificateController")
route.post("/certificate",CertificateController.AddCertificate)
module.exports = route
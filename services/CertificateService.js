const CertificateModel = require("../models/CertificatesModel");

const addCertificate = async (certificateData) => {
    const addedCertificate = await CertificateModel.create(certificateData);
    return addedCertificate;
};

const getCertificatesByUserId = async (userId) => {
    const certificates = await CertificateModel.find({userId,});
    return certificates;
};

module.exports = {
    addCertificate,
    getCertificatesByUserId,
};
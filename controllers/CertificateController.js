const CertificateService = require("../services/CertificateService");
const catchAsync = require("../utils/catchAsync");
const ResponseHandler = require("../utils/ResponseHandler");

const AddCertificate = catchAsync(async (req, res) => {
  const certificate = await CertificateService.addCertificate(req.body);
  return ResponseHandler.success(
    res,
    "Certificate Added Successfully",
    certificate,
    201,
  );
});

const GetCertificatesByUserId = catchAsync(async (req, res) => {
  const certificates = await CertificateService.getCertificatesByUserId(
    req.params.userId,
  );
  return ResponseHandler.success(
    res,
    "Certificates fetched successfully",
    certificates,
  );
});

module.exports = {
  AddCertificate,
  GetCertificatesByUserId,
};

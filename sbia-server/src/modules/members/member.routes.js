import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import {
  submitMember,
  getMembers,
  getMemberById,
  getIntroducerDetails,
  getReferrals,
} from "./member.controller.js";

const router = Router();

// Configure Cloudinary
console.log("Configuring Cloudinary with:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Set" : "NOT SET");
console.log(
  "API Secret:",
  process.env.CLOUDINARY_API_SECRET ? "Set" : "NOT SET"
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "sbia-uploads",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    console.log(
      "Multer processing file:",
      file.fieldname,
      "-",
      file.originalname
    );
    cb(null, true);
  },
});

// Define fields for file uploads
const uploadFields = upload.fields([
  { name: "passportPhoto", maxCount: 1 },
  { name: "signatureFile", maxCount: 1 },
  { name: "aadhaarFrontFile", maxCount: 1 },
  { name: "aadhaarBackFile", maxCount: 1 },
  { name: "panFile", maxCount: 1 },
  { name: "bankDocument", maxCount: 1 },
  { name: "nomineeAadhaarFrontFile", maxCount: 1 },
  { name: "nomineeAadhaarBackFile", maxCount: 1 },
  { name: "introducerSignatureFile", maxCount: 1 },
]);

// Error handling middleware for multer
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err.code, err.message);
    return res
      .status(400)
      .json({ success: false, message: `Upload error: ${err.message}` });
  } else if (err) {
    console.error("Upload error:", err.message);
    return res
      .status(400)
      .json({ success: false, message: `Upload error: ${err.message}` });
  }
  next();
};

// Create new member
router.post(
  "/",
  (req, res, next) => {
    uploadFields(req, res, (err) => {
      if (err) {
        console.error("Upload middleware error:", err);
        return res
          .status(400)
          .json({ success: false, message: `Upload error: ${err.message}` });
      }
      console.log("Upload completed, proceeding to submitMember");
      console.log(
        "req.files:",
        req.files ? Object.keys(req.files) : "undefined"
      );
      next();
    });
  },
  submitMember
);

// List all members
router.get("/", getMembers);

// Get all referral data (must come before /:id)
router.get("/referrals/all", getReferrals);

// Get introducer details by member ID (must come before /:id)
router.get("/:id/introducer", getIntroducerDetails);

// Get single member by id
router.get("/:id", getMemberById);

export default router;

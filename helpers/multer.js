import multer from 'multer';

// Multer storage setup for buffering files
const storage = multer.memoryStorage();

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extName = allowedTypes.test(file.originalname.toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error('Only images, PDFs, and document files are allowed!'));
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB file limit
});

export default upload;
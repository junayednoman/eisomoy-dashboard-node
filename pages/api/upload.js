import multer from 'multer';

// Multer configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

export const config = {
  api: {
    bodyParser: false // Disables body parsing, as we're handling files
  }
};

// API endpoint for handling file uploads
export default async (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer error occurred
      return res.status(400).json({ message: 'Multer error occurred', error: err });
    } else if (err) {
      // Other error occurred
      return res.status(500).json({ message: 'Error occurred', error: err });
    }

    // File uploaded successfully
    const fileName = req.file.filename; // Get the uploaded file's filename
    return res.status(200).json({ message: 'File uploaded successfully', fileName });
  });
};

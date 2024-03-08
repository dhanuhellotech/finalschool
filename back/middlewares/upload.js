    const multer = require('multer');

    const storage = multer.memoryStorage()

    const upload = multer({ storage: storage });
    const uploadPdf = multer({
        limits: {
          fileSize: 10 * 1024 * 1024, // 10MB, adjust as needed
        },
      });

    module.exports = upload;





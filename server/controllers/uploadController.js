// const multer = require('multer');
// const fs = require('fs');



// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });



// module.exports.uploadImage = upload.single('image'), (req, res, next) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Validate file type
//     if (!req.file.mimetype.startsWith('image')) {
//         return res.status(400).json({ error: 'Only images are allowed' });
//     }

//     fs.writeFile('path/to/save/image.jpg', req.file.buffer, (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ error: 'Error saving image' });
//         }
//         return res.status(200).json({ success: true });
//     });

//     try {
//         // Code to handle file upload
//         const file = req.file;
//         console.log('Uploaded file:', file);
//         res.json({ success: true, message: 'File uploaded successfully' });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };


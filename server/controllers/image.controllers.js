// const db = require("../models");
// const Image = db.images;






// exports.create = async (req, res) => {

//     const randNumID = await Math.floor(910*Math.random());
//     const { id=randNumID, url, alt, featured } = req.body;
    
//     try {
             
//         // FORM VALIDATION:  "Necessary Fields for Payload."
//         if (!url) {
//             const errorResponseData = { 
//                 success: false,
//                 message: "No image was uploaded"
//             }
//             res.status(400).json(errorResponseData);
//             console.log("UPLOADING POST IMAGE: ", errorResponseData);
//             return; 
//         };

//         const newImage = new Image({
//             _id: id*randNumAsImageObjectID,        // This is to prevent Duplicate ID entries for New Objects
//             url: url.toLowerCase(),
//             alt: alt,
//             featured: featured,
//         });
       
//         const savedImage = await newImage.save();                     
//         console.log(`\n||-----------------------------------------------------||
//                     \n||-----      NEW => IMAGE SUCCESSFULLY SAVED      -----||
//                     \n||-----------------------------------------------------||
//                     \nIMAGE UPLOADED: "${savedImage.url}"  AS FEATURED IMAGE: "${savedImage.featured}"
//                     \n||-----------------------------------------------------||`);

                    
//         const responseData = {
//             success: true,
//             data: savedImage,
//             message: "Upload Successful!",
//         };
//         return res.status(201).json(responseData);
        
//     } catch (error) {
//         return res.status(500).json({ message: "INTERNAL SERVER ERROR: ", error: error.message });
//     }
// };





















// // Extract the base64-encoded data from the URL
// const base64Data = dataURL.split(';base64,').pop();

// // Convert base64 to a binary string
// const binaryString = atob(base64Data);

// // Convert binary string to a Uint8Array
// const uint8Array = new Uint8Array(binaryString.length);
// for (let i = 0; i < binaryString.length; i++) {
//     uint8Array[i] = binaryString.charCodeAt(i);
// }

// // Convert Uint8Array to a blob
// const blob = new Blob([uint8Array], { type: 'image/jpeg' });

// // Convert the blob to a File object
// const file = new File([blob], '', { type: 'image/jpeg' });
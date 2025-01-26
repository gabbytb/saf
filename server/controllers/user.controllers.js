const db = require("../models");
const bcrypt = require("bcrypt");
const ROLES = require("../constants/roles.constant");
const User = db.users;
const Social = db.socials;
const Role = db.roles;
// MONITOR EVERY USER ACTION - Save to Database
const Activity = db.activities;
const ip = process.env.IP || "0.0.0.0";




// const crypto = require('crypto');
// // FOR CRYPTO: Replace with a secure, secret key.
// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here'; // 32 bytes for AES-256
// const IV_LENGTH = 16; // AES block size in bytes
// // Encrypt function
// const encrypt = (textToBeEncrypted) => {
//     const iv = crypto.randomBytes(IV_LENGTH); // Generate a random initialization vector
//     const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(ENCRYPTION_KEY, 'utf8'), iv); // Create cipher
//     let encrypted = cipher.update(textToBeEncrypted, 'utf8', 'hex'); // Encrypt text
//     // let encrypted = cipher.update(String(textToBeEncrypted), 'utf8', 'hex'); // Encrypt text
//     encrypted += cipher.final('hex'); // Finalize encryption
//     return iv.toString('hex') + ':' + encrypted; // Return IV + encrypted text
// };
// // Decrypt function
// const decrypt = (encryptedText) => {
//     const textParts = encryptedText.split(':'); // Split the IV and encrypted text
//     const iv = Buffer.from(textParts.shift(), 'hex'); // Extract the IV
//     const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex'); // Extract the encrypted text
//     const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(ENCRYPTION_KEY, 'utf8'), iv); // Create decipher
//     let decrypted = decipher.update(encryptedTextBuffer, 'hex', 'utf8'); // Decrypt text
//     decrypted += decipher.final('utf8'); // Finalize decryption
//     return decrypted;
// };
// // FOR CRYPTO: Replace with a secure, secret key.



// *****************************************************************
// Middlewares
// *****************************************************************
const encryptPassword = require("../middlewares/EncryptPassword");
const assignOneDayToken = require("../middlewares/AssignOneDayToken");   // For Sign In
const assignTwoDaysToken = require("../middlewares/AssignTwoDaysToken");    // For Sign Up
// const assignThreeDaysToken = require("../middlewares/AssignThreeDaysToken");    // For Sign Up
const verifyToken = require("../middlewares/VerifyToken");
const mailSenderForGetSignUp = require("../middlewares/MailSenderForGetSignUp");
// const mailSenderForPostSignUp = require("../middlewares/MailSenderForPostSignUp");
// const mailSenderForVerifiedAccount = require("../middlewares/MailSenderForVerifiedAccount");
const setNigerianTime = require("../middlewares/SetNigerianTime");
const setThisTimeToNigerianTime = require("../middlewares/SetThisTimeToNigerianTime");
// *****************************************************************
// *****************************************************************




exports.monitorUsersActivities = async (req, res) => {
    
    // Gets a unique number based on the current time
    var uniqueId = Date.now(),
        id = 9999999999;
    let randNum = uniqueId % id;
    let randomNumber = uniqueId % randNum;
    
    try {
        // Payload
        const { message, mode, timestamp } = req.body;    

        // ***************************************************************//
        // HOW TO SET CURRENT DATE TO CURRENT NIGERIAN TIME AND DATE
        // ***************************************************************//  
        var recordActivity = new Activity({ 
            _id: randNum + randomNumber++,
            trigger: mode,
            log: message,
            createdAt: timestamp !== null ? setNigerianTime() : timestamp,
        });
        await recordActivity.save();
 
        const responseData = {       
            servermessage: recordActivity.log,
        };
        console.log("USER ACTIVITY: ", responseData.servermessage);
        return res.status(200).json(responseData);

    } catch(error) {
        const responseData = {
            success: false,
            error: error.message,
            message: "Internal server error",
        };
        res.status(500).json(responseData);
    };
};









// Our CREATE ACCOUNT Logic starts here
exports.signUp = async (req, res) => {

    // Gets a unique number based on the current time
    const uniqueId = Date.now();

    // Payload
    const { id = 23401, firstName, lastName, email, password, approvesTandC } = req.body;
    
    try {

        // FORM VALIDATION:  "Compulsory Payload"
        if (!(firstName && lastName && email && password)) {
            const responseData = {
                success: false,
                message: "Fill all the required inputs"
            };
            console.log("*************************************",
                "\n*********  SIGNUP  ATTEMPT  *********",
                "\n*************************************",
                "\nSignup Error: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        };
        
        //  CHECK IF E-MAIL EXISTS IN USER REPOSITORY
        const emailExists = await User.findOne({ email: email.toLowerCase() });
        if (emailExists) {
            const responseData = {
                success: false,
                message: "E-mail exists. Sign In"
            };
            console.log("**************************",
                        "\n***   SIGN-UP FAILED   ***",
                        "\n**************************",
                        "\nUser ID: ", emailExists._id,
                        "\nUser Name: ", emailExists.firstName + " " + emailExists.lastName,
                        "\nE-mail: ", emailExists.email, " exists\n\n");
            return res.status(200).json(responseData);
        };
    
        // ***************************************************************//
        // PICK A SINGLE ROLE
        // ***************************************************************//        
        // const roleAdmin = await Role.findOne({ role: ROLES.ADMIN });
        // const roleEditor = await Role.findOne({ role: ROLES.EDITOR });
        // const roleStaff = await Role.findOne({ role: ROLES.STAFF });
        const roleUser = await Role.findOne({ role: ROLES.USERS });                
        // ***************************************************************//
        // ***************************************************************//




        // // **************************************** //
        // // ***    BE: SAVE USER INFORMATION     *** //
        // // **************************************** //
        // const encryptedPassword = await encryptPassword("Administrativerightsonly");       // Hash/Encrypt Password                        
        // const user = new User({ 
        //     _id: 699,
        //     // username: "admin", 
        //     firstName: "Ola", 
        //     lastName: "Adeyanju", 
        //     phone: 2347038662503, 
        //     address: '4c, Chidison str', 
        //     address2: '24, Lekan Muritala str, Aboru, Lagos', 
        //     city: 'Iba', 
        //     state: 'Oyo', 
        //     country: 'Nigeria', 
        //     postalCode: 23401,
        //     email: "test_user_email_3@exboss.com",
        //     aboutMe: "TEST CTO",
        //     password: encryptedPassword,
        //     roles: [{ ...roleUser }],
        //     approvesTandC: true,
        //     status: 'rejected',
        //     isVerified: false, 
        // });
        // // // ******************************************************************************************************//
        // // // ***  BE: USE MIDDLEWARE: (JWT) TO CREATE "ACCESS-TOKEN" FOR USER AUTHENTICATION AND AUTHORIZATION  ***//
        // // // ******************************************************************************************************//
        // const token = await assignOneDayToken(user._id);
        // // // ****************************************************
        // // // ***  BE: USE MIDDLEWARE: (JWT) TO VERIFY "TOKEN"
        // // // ****************************************************
        // const decodedData = await verifyToken(token);
        // // console.log("Token Details: ", decodedData);
        // // // RESULT:-  Token Details:  { id: 31825360, iat: 1722812853, exp: 1722816453 }
        // // // NOTE:-
        // // //     1) Token id (id): This is a custom payload claim, likely representing the user's unique identifier (e.g., user ID in the database).
        // // //     2) Issued At (iat): This is a standard JWT claim representing the time at which the token was issued. It's typically expressed as a Unix timestamp, which counts the number of seconds since January 1, 1970 (UTC).
        // // //     3) Expiration Time (exp): This is another standard JWT claim, indicating the time at which the token will expire. It's also expressed as a Unix timestamp.
        // // // ******************************************************************************************************//
        // // // ***  Add Generated TOKEN & TIME OF EXPIRY, to New User before Saving to DB ***//
        // // // ******************************************************************************************************//
        // user.accessToken = token;
        // user.tokenExpires = new Date(decodedData.exp * 1000);
        // // // **************************************** //
        // // // ***    BE: SAVE USER INFORMATION     *** //
        // // // **************************************** //
        // const newUser = await user.save();
        // // // **************************************** //
        // console.log("\n*********************************************************",
        //     "\n*****          NEW USER ACCOUNT DETAILS             *****",
        //     "\n*********************************************************",
        //     `\nRegistration Status: ${newUser}`,
        //     "\n******************************************************************************************\n");
               
  


        // ************************************ //
        // ***  FE: CREATE "USER" INSTANCE  *** //
        // ************************************ //  
        const encryptedPassword = await encryptPassword(password);       // Hash/Encrypt Password                        
        const user = new User({
            _id: uniqueId % id,
            // userName: username.toLowerCase(),           // sanitize: convert email to lowercase. NOTE: You must sanitize your data before forwarding to backend.
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            approvesTandC,
            status: "pending",
            roles: [{ ...roleUser}],
            // roles: [{ ...roleAdmin}, {...roleEditor}, {...roleStaff}],
            // roles: [{ ...roleAdmin }, { ...roleEditor }, { ...roleStaff }, { ...roleUsers }],
            // roles: [{ ...roleAdmin }] || [{ ...roleEditor }] || [{ ...roleStaff }] || [{ ...roleUsers }],
        });
        // ******************************************************************************************************//
        // ***  FE: USE MIDDLEWARE: (JWT) TO ASSIGN "TOKEN" TO USER FOR AUTHENTICATION AND AUTHORIZATION  ***//
        // ******************************************************************************************************//
        const token = await assignTwoDaysToken(user._id, user.email);
        // ****************************************************
        // ***  FE: USE MIDDLEWARE: (JWT) TO VERIFY "TOKEN"
        // ****************************************************
        const decodedData = await verifyToken(token);
        // console.log("Decode - Token Details: ", decodedData);    
        // RESULT:-  Token Details:  { id: 31825360, iat: 1722812853, exp: 1722816453 }
        // NOTE:-
        //      1) Token id (id): This is a custom payload claim, likely representing the user's unique identifier (e.g., user ID in the database).
        //      2) Issued At (iat): This is a standard JWT claim representing the time at which the token was issued. It's typically expressed as a Unix timestamp, which counts the number of seconds since January 1, 1970 (UTC).
        //      3) Expiration Time (exp): This is another standard JWT claim, indicating the time at which the token will expire. It's also expressed as a Unix timestamp  i.e it counts the number of seconds since January 1, 1970 (UTC).               
        // ***************************************************************//
        // HOW TO SET CURRENT DATE TO CURRENT NIGERIAN TIME AND DATE
        // ***************************************************************//       
        user.tokenExpires = await setThisTimeToNigerianTime(decodedData.exp);
        user.createdAt = await setThisTimeToNigerianTime(decodedData.iat);
        user.updatedAt = await setThisTimeToNigerianTime(decodedData.iat);
        // ***************************************************************//
        // ***************************************************************//

             
        // ***************************************************************//
        // ***    FE: SAVE USER INFORMATION     *** //
        // ***************************************************************//
        const savedUser = await user.save();
        // ***************************************************************//
        // E-mail Service Config
        // ***************************************************************//
        // await mailSenderPostSignUp(token, newUser);
        await mailSenderForGetSignUp(token, savedUser);
        // let valueOfEncodedText = decrypt(newUser.expirationInMs);
        // console.log("Encrypted token lifespan: ", valueOfEncodedText);        
        // **************************************** //
        console.log(`\n*********************************************************`,
                    `\n*****        TOKEN GENERATED FOR NEW USER           *****`,
                    `\n*********************************************************`,
                    `\nToken: ${token}`,
                    `\n\n*********************************************************`,
                    `\n*****          NEW USER ACCOUNT DETAILS             *****`,
                    `\n*********************************************************`,
                    `\nRegistration Status: ${savedUser}`,
                    `\n*********************************************************`,
                    `\n*********************************************************`);
                    
        // res.json({ token });        
        var newUser = {
            id: savedUser._id,
            first_name: savedUser.firstName,
            last_name: savedUser.lastName,                  
            email: savedUser.email,    
            password: savedUser.password,     
            status: savedUser.status,
            roles: [savedUser.roles],
            approves_T_and_C: savedUser.approvesTandC,     
            is_verified: savedUser.isVerified,
            access_token: savedUser.accessToken,            
            token_expires: savedUser.tokenExpires, 
            about_me: savedUser.aboutMe,
            time_created: savedUser.createdAt, 
            time_updated: savedUser.updatedAt,            
        };        

        const responseData = {
            success: true,
            data: newUser,                                    
            message: "Successful",
        };        
        // Send the token back in the response
        return res.status(201).json(responseData);

    } catch (error) {
        // return res.status(409).json({ message: error.message});
        const responseData = { 
            success: false, 
            message: "Internal Server Error",
        };
        console.error("Unexpected error during account verification: ", error);
        return res.status(500).json(responseData);  
    }
};  // THOROUGHLY Tested === Working






// Our CREATE ACCOUNT Logic starts here
exports.adminCreateUser = async (req, res) => {

    // Gets a unique number based on the current time
    const uniqueId = Date.now();

    // Payload
    const { id = 23401, firstName, lastName, phone, email, password, address, address2, city, state, country, zipCode, aboutMe } = req.body;
    
    try {

        // FORM VALIDATION:  "Compulsory Payload"
        if (!(firstName && lastName && email && password)) {
            const responseData = {
                success: false,
                message: "Fill all the required inputs"
            };
            console.log("*************************************",
                "\n*********  SIGNUP  ATTEMPT  *********",
                "\n*************************************",
                "\nSignup Error: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        };

        
        // CHECK IF E-MAIL EXISTS IN USER REPOSITORY
        const emailExists = await User.findOne({ email: email.toLowerCase() });
        if (emailExists) {
            const responseData = {
                success: false,
                message: "E-mail exists. Sign In"
            };
            console.log("**************************",
                        "\n***   SIGN-UP FAILED   ***",
                        "\n**************************",
                        "\nUser ID: ", emailExists._id,
                        "\nUser Name: ", emailExists.firstName + " " + emailExists.lastName,
                        "\nE-mail: ", emailExists.email, " exists\n\n");
            return res.status(200).json(responseData);
        };
    
        
        // ***************************************************************//
        // PICK ALL ADMIN ROLES
        // ***************************************************************//
        const roleSelector = await Role.findOne({ role: ROLES.SELECTOR });
        // ***************************************************************//
        // ***************************************************************//
            

        // ***************************************************************//
        // Hash/Encrypt Password
        // ***************************************************************//
        const encryptedPassword = await encryptPassword(password);
       

        // ************************************ //
        // ***  FE: CREATE "USER" INSTANCE  *** //
        // ************************************ //      
        const user = new User({
            _id: uniqueId % id,
            // userName: username.toLowerCase(),           // sanitize: convert username to lowercase. NOTE: You must sanitize your data before forwarding to backend.
            firstName,
            lastName,
            phone,
            email,
            password: encryptedPassword,   
            address,
            address2,
            city,
            state,
            country,
            zipCode,
            aboutMe,
            // expirationInMs: encrypt(expiresIn),        // Encode: token lifespan
            roles: [{ ...roleSelector }],               
            status: "approved",
            approvesTandC: true,
            isVerified: true,
        });
        // ******************************************************************************************************//
        // ***  FE: USE MIDDLEWARE: (JWT) TO ASSIGN "TOKEN" TO USER FOR AUTHENTICATION AND AUTHORIZATION  ***//
        // ******************************************************************************************************//
        const token = await assignTwoDaysToken(user._id);
        // ****************************************************
        // ***  FE: USE MIDDLEWARE: (JWT) TO VERIFY "TOKEN"
        // ****************************************************
        const tokenDecoded = await verifyToken(token);
        
        // RESULT:-  Token Details:  { id: 31825360, iat: 1722812853, exp: 1722816453 }
        // NOTE:-
        //      1) Token id (id): This is a custom payload claim, likely representing the user's unique identifier (e.g., user ID in the database).
        //      2) Issued At (iat): This is a standard JWT claim representing the time at which the token was issued. It's typically expressed as a Unix timestamp, which counts the number of seconds since January 1, 1970 (UTC).
        //      3) Expiration Time (exp): This is another standard JWT claim, indicating the time at which the token will expire. It's also expressed as a Unix timestamp.
        // NEXT:- 
        //      Format token expiry date using:-  new Date(tokenDecoded.exp * 1000) 
        // To Get Current Date Setting for Token Expiration Time to start counting from!       
        const tokenExpiryDate = new Date(tokenDecoded.exp * 1000);


        user.tokenExpires = tokenExpiryDate;
        user.accessToken = token;
        // user.tokenExpires = encrypt(tokenExpiryDate);


        // ***************************************************************//
        // E-mail Service Config
        // ***************************************************************//
        // await mailSenderPostSignUp(token, newUser);
        await mailSenderForGetSignUp(token, user);     


        const newUser = await user.save();
        // **************************************** //
        // ***    FE: SAVE USER INFORMATION     *** //
        // **************************************** //



        // // **************************************** //
        // // ***    BE: SAVE USER INFORMATION     *** //
        // // **************************************** //
        // const user = new User({ 
        //     _id: 666, 
        //     username: "admin", 
        //     firstName: "Oyebanji", 
        //     lastName: "Gabriel", 
        //     phone: 2347038662402, 
        //     address: '11a, Chidison str', 
        //     address2: '14, Lekan Muritala str, Aboru, Lagos', 
        //     city: 'Iba', 
        //     state: 'Oyo', 
        //     country: 'Nigeria', 
        //     zipCode: 23401, 
        //     email: "try-email@example.com", 
        //     password: encryptPassword("Administrativerightsonly"),
        //     roles: [{ ...roleEditor }],
        //     approvesTandC: true,
        //     status: 'rejected',
        //     isVerified: true, 
        // });
        // // ******************************************************************************************************//
        // // ***  BE: USE MIDDLEWARE: (JWT) TO CREATE "ACCESS-TOKEN" FOR USER AUTHENTICATION AND AUTHORIZATION  ***//
        // // ******************************************************************************************************//
        // const token = await assignOneDayToken(user._id);
        // // ****************************************************
        // // ***  BE: USE MIDDLEWARE: (JWT) TO VERIFY "TOKEN"
        // // ****************************************************
        // const decodedData = await verifyToken(token);
        // // console.log("Token Details: ", decodedData);
        // // RESULT:-  Token Details:  { id: 31825360, iat: 1722812853, exp: 1722816453 }
        // // NOTE:-
        // //     1) Token id (id): This is a custom payload claim, likely representing the user's unique identifier (e.g., user ID in the database).
        // //     2) Issued At (iat): This is a standard JWT claim representing the time at which the token was issued. It's typically expressed as a Unix timestamp, which counts the number of seconds since January 1, 1970 (UTC).
        // //     3) Expiration Time (exp): This is another standard JWT claim, indicating the time at which the token will expire. It's also expressed as a Unix timestamp.
        // // ******************************************************************************************************//
        // // ***  Add Generated TOKEN & TIME OF EXPIRY, to New User before Saving to DB ***//
        // // ******************************************************************************************************//
        // user.accessToken = token;
        // user.tokenExpires = new Date(decodedData.exp * 1000);
        // // **************************************** //
        // // ***    BE: SAVE USER INFORMATION     *** //
        // // **************************************** //
        // const newUser = await user.save();
        // // **************************************** //


        // let valueOfEncodedText = decrypt(newUser.expirationInMs);
        // console.log("Encrypted token lifespan: ", valueOfEncodedText);
        
        // **************************************** //

        console.log("\n*********************************************************",
            "\n*****          NEW USER ACCOUNT DETAILS             *****",
            "\n*********************************************************",
            `\nRegistration Status: ${newUser}`,
            "\n******************************************************************************************\n");
                
        const responseData = {
            success: true,
            data: newUser,
            message: "Successful",
        };
        return res.status(201).json(responseData);
    } catch (error) {
        // return res.status(409).json({ message: error.message});
        const responseData = { 
            success: false, 
            message: "Internal Server Error",
        };
        console.error("Unexpected error during account verification: ", error);
        return res.status(500).json(responseData);  
    };
};  // THOROUGHLY Tested === Working


// Our ACCOUNT Re-ACTIVATION Logic starts here
exports.reValidateSignUp = async (req, res) => {

    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        // if (!existingUser) {
        //     const responseData = {
        //         success: false,
        //         message: "No match found",
        //     }
        //     return res.status(404).json(responseData);
        // };

        // if (existingUser.isVerified) {
        //     const responseData = {
        //         success: false,
        //         message: "User is already verified",
        //     }
        //     return res.status(200).json(responseData);
        // };


        // *************************************************************************************************//
        // ***  USE MIDDLEWARE: (JWT) TO CREATE "ACCESS-TOKEN" FOR USER AUTHENTICATION AND AUTHORIZATION  ***//
        // *************************************************************************************************//
        
        const token = await assignTwoDaysToken(existingUser._id);
        
        // ***************************************************************//
        // E-mail Service Config
        // ***************************************************************//
        await mailSenderForGetSignUp(token, existingUser);
        
        const tokenDecoded = await verifyToken(token);
        
        // RESULT:-  Token Details:  { id: 31825360, iat: 1722812853, exp: 1722816453 }
        // NOTE:-
        //      1) Token id (id): This is a custom payload claim, likely representing the user's unique identifier (e.g., user ID in the database).
        //      2) Issued At (iat): This is a standard JWT claim representing the time at which the token was issued. It's typically expressed as a Unix timestamp, which counts the number of seconds since January 1, 1970 (UTC).
        //      3) Expiration Time (exp): This is another standard JWT claim, indicating the time at which the token will expire. It's also expressed as a Unix timestamp.
        // Format using: new Date(tokenDecoded.exp * 1000) 
        // To Get Current Date Setting for Token Expiration Time to start counting from!       
        // const tokenExpiryDate = new Date(tokenDecoded.exp * 1000);
        // existingUser.tokenExpires = tokenExpiryDate;


        // Step 1: Convert the token expiration (in seconds) to a Date object
        const tokenExpiryDate = new Date(tokenDecoded.exp * 1000);
        // Step 2: Adjust for Nigerian time (UTC+1)
        const nigeriaTimeMillis = tokenExpiryDate.getTime() + (3600 * 1000); // Add 1 hour in milliseconds
        // Step 3: Convert the adjusted time to a new Date object       
        const nigeriaTime = new Date(nigeriaTimeMillis);
        existingUser.tokenExpires = nigeriaTime;


        const timeOfUpdate = new Date(Date.now() + (3600 * 1000));  // Get Nigerian time        
        existingUser.updatedAt = timeOfUpdate;

        console.log("\n*********************************************************",
                    "\n*****    NEW TOKEN GENERATED FOR EXISTING USER      *****",
                    `\n*********************************************************
                    \nNew Access Token: ${token}`,
                    "\n\n*********************************************************",
                    "\n*****        EXISTING USER ACCOUNT DETAILS          *****",
                    `\n*********************************************************
                    \nExisting Account | Registration Status: ${existingUser}`,
                    "\n\n******************************************************************************************\n");
        
        const responseData = {
            success: true,
            data: existingUser,
            // data: {
            //     userId: existingUser,
            //     token: token,
            // },
            message: "Re-sent activation e-mail",
        };
        return res.status(200).json(responseData);
        
    } catch (error) {
        const responseData = { 
            success: false, 
            message: "Internal Server Error" 
        };
        console.error("Database error during account re-verification: ", error);
        return res.status(500).json(responseData); 
    }
};  // THOROUGHLY Tested === Working





// exports.verifySignUpWithGet = async (req, res) => {        

//     const token = req.query.token;

//     try {

//         const decoded = await verifyToken(token);
//         // console.log(`Token is valid. User ID: ${decoded.id}`);

//         const _id = decoded.id;
//         const userExists = await User.findById(_id);

//         try {   

//             // Step 1: If user exists, find User by Email 
//             // const email = userExists.email;   
//             // Change Existing User status to "approved".
//             // Assign the generated token to Existing User, as their accessToken..
//             // Set isVerified as True for Existing User
//             const dataToUpdate = {           
//                 accessToken: token,
//                 status: "approved",
//                 isVerified: true,
//             };

//             // Step 2: If user exists, find User by Email
//             const updatedUser = await User.findOneAndUpdate({ email: userExists.email }, dataToUpdate, { new: true });               
//             const user = {
//                 id: updatedUser._id,
//                 firstname: updatedUser.firstName,
//                 lastname: updatedUser.lastName,
//                 email: updatedUser.email,
//                 password: updatedUser.password,
//                 status: updatedUser.status,
//                 approvestandc: updatedUser.approvesTandC,
//                 isverified: updatedUser.isVerified,
//                 roles: [updatedUser.roles],
//                 accessToken: updatedUser.accessToken,
//                 tokenExpires: updatedUser.tokenExpires,
//                 createdAt: updatedUser.createdAt,
//                 updatedAt: updatedUser.updatedAt,                  
//             };

//             const responseData = {
//                 success: true,
//                 data: user,
//                 message: "Successful"
//             };
//             console.log("*********************************************************",
//                 "\n*****           NEW ACCOUNT VERIFICATION             ****",
//                 "\n*********************************************************",
//                 "\nVerification Status: ", responseData,
//                 "\n*********************************************************\n\n");
//             return res.status(200).json(responseData); // Send a success response       
        
//         } catch (error) {
//             const responseData = { 
//                 success: false, 
//                 message: "Invalid account",
//                 error: error.message,
//             };
//             console.error("Error occurred during Account Activation: ", responseData, "\n");
//             return res.status(500).json(responseData);
//         };   

//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {           
//             const responseData = { 
//                 success: false, 
//                 message: "Token has expired",
//                 error: error.message,
//             };
//             console.error("Token verification status: ", responseData, "\n");
//             return res.status(500).json(responseData);
//         } else if (error.name === 'JsonWebTokenError') {         
//             const responseData = { 
//                 success: false, 
//                 message: "Token does not exist",
//                 error: error.message,
//             };
//             console.error("Token verification status: ", responseData, "\n");
//             return res.status(500).json(responseData);
//         } else if (error.name === 'MongoServerError') {           
//             const responseData = { 
//                 success: false, 
//                 message: "Mulitple User entry",
//                 error: error.message,
//             };
//             console.error("Mulitple User entry: ", responseData, "\n");
//             return res.status(500).json(responseData);
//         } else {
//             const responseData = { 
//                 success: false, 
//                 message: "Invalid token",
//                 error: error.message,
//             };
//             console.error("Error occurred during Account Activation: ", responseData, "\n");
//             return res.status(500).json(responseData);
//         };
//     };

//     // try {

//     //     const token = req.query.token;
//     //     const verifiedToken = await verifyToken(token);
        
//     //     const _id = verifiedToken.id;
//     //     const userExists = await User.findById(_id);

//     //     if (!(userExists)) {
//     //         const responseData = { 
//     //             success: false, 
//     //             message: "Invalid account",
//     //         };
//     //         console.log("VERIFIED USER: ", responseData);
//     //         return res.json(responseData);
//     //     };

//     //     // Step 6: If user exists, find User by Email 
//     //     // const email = userExists.email;   
//     //     // Change Existing User status to "approved".
//     //     // Assign the generated token to Existing User, as their accessToken..
//     //     // Set isVerified as True for Existing User
//     //     const dataToUpdate = {
//     //         status: "approved",
//     //         accessToken: token,
//     //         isVerified: true,
//     //     };
//     //     // Step 6: If user exists, find User by Email
//     //     const updatedUser = await User.findOneAndUpdate({ email: userExists.email }, dataToUpdate, { new: true });               
    
//     //     const responseData = {
//     //         success: true,
//     //         data: updatedUser,
//     //         message: "Successful"
//     //     };
//     //     console.log("*********************************************************",
//     //         "\n*****           NEW ACCOUNT VERIFICATION             ****",
//     //         "\n*********************************************************",
//     //         "\nVerification Status: ", responseData,
//     //         "\n*********************************************************\n\n");
//     //     res.status(200).json(responseData); // Send a success response
    
//     // } catch (error) {
//     //     if (error.name === 'TokenExpiredError') {
//     //         // console.error("Token has expired");
//     //         const responseData = { 
//     //             success: false, 
//     //             message: "Token has expired",
//     //         };
//     //         console.log("Token verification status: ", responseData);
//     //         return res.json(responseData);
//     //     } else if (error.name === 'JsonWebTokenError') {
//     //         // console.error("Token does not exist");
//     //         const responseData = { 
//     //             success: false, 
//     //             message: "Token does not exist",
//     //         };
//     //         console.log("Token verification status: ", responseData);
//     //         return res.json(responseData);
//     //     } else if (error.name === 'MongoServerError') {
//     //         // console.error("Mulitple user entry");
//     //         const responseData = { 
//     //             success: false, 
//     //             message: "Mulitple User entry",
//     //         };
//     //         console.log("Mulitple User entry: ", responseData);
//     //         return res.json(responseData);
//     //     } else {
//     //         const responseData = { 
//     //             success: false, 
//     //             message: "Internal Server Error",
//     //         };
//     //         console.error("Internal Server Error during account verification: ", error.message);
//     //         return res.status(500).json(responseData);
//     //     };
//     // };
// };  // THOROUGHLY Tested === Working



// Our ACCOUNT VERIFICATION Logic USING POST request using starts here
// exports.verifyUserAccountWithPost = async (req, res) => {

//     try {
//         const AuthHeader = req.headers.authorization;
//         if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
//             const responseData = { 
//                 success: false, 
//                 message: "Unauthorized",
//             };
//             console.log("Token was not authorized by a User: ", responseData);
//             return res.status(401).json(responseData);
//         };
        
//         const token = AuthHeader.split(" ")[1];
//         const verifiedToken = await verifyToken(token);
        
//         const _id = verifiedToken.id;
//         const userExists = await User.findById(_id);
//         if (!userExists) {
//             const responseData = { 
//                 success: false, 
//                 message: "Invalid account",
//             };
//             console.log("VERIFIED USER: ", responseData);
//             return res.json(responseData);
//         };

//         // Step 6: If user exists, find User by Email 
//         // const email = userExists.email;   
//         // Change Existing User status to "approved".
//         // Assign the generated token to Existing User, as their accessToken..
//         // Set isVerified as True for Existing User
//         const dataToUpdate = {
//             status: "approved",
//             accessToken: token,
//             isVerified: true,
//         };
//         // const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });               
        
        
//         // Step 6: If user exists, find User by Email
//         const updatedUser = await User.findOneAndUpdate({ email: userExists.email }, dataToUpdate, { new: true });               
    
        

//         const responseData = {
//             success: true,
//             data: updatedUser,
//             message: "Successful"
//         };
//         console.log("*********************************************************",
//             "\n*****           NEW ACCOUNT VERIFICATION             ****",
//             "\n*********************************************************",
//             "\nVerification Status: ", responseData,
//             "\n*********************************************************\n\n");
//         res.status(200).json(responseData); // Send a success response
    
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             // console.error("Token has expired");
//             const responseData = { 
//                 success: false, 
//                 message: "Token has expired",
//             };
//             console.log("Token verification status: ", responseData);
//             return res.status(403).json(responseData);
//         } else if (error.name === 'JsonWebTokenError') {
//             // console.error("Token does not exist");
//             const responseData = { 
//                 success: false, 
//                 message: "Token does not exist",
//             };
//             console.log("Token verification status: ", responseData);
//             return res.status(401).json(responseData);
//         } else if (error.name === 'MongoServerError') {
//             // console.error("Mulitple user entry");
//             const responseData = { 
//                 success: false, 
//                 message: "Mulitple User entry",
//             };
//             console.log("Mulitple user entry: ", responseData);
//             return res.status(401).json(responseData);
//         } else {
//             const responseData = { 
//                 success: false, 
//                 message: "Internal Server Error",
//             };
//             console.error("Internal Server Error during account verification: ", error.message);
//             return res.status(500).json(responseData);
//         };
//     };
// };  // THOROUGHLY Tested === Working





// Our ACCOUNT VERIFICATION Logic USING GET request starts here

exports.verifySignUpGetReq = async (req, res) => {
            
    const verified_success = req.user.success;
    const verified_message = req.user.message;
    const verified_data = req.user.data;

    if (verified_data) {
        const verifiedUser = {
            id: verified_data.id,
            firstname: verified_data.firstname,
            lastname: verified_data.lastname,
            email: verified_data.email,
            status: verified_data.status,
            isverified: verified_data.isverified,
            acesstoken: verified_data.acesstoken,
        };
        res.redirect(302, `https://${ip}/user/signup?token=${verifiedUser.acesstoken}&email=${verifiedUser.email}&verified=${verified_success}&message=${encodeURIComponent(verified_message)}`);
    } else {
        res.redirect(302, '/user/signup');
    };
};  // THOROUGHLY Tested === Working

// Our USER LOGIN Logic starts here
exports.logIn = async (req, res) => {

    try {

        // 0) Required Payload
        const email = req.body.email || "";
        const password = req.body.password || "";

        // 1) Use E-mail to find User
        const existingUser = await User.findOne({ email: email });       
        // 2) CHECK IF USER EXISTS
        if (!existingUser) {
            const responseData = { 
                success: false, 
                message: "Account with this details does not exist",
            };
            console.log("Login Failed: ", responseData.message, "\n\n");
            // return res.status(404).json(responseData);
            return res.json(responseData);
        };

        // 3) Use Middleware: 'bCrypt' to compare Password provided, with User's Password.
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);        
        // 4) CHECK IF USER CORRECT
        if (!isPasswordCorrect) {      

            for (var i = 0; i < existingUser.roles.length; i++) {
                if (i < existingUser.roles.length) {
                    console.log("***************************************",
                        "\n*****      LOG-IN ATTEMPT BY      *****",
                        "\n***************************************",
                        "\nUser ID: ", existingUser._id,
                        "\nUser Name: ", existingUser.firstName + " " + existingUser.lastName,
                        "\nUser E-mail: ", existingUser.email,
                        "\nUser Password is CORRECT: ", isPasswordCorrect,
                        "\n***************************************",
                        "\n***   ADDITIONAL USER INFORMATION  ***",
                        "\n***************************************",
                        "\nUser isVerified: ", existingUser.isVerified,
                        "\nUser Status: ", existingUser.status.toUpperCase(),
                        "\nUser ROLE(S): ", existingUser.roles[i].role,
                        "\nPrevious User AccessToken: ", existingUser.accessToken,
                        "\n***************************************",
                        "\n");
                };
            };

            const responseData = { 
                success: false, 
                message: "Incorrect password",
            };
            console.log("Login Failed: ", responseData.message, "\n\n");
            // return res.status(401).json(responseData);
            return res.json(responseData);
        };        

        // 5) Check if User Has Verified their Account after Registration
        if (!existingUser.isVerified) {
            // ***********************************************************************************//
            // *************         UNVERIFIED USER ATTEMPTING TO LOG-IN           **************//
            // ***********************************************************************************//
    
            for (var i = 0; i < existingUser.roles.length; i++) {
                if (i < existingUser.roles.length) {
                    console.log("*******************************************************",
                        "\n*****      LOG-IN ATTEMPT BY UNVERIFIED USER      *****",
                        "\n*******************************************************",
                        // "\nUser ID: ", existingUser._id,
                        "\nUser Name: ", existingUser.firstName + " " + existingUser.lastName,
                        "\nUser E-mail: ", existingUser.email,
                        "\nUser Password is CORRECT: ", isPasswordCorrect,
                        "\n***************************************",
                        "\n***   ADDITIONAL USER INFORMATION  ***",
                        "\n***************************************",
                        "\nUser isVerified: ", existingUser.isVerified,
                        "\nUser Status: ", existingUser.status.toUpperCase(),
                        "\nUser ROLE(S): ", existingUser.roles[i].role,
                        "\nPrevious User AccessToken: ", existingUser.accessToken,
                        "\n***************************************",
                        "\n\n");
                };
            };

            // ***********************************************************************************//
            // NOTE:- Use the USER 'accessToken' for Authentication & Authorization
            // ***********************************************************************************//  
            const responseData = {
                success: false,
                message: "Kindly verify your account",
            };
            console.log("Login Failed: ", responseData.message, "\n\n");
            // return res.status(401).json(responseData);
            return res.json(responseData);
        };
        
        console.log("***********************************************",
            "\n******       🔐   ACTIVE USER  🔑        ******",
            "\n***********************************************",
            // "\nUser ID: ", existingUser._id,
            "\nUser Name: ", existingUser.firstName + " " + existingUser.lastName,
            "\nUser E-mail: ", existingUser.email,
            "\n**********************************************",
            "\n****      ADDITIONAL USER INFORMATION      ****",
            "\n***********************************************",
            "\nPrev. AccessToken: ", existingUser.accessToken,
            "\nPrev. AccessToken [TIME TO EXPIRE]: ", existingUser.tokenExpires,
            "\n***********************************************",
            "\n\n");
 
        // 6) Create Token for User logging-in.  (NOTE:-  Token will have a Life-span once created.)
        const token = await assignOneDayToken(existingUser?._id);    // console.log("Generated Token Data: ", token);
        
        // 7) Verify token to get Lifespan of Token
        const verifiedToken = await verifyToken(token);   // console.log("Verified or Decoded Token Data: ", verifiedToken);
        
        // 8. Update user.tokenExpires with value of tokenExpiryDate    
        // ***************************************************************//
        // HOW TO SET CURRENT DATE TO CURRENT NIGERIAN TIME AND DATE:-  
        // NOTE: USE new Date() function to make expire date begin with current date and time.
        // ***************************************************************//
        existingUser.tokenExpires = await setThisTimeToNigerianTime(verifiedToken.exp);
        // ***************************************************************//
                
        // 9. Update user.accessToken with value of token
        existingUser.accessToken = token;

        // 10. Save to Update USER DETAILS with values parsed
        const userInfoUpdatedAfterLogin = await existingUser.save();
        
        for (var n = 0; n < userInfoUpdatedAfterLogin.roles.length; n++) {
            if (n < userInfoUpdatedAfterLogin.roles.length) {

                // ***********************************************************************************//
                // *************                CURRENT LOGGED-IN USER                  **************//
                // ***********************************************************************************//
                console.log("***********************************************",
                    "\n******      🔐  LOGIN SUCCESSFUL 🔑      ******",
                    "\n***********************************************",
                    // "\nUser ID: ", userInfoUpdatedAfterLogin._id,
                    "\nUser Name: ", userInfoUpdatedAfterLogin.firstName + " " + userInfoUpdatedAfterLogin.lastName,
                    "\nUser E-mail: ", userInfoUpdatedAfterLogin.email,
                    "\n***********************************************",
                    "\n****      ADDITIONAL USER INFORMATION      ****",
                    "\n***********************************************",
                    "\nUser ROLE(S): ", userInfoUpdatedAfterLogin.roles[n].role,
                    // "\nUser isVerified: ", loggedInUser.isVerified,
                    "\nUser Status: ", userInfoUpdatedAfterLogin.status.toUpperCase(),
                    "\nUser AccessToken: ", userInfoUpdatedAfterLogin.accessToken,
                    "\nSESSION WILL EXPIRE: ", userInfoUpdatedAfterLogin.tokenExpires,
                    "\n***********************************************",
                    "\n=====>       CURRENT LOGGED-IN USER      <=====",
                    "\n***********************************************",
                    "\n\n");
            };
        };

        let loggedInUser = {
            id: userInfoUpdatedAfterLogin._id,
            first_name: userInfoUpdatedAfterLogin.firstName,
            last_name: userInfoUpdatedAfterLogin.lastName,                  
            email: userInfoUpdatedAfterLogin.email,             
            access_token: userInfoUpdatedAfterLogin.accessToken,            
            expires_at: userInfoUpdatedAfterLogin.tokenExpires, 
            status: userInfoUpdatedAfterLogin.status,
            roles: [userInfoUpdatedAfterLogin.roles],
            approves_T_and_C: userInfoUpdatedAfterLogin.approvesTandC,     
            is_verified: userInfoUpdatedAfterLogin.isVerified,
            about_me: userInfoUpdatedAfterLogin.aboutMe,
            // time_created: userInfoUpdatedAfterLogin.createdAt, 
            // time_updated: userInfoUpdatedAfterLogin.updatedAt, 
        };
        // console.log("LOGGED-IN USER", loggedInUser);
        // ***********************************************************************************//
        // NOTE:- By assigning Token to Logged-in User,
        //        Now you can use User's "accessToken" 
        //        for Headers Authentication & Authorization
        // ***********************************************************************************//  
        const responseData = {
            success: true,
            data: loggedInUser,
            // data: {
            //     userId: existingUser._id,
            //     accessToken: existingUser.accessToken,
            // },
            message: "Successful",
        };       
        return res.status(200).json(responseData);

    } catch (error) {
        const responseData = {   
            success: false,       
            message: "Internal Server Error",            
            error: error.message,
        };
        console.log("Internal Server Error during Login: ", responseData.error);
        return res.status(500).json(responseData);  
    };

};  // THOROUGHLY Tested === Working

// Our USER LOGIN via G-MAIL Logic starts here
exports.googleSignOn = async (req, res) => {

    try {
        
        const email = req.body.email || "";

        // 1) Find Existing User
        const existingUser = await User.findOne({ email: email }); 

        if (existingUser) {

            // 4) Verify token to get Lifespan of Token
            console.log("***********************************************",
                "\n******       🔐   ACTIVE USER  🔑        ******",
                "\n***********************************************",
                // "\nUser ID: ", existingUser._id,
                "\nUser Name: ", existingUser.firstName + " " + existingUser.lastName,
                "\nUser E-mail: ", existingUser.email,
                "\n**********************************************",
                "\n****      ADDITIONAL USER INFORMATION      ****",
                "\n***********************************************",
                "\nPrev. AccessToken: ", existingUser.accessToken,
                "\nPrev. AccessToken [TIME TO EXPIRE]: ", existingUser.tokenExpires,
                "\n***********************************************",
                "\n\n");
     
            // 6) Create Token for User logging-in.  (NOTE:-  Token will have a Life-span once created.)
            const token = await assignOneDayToken(existingUser._id);    // console.log("Generated Token Data: ", token);
            
            // 7) Verify token to get Lifespan of Token
            const verifiedToken = await verifyToken(token);   // console.log("Verified or Decoded Token Data: ", verifiedToken);
            
            // 8. Update user.tokenExpires with value of tokenExpiryDate    
            // ***************************************************************//
            // HOW TO SET CURRENT DATE TO CURRENT NIGERIAN TIME AND DATE:-  
            // NOTE: USE new Date() function to make expire date begin with current date and time.
            // ***************************************************************//
            existingUser.tokenExpires = await setThisTimeToNigerianTime(verifiedToken.exp);
            // ***************************************************************//
                    
            // 9. Update user.accessToken with value of token
            existingUser.accessToken = token;
    
            // 10. Save to Update USER DETAILS with values parsed
            const userInfoUpdatedAfterLogin = await existingUser.save();
            
            for (var n = 0; n < userInfoUpdatedAfterLogin.roles.length; n++) {
                if (n < userInfoUpdatedAfterLogin.roles.length) {
    
                    // ***********************************************************************************//
                    // *************                CURRENT LOGGED-IN USER                  **************//
                    // ***********************************************************************************//
                    console.log("***********************************************",
                        "\n******      🔐  LOGIN SUCCESSFUL 🔑      ******",
                        "\n***********************************************",
                        // "\nUser ID: ", userInfoUpdatedAfterLogin._id,
                        "\nUser Name: ", userInfoUpdatedAfterLogin.firstName + " " + userInfoUpdatedAfterLogin.lastName,
                        "\nUser E-mail: ", userInfoUpdatedAfterLogin.email,
                        "\n***********************************************",
                        "\n****      ADDITIONAL USER INFORMATION      ****",
                        "\n***********************************************",
                        "\nUser ROLE(S): ", userInfoUpdatedAfterLogin.roles[n].role,
                        // "\nUser isVerified: ", loggedInUser.isVerified,
                        "\nUser Status: ", userInfoUpdatedAfterLogin.status.toUpperCase(),
                        "\nUser AccessToken: ", userInfoUpdatedAfterLogin.accessToken,
                        "\nSESSION WILL EXPIRE: ", userInfoUpdatedAfterLogin.tokenExpires,
                        "\n***********************************************",
                        "\n=====>       CURRENT LOGGED-IN USER      <=====",
                        "\n***********************************************",
                        "\n\n");
                };
            };
    
            let loggedInUser = {
                id: userInfoUpdatedAfterLogin._id,
                first_name: userInfoUpdatedAfterLogin.firstName,
                last_name: userInfoUpdatedAfterLogin.lastName,                  
                email: userInfoUpdatedAfterLogin.email,             
                access_token: userInfoUpdatedAfterLogin.accessToken,            
                expires_at: userInfoUpdatedAfterLogin.tokenExpires, 
                status: userInfoUpdatedAfterLogin.status,
                roles: [userInfoUpdatedAfterLogin.roles],
                approves_T_and_C: userInfoUpdatedAfterLogin.approvesTandC,     
                is_verified: userInfoUpdatedAfterLogin.isVerified,
                about_me: userInfoUpdatedAfterLogin.aboutMe,
                display_img: userInfoUpdatedAfterLogin.displayImg,
                // time_created: userInfoUpdatedAfterLogin.createdAt, 
                // time_updated: userInfoUpdatedAfterLogin.updatedAt, 
            };
            // console.log("LOGGED-IN USER", loggedInUser);
            // ***********************************************************************************//
            // NOTE:- By assigning Token to Logged-in User,
            //        Now you can use User's "accessToken" 
            //        for Headers Authentication & Authorization
            // ***********************************************************************************//  
            const responseData = {
                success: true,
                data: loggedInUser,
                // data: {
                //     userId: existingUser._id,
                //     accessToken: existingUser.accessToken,
                // },
                message: "Successful",
            };
            return res.status(200).json(responseData);
        } else {
            const responseData = { 
                success: false,
                message: "User not found",
            };
            res.status(404).json(responseData);
        };

    } catch (error) {
        console.error('Error saving code:', error);
        res.status(500).json({ message: 'Failed to save code' });
    };
};






// Our FIND All USERS Logic starts here
exports.findAllUsers = async (req, res) => { 

    // Get Pagination Parameters from the request query     
    const status = req.query.status || "";               
    const page = parseInt(req.query.page, 10) || 1;        
    const limit = parseInt(req.query.limit, 10) || 20;                        
    const skip = (page - 1) * limit;

    try {

        let query = {
            'roles.role': ROLES.USERS,
        };
       
        if (status) {
            query.status = status;
        };        

        // FIND ALL ROLE_USERS
        const allUsers = await User.find(query)
                                .skip(parseInt(skip))
                                .limit(parseInt(limit));        
        
        if (allUsers !== null) {             
            if (status === 'approved') {
                allUsers;
                // console.log("APPROVED USERS/DONORS/CUSTOMERS:: ", allUsers);   
            } else if (status === 'pending') {
                allUsers;
                // console.log("PENDNG USERS/DONORS/CUSTOMERS:: ", allUsers);    
            } else if (status === 'rejected') {
                allUsers;
                // console.log("REJECTED USERS/DONORS/CUSTOMERS:: ", allUsers);
            } else {
                allUsers;
                // console.log("ALL USERS/DONORS/CUSTOMERS: ", allUsers);
            };
        };
        
        const totalUsers = await User.countDocuments(query);   // Total number of users with the given status
        const totalPages = Math.ceil(totalUsers / limit);   // Calculate total pages
        const pagination = {
            usersRecord: totalUsers,
            page,
            limit,
            lastPage: totalPages,
        };
        // console.log("PAGINATION: ", pagination, "\n\n");
        
        const responseData = {
            success: true,
            data: {
                allUsers,
                pagination
            },
            message: "ALL USERS retrieved successfully",
        }    
        return res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};
// Get Length of All Approved Users
exports.totalApprovedUsers = async (req, res) => {

    try {

        let query = {                
            "status": "approved",
            "roles.role": ROLES.USERS,
        };

        const allApprovedUsers = await User.find(query);

        if (!allApprovedUsers) {
            const responseData = {
                success: false,
                message: "No user found"
            };
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: allApprovedUsers.length,
            message: "RETRIEVE LENGTH OF ALL APPROVED USERS: Successful"
        };
        res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};
// Get Length of All Pending Users
exports.totalPendingUsers = async (req, res) => {

    try {

        let query = {                
            "status": "pending",
            "roles.role": ROLES.USERS,
        };

        const allPendingUsers = await User.find(query);
        if (!allPendingUsers) {
            const responseData = {
                success: false,
                message: "No user found"
            };
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: allPendingUsers.length,
            message: "RETRIEVE LENGTH OF ALL PENDING USERS: Successful"
        };
        res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};
// Get Length of All Rejected Users
exports.totalRejectedUsers = async (req, res) => {

    try {

        let query = {                
            "status": "rejected",
            "roles.role": ROLES.USERS,
        };

        const allRejectedUsers = await User.find(query);
        if (!allRejectedUsers) {
            const responseData = {
                success: false,
                message: "No user found"
            };
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: allRejectedUsers.length,
            message: "RETRIEVE LENGTH OF ALL REJECTED USERS: Successful"
        };
        res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};  // THOROUGHLY Tested === Working






// Our FIND All ADMINS Logic starts here
exports.findAllAdmins = async (req, res) => {
            
    // Get Pagination Parameters from the request query     
    const status = req.query.status || "";               
    const page = parseInt(req.query.page, 10) || 1;        
    const limit = parseInt(req.query.limit, 10) || 10;                        
    const skip = (page - 1) * limit;

    try {

        const query = {            
            'roles.role': ROLES.XYZ,    // Find ROLE_ADMIN, ROLE_STAFF, ROLE_EDITOR
        };
        
        if (status) {
            query.status = status;     // Add "status" filter
        };
        
        const allAdminRole = await User.find(query)     // Query User by Status [And that have ADMIN ROLE.]
                                .skip(parseInt(skip))
                                .limit(parseInt(limit));

        if (allAdminRole !== null) {             
            if (status === 'approved') {
                allAdminRole
                // console.log("APPROVED ADMIN USERS: ", allAdminRole);   
            } else if (status === 'pending') {
                allAdminRole
                // console.log("PENDNG ADMIN USERS: ", allAdminRole);    
            } else if (status === 'rejected') {
                allAdminRole;
                // console.log("REJECTED ADMIN USERS: ", allAdminRole);
            } else {
                allAdminRole;
                // console.log("ALL ADMIN USERS: ", allAdminRole);
            };
        };
        
        // Pagination logic
        const totalAdminUsers = await User.countDocuments(query);   // Total number of staffs
        const totalPages = Math.ceil(totalAdminUsers / limit);      // Calculate total pages
        const pagination = {
            staffsRecord: totalAdminUsers,
            page,
            recordLimit: limit,
            lastPage: totalPages,
        };
        // console.log("PAGINATION: ", pagination, "\n\n");        

        const responseData = {
            success: true,
            data: {
                allAdminRole,
                pagination
            },
            message: "Items retrieved successfully",
        };       
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};
// Get Length of All Approved Admins
exports.totalApprovedAdmins = async (req, res) => {

    try {

        let query = {                
            "status": "approved",
            "roles.role": ROLES.XYZ,
        };

        const allApprovedAdmins = await User.find(query);
        if (!allApprovedAdmins) {
            const responseData = {
                success: false,
                message: "No staff found"
            };
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: allApprovedAdmins.length,
            message: "RETRIEVE LENGTH OF ALL APPROVED ADMINS: Successful"
        };
        res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};
// Get Length of All Pending Admins
exports.totalPendingAdmins = async (req, res) => {

    try {

        let query = {                
            "status": "pending",
            "roles.role": ROLES.XYZ,
        };

        const allPendingAdmins = await User.find(query);
        if (!allPendingAdmins) {
            const responseData = {
                success: false,
                message: "No staff found"
            };
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: allPendingAdmins.length,
            message: "RETRIEVE LENGTH OF ALL PENDING ADMINS: Successful"
        };
        res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};
// Get Length of All Rejected Admins
exports.totalRejectedAdmins = async (req, res) => {

    try {

        let query = {                
            "status": "rejected",
            "roles.role": ROLES.XYZ,
        };

        const allRejectedAdmins = await User.find(query);
        if (!allRejectedAdmins) {
            const responseData = {
                success: false,
                message: "RETRIEVE ALL REJECTED ADMINS: Failed"
            };
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: allRejectedAdmins.length,
            message: "RETRIEVE LENGTH OF ALL REJECTED ADMINS: Successful"
        };
        res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};  // THOROUGHLY Tested === Working






// Our FIND SINGLE USER by ID Logic starts here
exports.findSingleUserById = async (req, res) => {
    
    try {
        
        const _id = req.params.id;
        const user = await User.findById(_id);

        // const decodedExpiresIn = decrypt(user.expirationInMs); // Decode here
        // console.log("Decoded Token Expiration Time: ", decodedExpiresIn);

        if (!user) {
            const responseData = {
                success: false,
                message: "User not found",
            };
            console.log("Find User by ID: ", responseData);
            return res.status(404).json(responseData);
        };

        var parsedRoles;
        for (var i = 0; i < user.roles.length; i++) {
            if (i < user.roles.length) {
                parsedRoles = {
                    // id: user.roles[i]._id,
                    role: user.roles[i].role,
                    // crearedAt: user.roles[i].createdAt,
                    // updatedAt: user.roles[i].updatedAt,
                };                
            };
            // else if (user.roles[i].role === "ROLE_ADMIN") {
            //     let roleAdmin = "ROLE_ADMIN";                
            //     parsedRoles = {
            //         id: user.roles[i]._id,
            //         role: roleAdmin,
            //         crearedAt: user.roles[i].createdAt,
            //         updatedAt: user.roles[i].updatedAt,
            //     };                
            // } else if (user.roles[i].role === "ROLE_EDITOR") {  
            //     let roleEditor = "ROLE_EDITOR";               
            //     parsedRoles = {
            //         id: user.roles[i]._id,
            //         role: roleEditor,
            //         crearedAt: user.roles[i].createdAt,
            //         updatedAt: user.roles[i].updatedAt,
            //     };                
            // } else if (user.roles[i].role === "ROLE_STAFF") { 
            //     let roleStaff = "ROLE_STAFF";                               
            //     parsedRoles = {
            //         id: user.roles[i]._id,
            //         role: roleStaff,
            //         crearedAt: user.roles[i].createdAt,
            //         updatedAt: user.roles[i].updatedAt,
            //     };                
            // };
        };

        var parsedSocials;
        for (var x = 0; x < user.socials.length; x++) {
            if (x < user.socials.length) {
                parsedSocials = {
                    // id: user.socials[x]._id,
                    fb: user.socials[x].fb,
                    xr: user.socials[x].xr,
                    ig: user.socials[x].ig,
                    wh: user.socials[x].wh,
                    pn: user.socials[x].pn,
                    tk: user.socials[x].tk,
                    tg: user.socials[x].tg,
                    yt: user.socials[x].yt,
                }; 
            };
        };

        const parseUserById =  {
            id: user._id,
            first_name: user.firstName,
            last_name: user.lastName,                  
            email: user.email,
            status: user.status,
            socials: [parsedSocials],
            phone: user.phone, 
            address: user.address, 
            address2: user.address2, 
            city: user.city, 
            state: user.state, 
            country: user.country, 
            postalCode: user.postalCode, 
            aboutMe: user.aboutMe,
            roles: [parsedRoles],
        }; 
        const responseData = {
            success: true,
            data: parseUserById,
            message: "Successful",
        };
        for (var i = 0; i < parseUserById.roles.length; i++) {
            if (parseUserById.roles[i].role === "ROLE_USERS") {
                console.log("USER ACCOUNT: ", responseData.data, "\n");               
            } else if (parseUserById.roles[i].role === "ROLE_EDITOR") {
                console.log("EDITOR ACCOUNT: ", responseData.data, "\n");                
            } else if (parseUserById.roles[i].role === "ROLE_STAFF") {
                console.log("STAFF ACCOUNT: ", responseData.data, "\n");              
            } else {
                console.log("ADMIN ACCOUNT: ", responseData.data, "\n");                
            };
        };       
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
    };
};  // THOROUGHLY Tested === Working


// Update User Information
exports.updateSingleUserById = async (req, res) => {

    try {

        const _id = req.params.id;        
        const socialsID = await Social.findById(_id);
        
        const { first_name, last_name, email, socials, phone, address, address2, city, state, country, postalCode, aboutMe, } = req.body;        

        // To Add New Roles to Existing User's Account
        // const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" });
        // const roleEditor = await Role.findOne({ role: "ROLE_EDITOR" });
        // const roleStaff = await Role.findOne({ role: "ROLE_STAFF" });
        // const roleUsers = await Role.findOne({ role: "ROLE_USERS" });          
        
        // Step 2: Create and save socials, associating them with the User
        const socialPromises = socials.map(async (socialData) => {
            const newSocial = new Social({                
                _id: socialsID === null ? _id : _id,
                fb: socialData.fb,
                xr: socialData.xr,
                wh: socialData.wh,
                ig: socialData.ig,
                pn: socialData.pn,
                tk: socialData.tk,
                tg: socialData.tg,
                yt: socialData.yt,
                createdAt: await setNigerianTime(),
                updatedAt: await setNigerianTime(),
            });
            // console.log('NEW SOCIALS BEING CREATED = ', newSocial);
            return await newSocial;
        });
        const savedSocials = await Promise.all(socialPromises);               

        const dataToUpdate = {
            firstName: first_name,
            lastName: last_name,
            email,
            phone,
            address,
            address2,
            city,
            state,
            country,
            postalCode,
            aboutMe,
            socials: savedSocials,
            // status,
            // isVerified,
            // roles: [ {...roleAdmin} ],
            // roles: [ {...roleEditor} ],
            // roles: [ {...roleStaff} ],
            // roles: [ {...roleUsers} ],
            // Optional
            // roles: [ {...roleAdmin}, {...roleEditor}, {...roleStaff} ],
        };
            
        // METHOD 1: Use findByIdAndUpdate => find the user by their Unique ID and update it !
        const updatedUser = await User.findByIdAndUpdate(_id, dataToUpdate, { new: true }); 
        // METHOD 2: Use findOneAndUpdate => $or to find the user by username or email and update it !
        // const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });
        

        if (!updatedUser) {
            const responseData = {
                success: false,
                message: "No match found"
            };
            console.log("UPDATE for EXISTING User Account with E-mail: ", responseData);
            return res.json(responseData);
        };

        const token = await assignOneDayToken(updatedUser._id);       
        const decodedData = await verifyToken(token);

        updatedUser.accessToken = token;
        updatedUser.tokenExpires = await setThisTimeToNigerianTime(decodedData.exp);    
        updatedUser.updatedAt = await setThisTimeToNigerianTime(decodedData.iat);
        
        // Parse User Socials Data
        let parsedSocials;
        for (var x = 0; x < savedSocials.length; x++) {
            if (x < savedSocials.length) {
                parsedSocials = {
                    id: savedSocials[x]._id,
                    fb: savedSocials[x].fb,
                    xr: savedSocials[x].xr,
                    ig: savedSocials[x].ig,
                    wh: savedSocials[x].wh,
                    pn: savedSocials[x].pn,
                    tk: savedSocials[x].tk,
                    tg: savedSocials[x].tg,
                    yt: savedSocials[x].yt,
                }; 
            };
        };
        
        // Parse Clean User Data        
        const responseData = {
            success: true,
            data: {
                id: updatedUser._id,
                first_name: updatedUser.firstName,
                last_name: updatedUser.lastName,                  
                email: updatedUser.email,  
                socials: [parsedSocials],           
                status: updatedUser.status,
                roles: [updatedUser.roles],
                approves_T_and_C: updatedUser.approvesTandC,     
                is_verified: updatedUser.isVerified,
                about_me: updatedUser.aboutMe,
                access_token: updatedUser.accessToken,            
                expires_at: updatedUser.tokenExpires,
                time_created: updatedUser.createdAt, 
                time_updated: updatedUser.updatedAt, 
            },
            message: 'User updated successfully',
        };
        console.log("EXISTING User Account with E-mail: ", updatedUser.email + " was updated!"
                    // "\nUPDATED USER DATA: ", responseData.data
                   );
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};


// Update User Information
exports.activateOrDeactivateSingleUserById = async (req, res) => {
    
    try {
        const _id = req.params.id;
        const { status, isVerified, } = req.body;

        // To Add New Roles to Existing User's Account
        // const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" });
        // const roleEditor = await Role.findOne({ role: "ROLE_EDITOR" });
        // const roleStaff = await Role.findOne({ role: "ROLE_STAFF" });
        // const roleUsers = await Role.findOne({ role: "ROLE_USERS" });
        
        const dataToUpdate = {        
            status,
            isVerified,
            // roles: [ {...roleAdmin} ],
            // roles: [ {...roleEditor} ],
            // roles: [ {...roleStaff} ],
            // roles: [ {...roleUsers} ],
            // Optional
            // roles: [ {...roleAdmin}, {...roleEditor}, {...roleStaff} ],
        };
          
        const updatedUser = await User.findByIdAndUpdate(_id, dataToUpdate, { new: true });
        if (!updatedUser) {
            const responseData = {
                success: false,
                message: "No match found"
            };
            console.log("UPDATE for EXISTING User Account: ", responseData);
            return res.json(responseData);
        };

        const token = await assignTwoDaysToken(updatedUser._id);
        updatedUser.accessToken = token;

        // User updated successfully
        const responseData = {
            success: true,
            data: updatedUser,
            message: 'User Status updated successfully',
        };
        console.log("EXISTING User Account with E-mail: ", updatedUser.email + " was updated!", 
                    "\nUPDATED USER DATA: ", responseData.data);
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    };
};   


// Deleta a User with the Specified id in the request
exports.deleteUserById = async (req, res) => {
    
    try {

        const _id = req.params.id;
         
        const userId = await User.deleteOne({ _id }, { useFindAndModify: false });           
        if (!userId) {
            const responseData = {
                success: false,
                message: "User not found"
            };
            console.log("DELETED USER: ", responseData);
            return res.status(404).json(responseData);
        };

        const responseData = {
            success: true,
            data: userId,
            message: "User deleted successfully!",
        };
        console.log("DELETED USER: ", responseData);
        return res.status(200).json(responseData);
    
    } catch (error) {
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: `Could not delete User with ID = ${id}`, err });
    };

};


// Deleta all Users from the Database
exports.deleteAllUsers = (req, res) => {
    //  res.setHeader('Content-Type', 'application/json');
    try {
        const users = User.deleteMany({});
        if (!users) {
            return res.status(404).json({ message: "Failed to execute action!" });
        } else {
            return res.status(200).json({ message: `${users.deletedCount} Users was deleted successfully!` });
        }
    } catch (error) {
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};













// const usernameExists = await User.findOne({ userName: username.toLowerCase() });
// if (usernameExists) {
//     const responseData = {
//         success: false,
//         message: "Username exists. Sign In"
//     };
//     // console.log("Username Exists: ", usernameExists);
//     console.log("Username Exists: ", responseData);
//     return res.status(200).json(responseData);
// }



// FOR ENCYRPTION  !!!
// Why Use Buffer.from?
// Buffer.from is used to ensure that the encryption key and IV are in the correct format:

// Encryption Key: AES-256 requires a 32-byte key. Buffer.from converts the key from a string into a buffer of bytes.
// IV: The IV needs to be in a specific byte format. Buffer.from converts the hexadecimal string representation of the IV back into bytes for the cipher functions.
// Using Buffer.from ensures that the data is correctly formatted for encryption and decryption.





// var hasNext, 
//     hasPrev,
//     next, 
//     previous;


// if () {
//     hasNext = true
//     hasPrev = false
//     next = parseInt(page) + 1
//     previous = parseInt(page) - 1
// } else  if () {
//     hasNext = true
//     hasPrev = true
//     next = parseInt(page) + 1
//     previous = parseInt(page) - 1
// } else {
//     hasNext = false
//     hasPrev = true
//     next = null
//     previous = parseInt(page) - 1
// };


// const pagination = {
//     currentPage: parseInt(page),
//     hasNext: hasNext,
//     next: next,
//     hasPrev: hasPrev,
//     previous: previous,
//     lastPage: totalPages,                       
//     numberPerPage: parseInt(limit),
// }






// *** NOTE: ***
// We don’t need to write CRUD functions, Mongoose Model supports all of them:
// create a new Tutorial: object.save()
// find a Tutorial by id: findById(id)
// retrieve all Tutorials: find()
// update a Tutorial by id: findByIdAndUpdate(id, data)
// remove a Tutorial: findByIdAndRemove(id)
// remove all Tutorials: deleteMany()
// find all Tutorials by title: find({ title: { $regex: new RegExp(title), $options: “i” } })
//
// These functions will be used in Our Controller.



// const verificationLink = `<button style="background:limegreen;border:0;padding:15px 20px;border-radius:3px;"><a style="color:white;font-weight:500;text-decoration:none;" href="${verifyActivationLink}" alt="account verification">Verify your email address</a></button>`;
// :visited {background: green}
// :hover {background: yellow}
// :visited:hover {background: purple}
// // Message object
//    let message = {
//     from: 'your_email@gmail.com',
//     to: 'recipient@example.com',
//     subject: 'Subject of your email',
//     text: 'This is the body of your email'
// }
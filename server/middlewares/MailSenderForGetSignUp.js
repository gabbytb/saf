const nodemailer = require("nodemailer");
const { mailServiceProvider, mailServiceUser, mailServicePwd, BASE_URL, } = process.env || null;
console.log("************************************************",
            "\n*********        E-MAIL CONFIG        **********",
            "\n************************************************",
            `\n\nSERVICE PROVIDER: ${mailServiceProvider}`,
            `\nADMIN E-MAIL: ${mailServiceUser}\n`);






        
const mailSenderForGetSignUp = (token, user) => {
    
    // ***************************************************************//
    // E-mail Service Config
    // ***************************************************************//
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // hostname
        service: mailServiceProvider,
        auth: {
            user: mailServiceUser,
            pass: mailServicePwd,
        },
    });
    const serverIP = `${BASE_URL}`;
    const siteURL = `<a href="www.samuelakinolafoundation.com" style="text-decoration:none;color:blue;">www.samuelakinolafoundation.com</a>`;
    const verifyActivationLink = `${serverIP}/user/verify?token=${token}`;
    const verificationLink = `<button style="background:limegreen;border:0;padding:15px 20px;border-radius:3px;"><a style="color:white;font-weight:500;text-decoration:none;" href="${verifyActivationLink}" alt="account verification">Verify your email address</a></button>`;
    const activationLink = `<span style="color:black;font-size:10px;">or copy and paste this link on your browser</span><br /><a href="${serverIP}/user/verify?token=${token}" alt="activation link" style="font-size:10px;">${serverIP}/user/verify?token=${token}</a>`;


    // Configure Mail Options (E.g sender, subject, message, etc.)
    let mailOptions = {
        from: `Samuel Akinola Foundation <${mailServiceUser}>`,
        to: user.email,
        subject: 'Account Activation',
        text: `Hello ${user.firstName} ${user.lastName}, \nThank you for registering with us at www.samuelakinolafoundation.com \nWe are more than just a foundation. \nPlease verify your account by clicking the link below to have a personalized experience. \n\n\n ${verificationLink} \n${activationLink}`,
        html: `<strong>Hello ${user.firstName} ${user.lastName}</strong>, <br /><br />Thank you for registering with us at ${siteURL}. <br /><br />We are more than just a charity organization. <br /><br />Please verify your account by clicking the link below to have a personalized experience. <br /><br /><div className="mailer-wrapper">${verificationLink}</div> <br />${activationLink}<br /><br /><br />`,
    };

    
    // Attempt to send email with retry logic
    let retryAttempts = 0;  // Track number of retry attempts
    const maxRetries = 100;   // Maximum number of retry attempts before giving up


    // Implement retry logic here to attempt resending
    function attemptSend() {
        // Attempt to send email
        transporter.sendMail(mailOptions, (error, mail) => {
            if (error) {
                console.log('Error sending User mail with token for Verification:', error.message);

                if (retryAttempts < maxRetries) {
                    retryAttempts++;
                    console.log(`Retrying... Attempt ${retryAttempts} of ${maxRetries}`);

                    setTimeout(attemptSend, 10000); // Retry after 15 seconds
                } else {
                    console.log(`Max retries (${maxRetries}) exceeded. Could not send verification email to User.`);
                };
            } else {
                console.log("E-mail Service Details:", mail.envelope,
                    `\nE-mail Sent successfully:: ${mail.response}`,
                "\n\n******************************************************************************************\n");
            };
        });
    };
    attemptSend();
    // ***************************************************************//
    // E-mail Service Config
    // ***************************************************************//

};

module.exports = mailSenderForGetSignUp;

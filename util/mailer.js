const mailer = require('nodemailer')

let transporter;

function initMailer(email, password) {
    transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });
}



async function sendMail(sender, receiver, otp, onSuccess, onErr) {
    const mailOptions = {
        from: sender,
        to: `${receiver}`,
        subjet: "Sending Email using Node.js",
        text: `Your OTP is; ${otp} `
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return onErr(error)
        onSuccess(info)
    })
}


module.exports = { initMailer, sendMail };
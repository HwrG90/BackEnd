const { createTransport } = require(`nodemailer`);

const EMAIL = 'test.testl81@ethereal.email'
const PASS = 'xEXPWptQHMJdHdE9Ur'

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: EMAIL,
        pass: PASS
    }
});

const sendEmail = async (options) => {
    try {
        const response = await transporter.sendMail(options);
        console.log(response);

    } catch (e) {
        console.error(e);
    }
}

module.exports = sendEmail;
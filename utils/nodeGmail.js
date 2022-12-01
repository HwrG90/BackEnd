const { createTransport } = require(`nodemailer`);
const log4js = require('./log');
const loggerConsole = log4js.getLogger('default');
const loggerArchiveError = log4js.getLogger(`errorArchive`);
require('dotenv').config()

const EMAIL = process.env.EMAIL //'brionna.daniel81@ethereal.email'
const PASS = process.env.PASS // 'xEXPWptQHMJdHdE9Ur'

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
        loggerConsole.info(response);

    } catch (e) {
        loggerArchiveError.error(e);
    }
}

module.exports = sendEmail;
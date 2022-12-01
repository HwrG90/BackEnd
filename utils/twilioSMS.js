const twilio = require(`twilio`);
const log4js = require('./log');
const loggerConsole = log4js.getLogger('default');
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const mensajesSMS = async (body, from, to) => {
    try {
        const menssage = await client.messages.create({
            body: body,
            from: from,
            to: to,
        });
        loggerConsole.info(menssage);
    } catch (err) {
        return res.status(404).json({
            error: `Error al enviar el mensaje ${err}`
        });
    }
}
module.exports = mensajesSMS;
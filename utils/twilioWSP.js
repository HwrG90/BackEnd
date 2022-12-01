const twilio = require(`twilio`);
const log4js = require('./log');
const loggerConsole = log4js.getLogger('default');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendWhatsApp = async (body, from, to) => {
    try {
        const message = await client.messages.create({
            body: body,
            from: from,
            to: to
        })
        loggerConsole.info(message);

    } catch (err) {
        return res.status(404).json({
            error: `Error al enviarme el mensaje de WhatsApp ${err}`
        });
    }

}

module.exports = sendWhatsApp;
const { setup } = require("../services/mailersetup");

exports.sendmail = async (req, res, next) => {
    try {
        const { clientEmail, message, clientName } = await req.body;
        if (clientEmail == null || message == null || clientName==null ) {
            res.status(500).json({
                message: 'Internal server error',
            });
        } else {
            const send = await setup(message, clientEmail, clientName);
            res.status(200).json({
                message: message,
                email: clientEmail,
                nameOfTheClient: clientName
            });
            return send;
        }
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
    
}
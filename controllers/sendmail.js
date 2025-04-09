const { setup } = require("../services/mailersetup");

exports.sendmail = async (req, res, next) => {
    try {
        const { clientEmail, message } = await req.body;
        const send = setup(message, clientEmail);
        if (send) {
            res.status(200).json({
                message: message,
                email: clientEmail
            });
        }
    } catch (e) {
        res.status(500).json({
            message: 'Internal server error'
        })
    }
    
}
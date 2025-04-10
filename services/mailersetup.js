var mailer = require('nodemailer');

const cred = (message, clientEmail, clientName) => {
    const mailData = {
        from: clientEmail, 
        to: 'kurosawataki84@gmail.com',
        subject: `Service inquiry from: ${clientEmail}`,
        text: message,
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8"> 
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Service Inquiry</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="border: 1px solid #e0e0e0; border-radius: 5px; overflow: hidden;">
                <!-- Header -->
                <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
                <h2 style="margin: 0; color: #444;">Service Inquiry</h2>
                </div>
                <!-- Content -->
                <div style="padding: 20px; background-color: #ffffff;">
                <b>Hey there! </b><br>
                <b>From: ${clientName} </b>
                <p>${message}</p>
                <br>Best Regards, <br> ${clientName}
                </div>
                <!-- Footer -->
                <div style="text-align: center; padding: 15px; font-size: 12px; color: #666; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
                <p style="margin: 5px 0;">This email was sent as an inquiry for freelance services.</p>
                </div>
            </div>
            </body>
            </html>`,
        };
        return mailData;
}


const credToClient = (message, clientEmail, clientName) => {
    return {
        from: 'kurosawataki84@gmail.com',
        to: clientEmail,
        subject: 'Thank You for Your Inquiry',
        text: `Dear ${clientName},\n\nThank you for your inquiry! I've received your message and will get back to you soon.\n\nYour message: ${message}\n\nBest regards,\n[Your Name]`,
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Inquiry Received</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="border: 1px solid #e0e0e0; border-radius: 5px; overflow: hidden;">
                    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-bottom: 1px solid #e0e0e0;">
                        <h2 style="margin: 0; color: #444;">Inquiry Received</h2>
                    </div>
                    <div style="padding: 20px; background-color: #ffffff;">
                        <p>Dear ${clientName},</p>
                        <p>Thank you for reaching out! I've received your inquiry and will respond to you soon.</p>
                        <p><strong>Your message:</strong><br>${message}</p>
                        <p>Best regards,<br>Tian.dev</p>
                    </div>
                </div>
            </body>
            </html>`
    };
};

const setup = (message, clientEmail, clientName) => {
    const transporter = mailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        secure: true
    });

    transporter.sendMail(cred(message, clientEmail, clientName), (error, info) => { 
        if (error) {
            console.log(error);
        } else {
            console.log('message sent successfully');
            
        }
    });
    transporter.sendMail(credToClient(message, clientEmail, clientName), (error, info) => {
        if (error) {
            console.log('Error sending to client:', error);
        } else {
            console.log('Confirmation sent to client successfully');
        }
    });
}

module.exports = { setup };
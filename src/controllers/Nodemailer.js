const nodemailer = require('nodemailer');

module.exports = class ContactMailer {
    async sendMail(req, res) {
        try {
            const transport = nodemailer.createTransport({
                service: 'Hotmail',
                auth: {
                    user: String(process.env.SENDER),
                    pass: String(process.env.SENDER_PASSWORD)
                },
            });
    
            const { email, subject, message, lang } = req.body;
    
            const emailDetails = {
                from: String(process.env.SENDER),
                to: `Contact JVC <${String(process.env.SENDER)}>, You <${email}>`,
                cc: `João Vitor Casarin <${String(process.env.CC)}>`,
                subject: subject,
                html: `<h3>***PLEASE, DO NOT REPLY THIS E-MAIL***</h3><br><br>
                
                <b>Hey there, how are you doing? I hope everything's good!

                I have just received your message, and as soon as possible I'll be writing you back!
                
                Thanks!<br><br>

                Your message:</b></br>
                
                ------------------------------------------------------------------------------------------------------------<br><br>
                
                ${message}`,
            }
    
            await transport.sendMail(emailDetails);
        
            return res.send({ message: 'Success' });
        } catch(e) {
            return res.send({ error: e.message });
        }
    }
}
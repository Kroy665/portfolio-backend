const mailer_helper = async (props)=>{
    var nodemailer = require('nodemailer');
    return new Promise((resolve, reject)=>{
        var transporter = nodemailer.createTransport({
            service:'hotmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            },
        });
    
        var mailOptions = {
            from: process.env.EMAIL_ID,
            to: 'kroy963@gmail.com',
            subject: `${props.email},${props.name} send a message from your Portfolio...`,
            text: `Message: ${props.message}`
        };
    
        try {
            transporter.sendMail(mailOptions, function(error, info){
                console.log("info-1:",info);
                resolve(info.response);
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
    
}

module.exports=mailer_helper

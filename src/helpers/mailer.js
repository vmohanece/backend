import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

async function sendEmail(name, email, code, type) {
  try {
    const smtpEndpoint = "smtp.gmail.com";

    const port = 465;

    const senderAddress = "UITOUX Solution";

    var toAddress = email;

    const smtpUsername = process.env.EMAIL_ADDRESS;

    const smtpPassword = process.env.SG_APIKEY;
    if(type == "ResetPassword") {
      var subject = "Password Reset";
      // The body of the email for recipients
      var body_html = `<!DOCTYPE html>
      <html>
      <body>
      
      <p>Dear ${name},</p>
      
      <p>We received your request to change your account password.</p>
      
      <P>To reset your password , use the code to activate account ${code} or <a href="${process.env.HOST}:${process.env.PORT}/users/reset?email=${email}&code=${code}">please click here</a></p>
      
      <p>If you did not make this request and are concerned about the security of your account,</p><p>please contact our Customer Support : customercare@uitouxsolutions.com</p>
      
      <br>
      <p><strong>Cheers</strong></p>
      <p><strong>Support</strong></p>
      
      </body>
      </html>
      `;
    }
    else{
      var subject = "Welcome to UITOUX!";
      // The body of the email for recipients
      var body_html = `<!DOCTYPE html>
      <html>
      <body>
      
      <p>Dear ${name},</p>
      
      <p>Thank you for signing up with us. Our team here is glad to have you as our customer.</p>
              
      <p>You are all set to use the app for managing customers.</p>
      <P>To confirm your email, use the code to activate account ${code} or <a href="${process.env.HOST}:${process.env.PORT}/users/activate?email=${email}&code=${code}">please click here</a></p>
      <p>If anything we can do to help, please contact our Customer Support : customercare@uitouxsolutions.com</p>
             
      <br>
      <p><strong>Cheers</strong></p>
      <p><strong>Support Team</strong></p>
      
      </body>
      </html>`;
    }
    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    // Specify the fields in the email.
    let mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
      html: body_html,
    };

    let info = await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}

export default sendEmail;
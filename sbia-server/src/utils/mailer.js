import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "smtp5150@gmail.com",
        pass: "abbjqhogghqypthl",
      },
});

export const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: `"SBIA" <smpt4861@gmail.com>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <h2>Your OTP Code</h2>
      <p><b>${otp}</b> is your verification code.</p>
      <p>It expires in 10 minutes.</p>
    `,
  };

  return mailer.sendMail(mailOptions);
};
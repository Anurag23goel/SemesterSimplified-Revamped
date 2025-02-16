import nodemailer from "nodemailer";

export async function sendOtpEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // ✅ Corrected 'password' to 'pass'
    },
  });

  const mailOptions = {
    // ✅ Fixed object assignment
    from: "Semesters Simplified <no-reply@semestersimplified.com>", // ✅ Added sender email
    to: email,
    subject: "OTP VERIFICATION",
    text: `Your OTP is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
    return true;
  } catch (error:any) {
    console.error("Error sending OTP email:", error);
  }
}

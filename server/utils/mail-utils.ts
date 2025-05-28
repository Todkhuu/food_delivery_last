import nodemailer from "nodemailer";

export const sendEmail = async (email: string, token: string) => {
  const mailSecret = process.env.EMAIL_PASS;
  const mail = process.env.EMAIL_USER;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: mail,
      pass: mailSecret,
    },
  });

  const mailOption = {
    from: "Nom nom foods",
    to: email,
    subject: "Reset your password",
    html: `<div
  style="
    width: 400px;
    height: 250px;
    background-color: #404040;
    border: 1px;
    border: black;
    border-radius: 12px;
    padding: 32px;
    color: white;
  "
>
  <h1 style="border-bottom: black; border-bottom: 1px; padding-bottom: 12px">
    Reset Your Password
  </h1>
  <p style="margin-top: 12px; font-size: 14px">
    Need to reset your password? No problem! Just click the button below and
    you'll be on your way. If you did not make this request, please ignore this
    email
  </p>
  <a href="http://localhost:3000/reset-password?id=${token}">
  <button
    style="
      background-color: blue;
      padding-top: 16px;
      padding-bottom: 16px;
      width: 100%;
      margin-top: 20px;
      border-radius: 8px;
    "
  >
    Reset your password
  </button>
  </a>
</div>`,
  };
  await transporter.sendMail(mailOption);
};

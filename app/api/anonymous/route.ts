import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  const { email, id, type } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  let mailOptions: Mail.Options;

  if (type == "Received") {
    mailOptions = {
      from: "cics.chronicles@gmail.com",
      to: "cics.chronicles@gmail.com",
      cc: email,
      subject: `[ANONYMOUS MESSAGE] Pioneer-${id} New Submission`,
      html: `<p>Your message has been received! We will notify you when we have an update.<br>Here is your submission ID for future reference: <strong>Pioneer-${id}</strong></p>`,
    };
  } else if (type == "UserReply") {
    mailOptions = {
      from: "cics.chronicles@gmail.com",
      to: "cics.chronicles@gmail.com",
      subject: `[ANONYMOUS MESSAGE] Pioneer-${id} Submission Reply`,
      html: `<p>User has replied to your message.</p>`,
    };
  } else if (type == "UserSend") {
    mailOptions = {
      from: "cics.chronicles@gmail.com",
      to: "cics.chronicles@gmail.com",
      subject: `[ANONYMOUS MESSAGE] Pioneer-${id} New Submission`,
      html: `<p>A new submission has been sent</p>`,
    };
  } else {
    mailOptions = {
      from: "cics.chronicles@gmail.com",
      to: email,
      subject: `[ANONYMOUS MESSAGE] Pioneer-${id} Submission Update`,
      html: `<p>Your message has received a reply! Here is your submission ID for future reference: <strong>Pioneer-${id}</strong></p>`,
    };
  }

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

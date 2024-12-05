import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { validateEmail } from './zod/validateEmail'
import { prisma } from './lib/client'
import subscriber from './lib/redis'

dotenv.config()

const app = express();
app.use(cors())


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587, // Use true for port 465, false for all other ports
  secure: false,
  auth: {
    user: "810796001@smtp-brevo.com",
    pass: "dIZt72hX0cnTYKzL",
  },
});



const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const subscribeToChannel = async() => {
  await subscriber.subscribe('send-mail');
  subscriber.on('message', async(channel, data) => {
    console.log('message recieved')
      if(channel === 'send-mail'){
          console.log('event recieved...')
          const message = JSON.parse(data)
          const emailValidate = validateEmail.safeParse(message);
          if(!emailValidate.success) return;
          const {email} = emailValidate.data
          const expiresAt = new Date();
          expiresAt.setMinutes(expiresAt.getMinutes() + 10);
          const otp = generateOTP()
          await prisma.authenticator.upsert({
            where: { email }, // Unique field to identify the record
            update: {
              otp,
              expiresAt,
            },
            create: {
              email,
              otp,
              expiresAt,
            },
          });
          await transporter.sendMail({
            from: "app.tlrs@gmail.com", // sender address
            to: `${email}`, // recipient email address
            subject: "Your OTP for Tlrs Email Verification", // Subject line
            html: `
              <p>Hello User,</p>
              <p>Your One-Time Password (OTP) for verifying your email address is:</p>
              <h2 style="color: #2c3e50; text-align: center;">${otp}</h2>
              <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
              <p>If you didn’t request this verification, you can ignore this email.</p>
              <p>Thanks,</p>
              <p>Your Tlrs Team</p>
            `, // HTML body
          });
          
      }
  })

}

subscribeToChannel().catch(console.error)




app.use(express.json());

app.listen(process.env.PORT ?? 3002)
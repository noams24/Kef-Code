'use server'
import nodemailer from "nodemailer"

type contactDataProps = {
    name: string,
    email: string,
    content: string
}

export async function submitContactData (data:contactDataProps) {

    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Message from ${data.name}`,
        text: `sent from ${data.email}\n \n ${data.content}`
    }
    await transporter.sendMail(mailOptions)
}

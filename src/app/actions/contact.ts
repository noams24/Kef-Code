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
        from: data.email,
        to: process.env.EMAIL_USER,
        subject: `Message from ${data.name}`,
        text: data.content
    }
    await transporter.sendMail(mailOptions)
}

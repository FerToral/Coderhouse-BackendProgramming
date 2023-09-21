import nodemailer from 'nodemailer';

export const sendEmailTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
    },
});
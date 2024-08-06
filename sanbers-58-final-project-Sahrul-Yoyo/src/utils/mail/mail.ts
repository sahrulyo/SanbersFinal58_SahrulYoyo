import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { ZOHO_MAIL_USER, ZOHO_MAIL_PASS } from '../env'

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: ZOHO_MAIL_USER,
      pass: ZOHO_MAIL_PASS,
    },
  });
  
  const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    const mailOptions = {
      from: ZOHO_MAIL_USER,
      to,
      subject,
      text,
      html,
    };
  
    try {
      return await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
  
  export const sendOrderInvoiceEmail = async (to: string, order: any) => {
    const templatePath = path.resolve(__dirname, 'templates', 'invoice.ejs');
    try {
      const html = await ejs.renderFile(templatePath, { order });
      await sendEmail(to, 'Your Order Invoice', 'Thank you for your order!', html);
    } catch (error) {
      console.error('Error sending order invoice email:', error);
      throw error;
    }
  };
  
  export const sendRegisterSuccessEmail = async (to: string, name: string) => {
    const templatePath = path.resolve(__dirname, 'templates', 'register-success.ejs');
    try {
      const html = await ejs.renderFile(templatePath, { name });
      await sendEmail(to, 'Registration Successful', 'Welcome to our service!', html);
    } catch (error) {
      console.error('Error sending registration success email:', error);
      throw error;
    }
  };
  
  export default sendEmail;
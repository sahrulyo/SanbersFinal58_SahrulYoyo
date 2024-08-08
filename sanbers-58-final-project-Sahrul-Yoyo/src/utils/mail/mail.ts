import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: "Zoho",
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: "yoyo.ptr@zohomail.com",
    pass: "Ulyasar10389&", 
  },
  requireTLS: true,
});

const sendEmail = async ({
  to,
  subject,
  content,
}: {
  to: string | string[];
  subject: string;
  content: string;
}) => { 
  const result = await transporter.sendMail({
    from: "yoyo.ptr@zohomail.com",
    to,
    subject,
    html: content,
  }); 
  console.log("Send Email to", to);
  return result;
};

const render = async (template: string, data: any) => {
  console.log("Rendering template with data:", data); 
  try {
    const content = await ejs.renderFile(
      path.join(__dirname, `./templates/${template}`),
      data
    );
    return content as string;
  } catch (error) {
    console.error("Error rendering template:", error);
    throw error;
  }
};

const sendOrderConfirmationEmail = async (orderData: any) => {
  try {
    const content = await render('invoice.ejs', orderData);
    await sendEmail({
      to: orderData.customerEmail,
      subject: 'Order Confirmation',
      content,
    });
    console.log("Order confirmation email sent to", orderData.customerEmail);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

export default {
  sendEmail,
  render,
  sendOrderConfirmationEmail,
};

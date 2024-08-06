declare const sendEmail: (to: string, subject: string, text: string, html: string) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export declare const sendOrderInvoiceEmail: (to: string, order: any) => Promise<void>;
export declare const sendRegisterSuccessEmail: (to: string, name: string) => Promise<void>;
export default sendEmail;
//# sourceMappingURL=mail.d.ts.map
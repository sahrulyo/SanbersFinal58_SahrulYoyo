declare const _default: {
    sendEmail: ({ to, subject, content, }: {
        to: string | string[];
        subject: string;
        content: string;
    }) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    render: (template: string, data: any) => Promise<string>;
    sendOrderConfirmationEmail: (orderData: any) => Promise<void>;
};
export default _default;
//# sourceMappingURL=mail.d.ts.map
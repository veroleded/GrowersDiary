import nodemailer from 'nodemailer';

class MailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      port: process.env.SMTP_PORT as unknown as number,
      host: process.env.SMTP_HOST,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: '',
      html: 
      `
        <div>
          <h1>Активация профиля</h1>
          <p>
            Для активации перейдите по <a href="${link}">ссылке</a>
          </p>
        </div>
      `
    })
  }
}

export default new MailService();

import nodemailer from 'nodemailer';

import { Env } from '@/libs/Env';

const transport = Env.SMTP_HOST && Env.SMTP_USER && Env.SMTP_PASSWORD
  ? {
      host: Env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: Env.SMTP_USER,
        pass: Env.SMTP_PASSWORD,
      },
    }
  : {
      port: 1025,
      tls: {
        rejectUnauthorized: false,
      },
    };

export const mailer = nodemailer.createTransport(transport);

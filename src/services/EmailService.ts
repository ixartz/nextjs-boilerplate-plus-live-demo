import type { EmailTemplate } from '@/types/Email';
import { createElement } from 'react';
import { render, toPlainText } from 'react-email';
import { Env } from '@/libs/Env';
import { mailer } from '@/libs/Mailer';
import { AppConfig } from '@/utils/AppConfig';

export async function sendEmail<P extends object>(
  to: string,
  email: {
    Template: EmailTemplate<P>;
    props: P;
  },
) {
  const element = createElement(email.Template, email.props);
  const html = await render(element);
  const subject = await email.Template.Subject(email.props);

  if (Env.EMAIL_SENDING_ENABLED) {
    await mailer.sendMail({
      from: {
        name: AppConfig.email.senderInfo.name,
        address: AppConfig.email.senderInfo.address,
      },
      to,
      subject,
      html,
      text: toPlainText(html),
    });
  }
}

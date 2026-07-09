import { createTranslator } from 'next-intl';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from 'react-email';
import { AppConfig } from '@/utils/AppConfig';

type VerifyNewEmailOtpEmailProps = {
  code: string;
  locale: string;
};

const VerifyNewEmailOtpEmail = async (props: VerifyNewEmailOtpEmailProps) => {
  const messages = (await import(`../../locales/emails/${props.locale}.json`)).default;

  const t = createTranslator({
    locale: props.locale,
    messages,
    namespace: 'VerifyNewEmailOtpEmail',
  });

  return (
    <Html lang={props.locale}>
      <Head />
      <Preview>{t('preview')}</Preview>
      <Tailwind>
        <Body className="bg-zinc-50 p-6 font-sans leading-7 text-zinc-900">
          <Container className="
            mx-auto my-6 w-lg border border-zinc-200 bg-white p-6
          "
          >
            <Heading as="h2" className="my-0 font-semibold">
              {AppConfig.name}
            </Heading>

            <Text className="mt-1 font-medium">{t('subheading')}</Text>

            <Text>{t('instructions')}</Text>

            <Text className="
              bg-zinc-50 px-5 py-4 text-center font-mono text-2xl font-semibold
              tracking-wider tabular-nums
            "
            >
              {props.code}
            </Text>

            <Text className="text-xs">
              {t('expires_in', { minutes: AppConfig.auth.OTPExpiresInMinutes })}
            </Text>

            <Hr />

            <Text className="mb-0 text-xs text-zinc-500">{t('security_notice')}</Text>
            <Text className="mt-2 text-xs text-zinc-500">{t('ignore_notice')}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerifyNewEmailOtpEmail.Subject = async (props: VerifyNewEmailOtpEmailProps) => {
  const messages = (await import(`../../locales/emails/${props.locale}.json`)).default;

  const t = createTranslator({
    locale: props.locale,
    messages,
    namespace: 'VerifyNewEmailOtpEmail',
  });

  return t('subject');
};

VerifyNewEmailOtpEmail.PreviewProps = {
  code: 'C4IIGU',
  locale: 'en',
};

export default VerifyNewEmailOtpEmail;

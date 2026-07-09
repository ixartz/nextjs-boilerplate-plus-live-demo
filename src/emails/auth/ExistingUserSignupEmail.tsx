import { createTranslator } from 'next-intl';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from 'react-email';
import { AppConfig } from '@/utils/AppConfig';

type ExistingUserSignupEmailProps = {
  url: string;
  locale: string;
};

const ExistingUserSignupEmail = async (props: ExistingUserSignupEmailProps) => {
  const messages = (await import(`../../locales/emails/${props.locale}.json`)).default;

  const t = createTranslator({
    locale: props.locale,
    messages,
    namespace: 'ExistingUserSignupEmail',
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

            <Section className="text-center">
              <Button
                href={props.url}
                className="rounded-sm bg-black px-4 py-3 text-white"
              >
                {t('button_label')}
              </Button>
            </Section>

            <Text className="text-xs">
              {t.rich('link_fallback', {
                link: chunks => <Link href={props.url}>{chunks}</Link>,
              })}
            </Text>

            <Text className="text-xs">{t('reset_notice')}</Text>

            <Hr />

            <Text className="mb-0 text-xs text-zinc-500">{t('ignore_notice')}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ExistingUserSignupEmail.Subject = async (props: ExistingUserSignupEmailProps) => {
  const messages = (await import(`../../locales/emails/${props.locale}.json`)).default;

  const t = createTranslator({
    locale: props.locale,
    messages,
    namespace: 'ExistingUserSignupEmail',
  });

  return t('subject');
};

ExistingUserSignupEmail.PreviewProps = {
  url: 'http://localhost:3000/sign-in',
  locale: 'en',
};

export default ExistingUserSignupEmail;

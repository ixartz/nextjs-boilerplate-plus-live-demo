import { CirclePlus } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { AddTodoForm } from '@/features/todo/AddTodoForm';
import { requireAuth } from '@/utils/Auth';

export default async function AddTodoPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'AddTodoPage',
  });

  await requireAuth();

  return (
    <>
      <DashboardHeader
        icon={<CirclePlus />}
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <DashboardSection>
        <AddTodoForm />
      </DashboardSection>
    </>
  );
};

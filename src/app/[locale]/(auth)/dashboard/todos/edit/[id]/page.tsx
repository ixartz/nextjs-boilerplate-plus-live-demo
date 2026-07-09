import { Pencil } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { DashboardSection } from '@/features/dashboard/DashboardSection';
import { EditTodoForm } from '@/features/todo/EditTodoForm';
import { getTodo } from '@/services/TodoService';
import { requireAuth } from '@/utils/Auth';
import { TodoIdValidation } from '@/validations/TodoValidation';

export default async function EditTodoPage(props: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'EditTodoPage',
  });

  const session = await requireAuth();

  const todoIdResult = TodoIdValidation.safeParse(id);
  if (!todoIdResult.success) {
    redirect('/dashboard/todos');
  }

  const todo = await getTodo(todoIdResult.data, session.user.id);

  if (!todo) {
    redirect('/dashboard/todos');
  }

  return (
    <>
      <DashboardHeader
        icon={<Pencil />}
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <DashboardSection>
        <EditTodoForm todo={todo} />
      </DashboardSection>
    </>
  );
};

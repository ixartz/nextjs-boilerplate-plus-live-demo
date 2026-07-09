import { Plus, SquareCheckBig } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/features/dashboard/DashboardHeader';
import { TodoTable } from '@/features/todo/TodoTable';
import { Link } from '@/libs/I18nNavigation';

export default async function TodoListPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'TodoListPage',
  });

  return (
    <>
      <DashboardHeader
        icon={<SquareCheckBig />}
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="flex justify-end">
        <Link href="/dashboard/todos/add">
          <Button size="sm">
            <Plus />
            <span>{t('add_todo_button')}</span>
          </Button>
        </Link>
      </div>

      <div className="mt-5">
        <TodoTable />
      </div>
    </>
  );
};

'use client';

import type { SubmitHandler } from 'react-hook-form';
import type * as z from 'zod';
import type { TodoValidation } from '@/validations/TodoValidation';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useRouter } from '@/libs/I18nNavigation';
import { client } from '@/libs/Orpc';
import { TodoForm } from './TodoForm';

export const AddTodoForm = () => {
  const t = useTranslations('AddTodoForm');
  const router = useRouter();

  const onValid: SubmitHandler<z.infer<typeof TodoValidation>> = async (data) => {
    await client.todo.create(data);

    toast.success(t('success_toast'));
    router.push('/dashboard/todos');
    router.refresh();
  };

  return <TodoForm submitLabel={t('submit_button')} onSubmit={onValid} />;
};

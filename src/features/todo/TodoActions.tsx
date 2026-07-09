import type { Todo } from '@/types/Todo';
import { Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, useRouter } from '@/libs/I18nNavigation';
import { client } from '@/libs/Orpc';

export const TodoActions = (props: { todo: Todo; trigger: React.ReactNode }) => {
  const t = useTranslations('TodoActions');
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props.trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/todos/edit/${props.todo.id}`}>
            <Pencil />
            {t('edit_action_label')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive"
          onClick={async () => {
            await client.todo.remove({
              id: props.todo.id,
            });

            toast.success(t('delete_todo_success_toast'));
            router.refresh();
          }}
        >
          <Trash2 />
          {t('delete_action_label')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

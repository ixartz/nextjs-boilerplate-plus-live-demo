'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Todo } from '@/types/Todo';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Clock } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { TodoActions } from './TodoActions';

export const TodoTableColumns = (props: {
  data: Todo[];
}) => {
  const t = useTranslations('TodoTableColumns');
  const format = useFormatter();

  const columns: ColumnDef<Todo, string>[] = [
    {
      header: t('title_header'),
      accessorKey: 'title',
      meta: { className: 'font-bold' },
    },
    {
      header: t('message_header'),
      accessorKey: 'message',
      meta: { className: 'text-muted-foreground' },
    },
    {
      header: t('created_at_header'),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="size-4" />
          <span>
            {format.dateTime(row.original.createdAt, {
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </span>
        </div>
      ),
      meta: { className: 'text-muted-foreground' },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <TodoActions
            todo={row.original}
            trigger={(
              <Button variant="ghost">
                <span className="sr-only">{t('open_menu')}</span>
                <DotsHorizontalIcon />
              </Button>
            )}
          />
        );
      },
      meta: { className: 'w-20' },
    },
  ];

  return <DataTable columns={columns} data={props.data} />;
};

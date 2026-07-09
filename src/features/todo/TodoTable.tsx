import { getTodoList } from '@/services/TodoService';
import { requireAuth } from '@/utils/Auth';
import { TodoTableColumns } from './TodoTableColumns';

export const TodoTable = async () => {
  const session = await requireAuth();
  const data = await getTodoList(session.user.id);

  return (
    <TodoTableColumns data={data} />
  );
};

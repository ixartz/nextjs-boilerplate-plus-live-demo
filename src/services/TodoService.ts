import type { EditTodoInput, TodoInput } from '@/validations/TodoValidation';
import { and, asc, eq } from 'drizzle-orm';
import { db } from '@/libs/DB';
import { todoSchema } from '@/models/Schema';

export const getTodoList = (userId: string) => {
  return db.query.todoSchema.findMany({
    where: eq(todoSchema.userId, userId),
    columns: {
      id: true,
      title: true,
      message: true,
      createdAt: true,
    },
    orderBy: asc(todoSchema.createdAt),
  });
};

export const createTodo = (todo: TodoInput, userId: string) => {
  return db
    .insert(todoSchema)
    .values({ ...todo, userId })
    .returning();
};

export const getTodo = (todoId: number, userId: string) => {
  return db.query.todoSchema.findFirst({
    where: and(eq(todoSchema.id, todoId), eq(todoSchema.userId, userId)),
    columns: {
      id: true,
      title: true,
      message: true,
    },
  });
};

export const updateTodo = (todo: EditTodoInput, userId: string) => {
  return db
    .update(todoSchema)
    // Only update mutable fields, never attempt to update the primary key and owner.
    .set({ title: todo.title, message: todo.message })
    .where(and(eq(todoSchema.id, todo.id), eq(todoSchema.userId, userId)))
    .returning();
};

export const deleteTodo = (todoId: number, userId: string) => {
  return db
    .delete(todoSchema)
    .where(and(eq(todoSchema.id, todoId), eq(todoSchema.userId, userId)))
    .returning();
};

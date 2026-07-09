import { logger } from '@/libs/Logger';
import { createTodo, deleteTodo, updateTodo } from '@/services/TodoService';
import { API_ERROR } from '@/types/ApiError';
import { DeleteTodoValidation, EditTodoValidation, TodoValidation } from '@/validations/TodoValidation';
import { authProcedure } from './Procedure';

export const create = authProcedure(true)
  .input(TodoValidation)
  .handler(async ({ context, input }) => {
    const todo = await createTodo(input, context.auth.session.user.id);

    logger.info('A new todo has been created');

    return {
      id: todo[0]?.id,
    };
  });

export const edit = authProcedure(true)
  .input(EditTodoValidation)
  .errors({
    [API_ERROR.NOT_FOUND]: {},
  })
  .handler(async ({ context, input, errors }) => {
    const result = await updateTodo(input, context.auth.session.user.id);

    if (result.length === 0) {
      throw errors.NOT_FOUND();
    }

    logger.info('A todo has been updated');

    return {};
  });

export const remove = authProcedure(true)
  .input(DeleteTodoValidation)
  .errors({
    [API_ERROR.NOT_FOUND]: {},
  })
  .handler(async ({ context, input, errors }) => {
    const result = await deleteTodo(input.id, context.auth.session.user.id);

    if (result.length === 0) {
      throw errors.NOT_FOUND();
    }

    logger.info('A todo entry has been deleted');

    return {};
  });

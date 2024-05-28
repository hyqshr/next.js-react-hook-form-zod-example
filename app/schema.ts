import { z } from 'zod';

export const todoSchema = z.object({
  id: z.number(),
  todo: z.string().min(5),
  completed: z.boolean(),
  userId: z.number(),
});

export const addTodoSchema = todoSchema.omit({ id: true });

export const todosResponseSchema = z.object({
  todos: z.array(todoSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type Todo = z.infer<typeof todoSchema>;
export type AddTodo = z.infer<typeof addTodoSchema>;
export type TodosResponse = z.infer<typeof todosResponseSchema>;

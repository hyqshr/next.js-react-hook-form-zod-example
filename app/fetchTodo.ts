import { TodosResponse, todosResponseSchema } from "./schema";

export const API_URL = 'https://dummyjson.com/todos'

export const fetchTodos = async (): Promise<TodosResponse> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const result = todosResponseSchema.safeParse(data);
        if (!result.success) {
            throw new Error('Validation failed');
        }
        return result.data;
    } catch (error) {
        throw new Error(`Failed to fetch and validate todos data: ${(error as Error).message}`);
    }
};
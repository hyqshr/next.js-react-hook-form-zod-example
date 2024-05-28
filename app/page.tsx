import Image from "next/image";
import { fetchTodos } from "./fetchTodo";
import AddTodoForm from "./form";

export default async function Home() {
  const todos = await fetchTodos();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full max-w-xl">
          <h2 className="text-3xl font-semibold mb-6">Add Todo</h2>
          <AddTodoForm />
        </div>
        
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mt-4">Todo List</h1>
      </div>

      <ul className="mb-12 space-y-4 w-full max-w-xl">
        {todos.todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center p-4 bg-white rounded shadow-md dark:bg-gray-800">
            <span>{todo.todo}</span>
            <span>{todo.completed ? '✅' : '❌'}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

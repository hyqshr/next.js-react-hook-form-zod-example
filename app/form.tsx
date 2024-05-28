"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTodo, addTodoSchema } from "./schema";

const POST_URL = 'https://dummyjson.com/todos/add';

export default function AddTodoForm() {
    const [submissionStatus, setSubmissionStatus] = useState<null | 'success' | 'error'>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<AddTodo>({
        resolver: zodResolver(addTodoSchema),
    });

    const onSubmit = async (data: AddTodo) => {
        try {
            console.log("Form Data:", data); // Log form data
            const response = await fetch(POST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("Response:", result); // Log the response
            if (response.ok) {
                setSubmissionStatus('success');
                reset();
            } else {
                setSubmissionStatus('error');
            }
        } catch (error) {
            console.error("Error:", error); // Log any errors
            setSubmissionStatus('error');
        }
    };

    return (
        <div className="w-full max-w-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                <div>
                    <label className="block mb-2">
                        Todo description
                        <input {...register("todo", { required: "This field is required" })} className="text-black mt-1 block w-full border rounded p-2" />
                        {errors.todo && <span className="text-red-500 text-sm">{errors.todo.message}</span>}
                    </label>
                </div>

                <div>
                    <label className="block mb-2">
                        Completed
                        <input {...register("completed")} type="checkbox" className="text-black ml-2" />
                        {errors.completed && <span className="text-red-500 text-sm">{errors.completed.message}</span>}
                    </label>
                </div>

                <div>
                    <label className="block mb-2">
                        User ID
                        <input
                            {...register("userId", {
                                required: "This field is required",
                                valueAsNumber: true,
                            })}
                            type="number"
                            className="text-black mt-1 block w-full border rounded p-2"
                        />
                        {errors.userId && <span className="text-red-500 text-sm">{errors.userId.message}</span>}
                    </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
            </form>

            {submissionStatus === 'success' && (
                <div className="mt-4 text-green-500">
                    Todo added successfully!
                </div>
            )}
            {submissionStatus === 'error' && (
                <div className="mt-4 text-red-500">
                    Failed to add todo. Please try again.
                </div>
            )}
        </div>
    );
}

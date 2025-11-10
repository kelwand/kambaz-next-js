"use client";
import React, { useState, useEffect } from "react";
import { FormControl, FormCheck } from "react-bootstrap";
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;

  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API);
      setTodos(res.data);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const updateTodo = async (todo: any) => {
    try {
      await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to update todo");
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTodos(todos.filter((t) => t.id !== id));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to delete todo");
    }
  };

  const createTodo = async () => {
    try {
      const res = await axios.post(API, { title: "New Todo", completed: false });
      setTodos([...todos, res.data]);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to create todo");
    }
  };

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      {/* Display error message */}
      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}

      <button className="btn btn-success mb-2" onClick={createTodo}>
        Create New Todo
      </button>
      <hr />

      {/* Render list of todos */}
      {todos.map((todo) => (
        <div key={todo.id} className="mb-3 p-2 border">
          <FormControl
            value={todo.title}
            className="mb-1"
            onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
          />
          <FormControl
            value={todo.description || ""}
            className="mb-1"
            onChange={(e) => updateTodo({ ...todo, description: e.target.value })}
          />
          <FormCheck
            type="checkbox"
            label="Completed?"
            checked={todo.completed}
            onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
          />
          <button
            className="btn btn-danger mt-1"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

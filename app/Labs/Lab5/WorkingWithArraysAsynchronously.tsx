"use client";
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);

  const fetchTodos = async () => {
    const todosFromServer = await client.fetchTodos();
    setTodos(todosFromServer);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create a new todo via GET /create
  const createNewTodo = async () => {
    const newTodos = await client.createNewTodo();
    setTodos(newTodos);
  };

  // Post a new todo via POST
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({ title: "New Posted Todo", completed: false });
    setTodos([...todos, newTodo]);
  };

  // Remove a todo via DELETE
  const removeTodo = async (todo: any) => {
    await client.deleteTodo(todo);
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  // Edit a todo: set editing mode
  const editTodo = (todo: any) => {
    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, editing: true } : t)));
  };

  // Update a todo via PUT
  const updateTodo = async (todo: any) => {
    await client.updateTodo(todo);
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          title="Create New Todo"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          title="Post New Todo"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id} className="d-flex align-items-center">
            {/* Pencil icon to enter editing mode */}
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary me-2"
              style={{ cursor: "pointer" }}
            />

            {/* Checkbox to toggle completed */}
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.completed}
              onChange={(e) => updateTodo({ ...todo, completed: e.target.checked })}
            />

            {/* Title or editable input */}
            {!todo.editing ? (
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) => updateTodo({ ...todo, title: e.target.value })}
              />
            )}

            {/* Trash icon to delete todo */}
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger ms-auto"
              style={{ cursor: "pointer" }}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}

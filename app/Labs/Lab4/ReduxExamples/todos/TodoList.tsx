"use client";

import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import type { RootState } from "../../store"; 

interface Todo {
  id: string;
  title: string;
}

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todosReducer.todos) as Todo[];

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

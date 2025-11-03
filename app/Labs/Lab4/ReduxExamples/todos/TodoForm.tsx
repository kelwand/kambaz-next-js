import { FormControl, ListGroupItem, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
// import type { RootState } from "../../store"; 

interface Todo {
  id: string;
  title: string;
}

export default function TodoForm() {
  const dispatch = useDispatch();

  const todo = useSelector((state: {todosReducer: {todo: {id: string, title: string}}}) => state.todosReducer.todo) as Todo;

  return (
    <ListGroupItem>
      <Button
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
      >
        Add
      </Button>
      <Button
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
      >
        Update
      </Button>
      <FormControl
        value={todo.title}
        onChange={(e) =>
          dispatch(setTodo({ ...todo, title: e.target.value }))
        }
      />
    </ListGroupItem>
  );
}

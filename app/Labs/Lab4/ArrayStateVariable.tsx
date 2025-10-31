import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";

interface Todo {
  id: string | number;
  title: string;
}

interface TodosState {
  todos: Todo[];
}

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: { todosReducer: TodosState }) => state.todosReducer);

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}


import React, { useState, useRef, FormEvent, useEffect } from "react";
import { TodoComponent } from './components/Todo'
import "./App.css";

/*define the type for a Todo Object*/
export type Todo = {
  id: number;
  todo: string;
  isDone: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("")

  const inputRef = useRef<HTMLInputElement>(null);

  //effect to focus on the input field on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  //add a single todo to the todos array
  const handleAdd = (event: FormEvent) => {
    event.preventDefault();
    if (inputRef.current?.value.length === 0) return;
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        todo: `${inputRef.current?.value}`,
        isDone: false,
      },
    ]);
    setTodo("")
  };

  //delete todo with a given id from the array
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  //toggle the isDone property of a given todo
  const toggleDone = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>React-TypeScript To-do list</h1>
      <form onSubmit={handleAdd}>
        <input type="text" ref={inputRef} onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit">Add New</button>
      </form>
      <ul className="todos">
        {todos.map((todo, key) => (
          <TodoComponent
            key={key}
            id={todo.id}
            todo={todo.todo}
            isDone={todo.isDone}
            deleteTodo={deleteTodo}
            toggleDone={toggleDone}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
import React from "react";
import { Todo } from '../App'

/* create the prop types by merging the Todo types and other expected props from the App component */
type TodoProps = Todo & {
    deleteTodo: (id: number) => void;
    toggleDone: (id: number) => void;
};

//defining the Todo Component
export const TodoComponent = ({
    id,
    todo,
    isDone,
    deleteTodo,
    toggleDone,
}: TodoProps) => {
    return (
        <li
            className={isDone ? "todo done" : "todo"}
            onClick={() => toggleDone(id)}
        >
            <div><p>{todo}</p></div>
            <button onClick={() => deleteTodo(id)}>delete</button>
        </li>
    );
};
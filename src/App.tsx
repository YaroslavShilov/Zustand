import * as React from "react";
import "./App.css";
import { useTodoStore } from "./model/todoStore.ts";
import { useState } from "react";

function App() {
  const { list, addTodo, toggle } = useTodoStore();
  const [text, setText] = useState("");

  const toggleCheck = (id: (typeof list)[number]["id"]) => () => toggle(id);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText("");
    addTodo(text);
  };

  return (
    <div>
      <form onSubmit={formHandler}>
        <input
          type="text"
          name="task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Create task</button>
      </form>

      <ul>
        {list.map(({ id, text, isComplete }) => (
          <li key={id}>
            {text}{" "}
            <input
              type="checkbox"
              name={text}
              checked={isComplete}
              onChange={toggleCheck(id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

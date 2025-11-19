import type { StateCreator } from "zustand/vanilla";
import { create } from "zustand/react";
import { devtools } from "zustand/middleware";

type TodoItem = {
  id: number | string;
  text: string;
  isComplete: boolean;
};

type TodoStoreActions = {
  addTodo: (text: TodoItem["text"]) => void;
  toggle: (id: TodoItem["id"]) => void;
};

type TodoStoreState = {
  list: TodoItem[];
};

type TodoStore = TodoStoreActions & TodoStoreState;

const todoSlice: StateCreator<TodoStore, [["zustand/devtools", never]]> = (
  set,
  get,
) => ({
  list: [],
  addTodo: (text) => {
    set(
      {
        list: [
          ...get().list,
          {
            text,
            isComplete: false,
            id: self.crypto.randomUUID(),
          },
        ],
      },
      false,
      `addTodo: ${text}`,
    );
  },
  toggle: (id) => {
    set(
      {
        list: get().list.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isComplete: !item.isComplete,
            };
          }
          return item;
        }),
      },
      false,
      `toggle: ${id}`,
    );
  },
});

export const useTodoStore = create<TodoStore>()(devtools(todoSlice));

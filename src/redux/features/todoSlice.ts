import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TTodoPurity = "high" | "low" | "medium";
export interface ITodo {
  _id: string;
  title: string;
  purity: TTodoPurity;
  dateTime: string;
  description: string;
  isCompleted?: boolean;
}

interface TInitialState {
  todos: ITodo[];
}

const initialState: TInitialState = {
  todos: [
    {
      _id: "cz7x0tnhf8",
      title: "todo-1",
      purity: "high",
      dateTime: "2024-01-19T16:25:00.000Z",
      description: "todo-1",
      isCompleted: false,
    },
    {
      _id: "1ij2mc058if",
      title: "todo-2",
      purity: "medium",
      dateTime: "2024-01-18T17:26:00.000Z",
      description: "todo-2",
      isCompleted: false,
    },
    {
      _id: "wrtjiyw0i3d",
      title: "todo-3",
      purity: "low",
      dateTime: "2024-01-25T16:26:00.000Z",
      description: "todo-3",
      isCompleted: false,
    },
    {
      _id: "hfgeosr36oh",
      title: "todo-4",
      purity: "medium",
      dateTime: "2024-01-17T16:26:00.000Z",
      description: "todo-4",
      isCompleted: false,
    },
    {
      _id: "j6e9e4m29g",
      title: "todo-5",
      purity: "low",
      dateTime: "2024-01-09T16:27:00.000Z",
      description: "todo-5",
      isCompleted: false,
    },
  ],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      const modifiedTodo = state.todos.find(
        (todo) => todo._id === action.payload
      ) as ITodo;
      modifiedTodo!.isCompleted = !modifiedTodo?.isCompleted;

      const completedTodos = state.todos.filter((todo) => todo.isCompleted);
      const pendingTodos = state.todos.filter((todo) => !todo.isCompleted);
      state.todos = [...pendingTodos, ...completedTodos];
    },
    updateTodo: (
      state,
      action: PayloadAction<{ _id: string; todo: Partial<ITodo> }>
    ) => {
      const remainingTodos = state.todos.filter(
        (todo) => todo._id !== action.payload._id
      ) as ITodo[];
      let updatedTodo = state.todos.find(
        (todo) => todo._id === action.payload._id
      );
      updatedTodo = { ...updatedTodo, ...action.payload.todo } as ITodo;

      state.todos = [...remainingTodos, updatedTodo];
    },
    filterTodos: (state, action: PayloadAction<TTodoPurity | "">) => {
      if (!action.payload) {
        state.todos = [...state.todos];
      } else {
        state.todos = state.todos.filter(
          (todo) => todo.purity === action.payload
        );
      }
    },
  },
});

export const { addTodo, removeTodo, toggleCompleted, updateTodo, filterTodos } =
  todoSlice.actions;

export default todoSlice.reducer;

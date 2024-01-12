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
  todos: [],
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
  },
});

export const { addTodo, removeTodo, toggleCompleted, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;

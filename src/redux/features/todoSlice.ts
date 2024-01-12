import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ITodo {
  _id: string;
  title: string;
  purity: "high" | "low" | "medium";
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
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;

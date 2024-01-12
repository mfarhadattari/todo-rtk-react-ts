import { createSlice } from "@reduxjs/toolkit";

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
    addTodo: (state, action: { type: string; payload: ITodo }) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;

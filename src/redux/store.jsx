import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./slices/TodoSlice";

const store = configureStore({
  reducer: {
    todos: TodoSlice,
  },
});

export default store;

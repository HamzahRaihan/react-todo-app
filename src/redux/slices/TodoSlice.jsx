/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodo = () => {
  return async (dispatch) => {
    dispatch(setStatus("success"));
    const { data } = await axios.get(
      "https://65387f5ea543859d1bb17ede.mockapi.io/todo",
    );
    dispatch(getTodoData({ data, status: "success", isLoading: false }));
  };
};

export const addTodoList = (newData) => {
  return async (dispatch) => {
    dispatch(setStatus("success"));
    const { data } = await axios.post(
      "https://65387f5ea543859d1bb17ede.mockapi.io/todo",
      newData,
    );
    dispatch(addTodo(data));
  };
};

export const editTodoList = (id, title, isChecked) => {
  return async (dispatch) => {
    dispatch(setStatus("success"));
    const { data } = await axios.put(
      `https://65387f5ea543859d1bb17ede.mockapi.io/todo/${id}`,
      {
        id: id,
        title: title,
        isComplete: isChecked,
      },
    );
    dispatch(editTodo(data));
  };
};

export const deleteTodoList = (id) => {
  return async (dispatch) => {
    dispatch(setStatus("success"));
    await axios.delete(
      `https://65387f5ea543859d1bb17ede.mockapi.io/todo/${id}`,
    );
    dispatch(deleteTodo(id));
  };
};

const TodoSlice = createSlice({
  name: "Todo",
  initialState: {
    todos: [],
    isLoading: false,
    status: "",
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload.status;
      state.isLoading = true;
    },
    getTodoData(state, action) {
      state.todos = [...action.payload.data];
      state.isLoading = false;
      state.status = "success";
    },
    addTodo(state, action) {
      state.todos = [...state.todos, action.payload];
      state.isLoading = false;
      state.status = "success";
    },
    editTodo(state, action) {
      const index = state.todos.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.todos[index] = action.payload;
      state.isLoading = false;
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
      state.isLoading = false;
      state.status = "success";
    },
  },
});

export const { setStatus, getTodoData, editTodo, deleteTodo, addTodo } =
  TodoSlice.actions;

export default TodoSlice.reducer;

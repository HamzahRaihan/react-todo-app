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

export const addTodoCompleted = (id, isChecked) => {
  return async (dispatch) => {
    dispatch(setStatus("success"));
    const { data } = await axios.put(
      `https://65387f5ea543859d1bb17ede.mockapi.io/todo/${id}`,
      {
        id: id,
        isComplete: isChecked,
      },
    );
    dispatch(addTodoDone(data));
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

    addTodoDone(state, action) {
      const index = state.todos.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.todos[index] = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setStatus, getTodoData, addTodoDone } = TodoSlice.actions;

export default TodoSlice.reducer;

// filter todo by tab
export const filterTodos = (todos, tab) => {
  if (tab === "all") {
    return todos;
  } else if (tab === "active") {
    return todos.filter((todo) => !todo.isComplete);
  } else if (tab === "completed") {
    return todos.filter((todo) => todo.isComplete);
  } else {
    return [];
  }
};

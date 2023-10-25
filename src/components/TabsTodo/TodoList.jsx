import { useState, useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodoCompleted, getTodo } from "../../redux/slices/TodoSlice";

function TodoList() {
  const todoSelector = useSelector((state) => state.todos);
  const { todos, isLoading } = todoSelector;
  console.log("🚀 ~ file: All.jsx:8 ~ All ~ isLoading:", isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleClickCompleted = (id, isChecked) => {
    dispatch(addTodoCompleted(id, isChecked));
    console.log("🚀 ~ file: All.jsx:17 ~ handleClickCompleted ~ id:", id);
  };
  const [tab, setTab] = useState("all");

  const filterTodos = (todos, tab) => {
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

  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

  const buttons = [
    {
      name: "All",
      value: "all",
    },
    {
      name: "Active",
      value: "active",
    },
    {
      name: "Completed",
      value: "completed",
    },
  ];

  return (
    <>
      <div className="flex gap-2 text-[#fafafa]">
        {buttons.map((btn) => (
          <button
            className={`rounded-lg border-[1px] border-gray-800 px-2 py-1 transition-all hover:bg-gray-800 active:bg-gray-900 ${
              tab === btn.value && "bg-[#fafafa] text-black hover:bg-gray-200"
            }`}
            onClick={() => setTab(btn.value)}
            key={btn.value}
          >
            {btn.name}
          </button>
        ))}
      </div>
      <div>
        {isLoading ? (
          <div className="text-white">Loading</div>
        ) : (
          <div className="flex flex-col gap-2">
            {visibleTodos.map((item) => (
              <div
                className="flex justify-between rounded-lg border-[1px] border-gray-800 bg-transparent px-2 py-1 text-[#fafafa]"
                key={item.id}
              >
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-4 rounded-lg border-[1px] border-gray-800 bg-gray-950 bg-transparent text-transparent accent-transparent"
                    checked={item?.isComplete}
                    onChange={(e) =>
                      handleClickCompleted(item.id, e.target.checked)
                    }
                  />
                  <h1 className={`${!item.isComplete ? "" : "line-through"}`}>
                    {item.title}
                  </h1>
                </div>

                <div className="flex gap-2">
                  <button>edit</button>
                  <button>delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default TodoList;

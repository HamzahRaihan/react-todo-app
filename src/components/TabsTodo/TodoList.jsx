import { useState, useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodoCompleted, getTodo } from "../../redux/slices/TodoSlice";
import { filterTodos } from "../../utils/Utils";
import { formatDate } from "../../utils/Context";
import Edit from "./Edit";

function TodoList() {
  const todoSelector = useSelector((state) => state.todos);
  const { todos, isLoading } = todoSelector;
  const [modal, setModal] = useState(false);
  const [todoEditInput, setTodoEditInput] = useState("");
  const [tab, setTab] = useState("all");
  const dispatch = useDispatch();

  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleClickCompleted = (id, title, isChecked) => {
    dispatch(addTodoCompleted(id, title, isChecked));
  };

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

  const handleEditModal = (input) => {
    setModal(true);
    setTodoEditInput(input);
  };

  return (
    <>
      <div className="flex gap-2 text-[#fafafa]">
        {buttons.map((btn) => (
          <button
            className={`rounded-lg border-[1px] border-gray-800 px-2 py-1 transition-all hover:bg-gray-800 active:bg-gray-900 ${
              tab === btn.value &&
              "bg-[#fafafa] text-black hover:bg-gray-100 active:bg-gray-200"
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
                      handleClickCompleted(
                        item.id,
                        item.title,
                        e.target.checked,
                      )
                    }
                  />
                  <div className="flex flex-col">
                    <h1 className={`${!item.isComplete ? "" : "line-through"}`}>
                      {item.title}
                    </h1>
                    <p className="text-xs text-gray-400">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleEditModal(item.title)}>
                    edit
                  </button>
                  <button>delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modal && (
        <Edit modal={modal} setModal={setModal} todoEditInput={todoEditInput} />
      )}
    </>
  );
}

export default TodoList;

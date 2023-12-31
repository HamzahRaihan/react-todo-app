import { useState, useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteTodoList,
  editTodoList,
  getTodo,
} from "../../redux/slices/TodoSlice";

import { filterTodos } from "../../utils/Utils";
import { formatDate } from "../../utils/Context";
import Edit from "./Edit";
import Buttons from "../Buttons";
import Loading from "../Loading";
import { IconsDelete, IconsEdit } from "../Icons";

function TodoList() {
  // all states
  const [modal, setModal] = useState(false);
  const [todoEditInput, setTodoEditInput] = useState("");
  const [todoID, setTodoID] = useState(0);
  const [todoComplete, setTodoComplete] = useState(false);
  const [tab, setTab] = useState("all");

  // redux
  const todoSelector = useSelector((state) => state.todos);
  const { todos, isLoading } = todoSelector;
  const dispatch = useDispatch();

  // filter todos by tab
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleEditTodoList = (id, title, isChecked) => {
    dispatch(editTodoList(id, title, isChecked));
  };

  // buttons all todos, active todos, and completed todos
  const buttons = [
    { name: "All", value: "all" },
    { name: "Active", value: "active" },
    { name: "Completed", value: "completed" },
  ];

  // handle clicks
  const handleEditModal = (id, input, isChecked) => {
    setModal(true);
    setTodoID(id);
    setTodoEditInput(input);
    setTodoComplete(isChecked);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoList(id));
  };

  return (
    <>
      {/* buttons categories */}
      <div className="flex gap-2 text-[#fafafa]">
        {buttons.map((btn) => (
          <Buttons
            name={btn.name}
            value={btn.value}
            tab={tab}
            setTab={setTab}
            key={btn.value}
          />
        ))}
      </div>

      {/* show todo content */}
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-2">
            {Object.values(visibleTodos)
              .sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
              })
              .map((item) => (
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
                        handleEditTodoList(
                          item.id,
                          item.title,
                          e.target.checked,
                        )
                      }
                    />
                    <div className="flex flex-col">
                      <h1
                        className={`${!item.isComplete ? "" : "line-through"}`}
                      >
                        {item.title}
                      </h1>
                      <p className="text-xs text-gray-400">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEditModal(item.id, item.title, item.isComplete)
                      }
                    >
                      <IconsEdit />
                    </button>
                    <button onClick={() => handleDeleteTodo(item.id)}>
                      <IconsDelete />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <Edit
          modal={modal}
          setModal={setModal}
          todoEditInput={todoEditInput}
          todoID={todoID}
          setTodoComplete={todoComplete}
          handleEditTodoList={handleEditTodoList}
        />
      )}
    </>
  );
}

export default TodoList;

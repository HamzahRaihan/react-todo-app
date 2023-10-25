import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoCompleted, getTodo } from "../../redux/slices/TodoSlice";

const Completed = () => {
  const todoSelector = useSelector((state) => state.todos);
  const { todos, isLoading } = todoSelector;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleClickCompleted = (id, isChecked) => {
    dispatch(addTodoCompleted(id, isChecked));
    console.log("🚀 ~ file: All.jsx:17 ~ handleClickCompleted ~ id:", id);
  };

  return (
    <>
      {isLoading ? (
        <div className="text-white">Loading</div>
      ) : (
        <div className="flex flex-col gap-2">
          {todos
            .filter((item) => item.isComplete)
            .map((item) => (
              <div
                className="flex justify-between rounded-lg border-[1px] border-gray-800 bg-transparent px-2 py-1 text-[#fafafa]"
                key={item.id}
              >
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-4 rounded-lg border-[1px] border-gray-800 bg-gray-950 bg-transparent text-transparent accent-transparent"
                    checked={item.isComplete}
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
    </>
  );
};

export default Completed;

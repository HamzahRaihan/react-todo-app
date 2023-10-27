import { useState } from "react";
import TodoList from "../components/TabsTodo/TodoList";
import { addTodoList } from "../redux/slices/TodoSlice";
import { useDispatch } from "react-redux";

/* eslint-disable react/no-unescaped-entities */
function Home() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  // handleAddTodo purpose is for user can add new data
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (input.trim() == "") {
      console.error("input something");
    }
    const newTodo = {
      title: input,
      isComplete: false,
      createdAt: Date.now(),
    };

    setInput("");
    dispatch(addTodoList(newTodo));
  };

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center bg-black p-4 font-inter">
        <div className="flex w-full max-w-3xl flex-col gap-4 border-black">
          <h1 className="text-2xl font-bold text-[#fafafa]">What's the plan</h1>
          <div className="flex  gap-3">
            <form onSubmit={handleAddTodo} className="flex w-full gap-3">
              <input
                className="w-full rounded-lg border-[1px] border-gray-800 bg-transparent p-2 text-[#fafafa] ring-white focus:ring-2 "
                type="text"
                placeholder="What todo"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <button className="rounded-lg bg-[#fafafa] px-4 transition-all hover:opacity-90 active:opacity-75">
                Add
              </button>
            </form>
          </div>
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default Home;

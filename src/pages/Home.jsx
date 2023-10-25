import TodoList from "../components/TabsTodo/TodoList";

/* eslint-disable react/no-unescaped-entities */
function Home() {
  return (
    <>
      <div className="font-inter flex h-full w-full flex-col items-center justify-center bg-black p-4">
        <div className="flex w-full max-w-3xl flex-col gap-4 border-black">
          <h1 className="text-2xl font-bold text-[#fafafa]">What's the plan</h1>
          <div className="flex gap-3">
            <input
              className="place w-full rounded-lg border-[1px] border-gray-800 bg-transparent p-2 text-[#fafafa] ring-white focus:ring-2 "
              type="text"
              placeholder="What todo"
            />
            <button className="rounded-lg bg-[#fafafa] px-4 transition-all hover:opacity-90 active:opacity-75">
              Add
            </button>
          </div>
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default Home;

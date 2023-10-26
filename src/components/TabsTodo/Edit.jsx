import PropTypes from "prop-types";

function Edit(props) {
  console.log("🚀 ~ file: Edit.jsx:2 ~ Edit ~ modal:", props);

  return (
    <>
      <div className="fixed left-0 top-0 flex h-screen w-screen justify-center gap-2 backdrop-blur ">
        <button
          className="fixed right-[300px] top-10 h-10 w-12 rounded-lg bg-[#fafafa] px-2 transition-all hover:opacity-90 active:opacity-75"
          onClick={() => props.setModal(false)}
        >
          X
        </button>
        <div className="flex w-[800px] items-center justify-center gap-4 ">
          <input
            className="w-full rounded-lg border-[1px] border-gray-800 bg-transparent p-2 text-[#fafafa] ring-white focus:ring-2 "
            type="text"
            placeholder="What todo"
            value={props.todoEditInput}
          />
          <button className="rounded-lg bg-[#fafafa] px-4 py-2 transition-all hover:opacity-90 active:opacity-75">
            Edit
          </button>
        </div>
      </div>
    </>
  );
}

Edit.propTypes = {
  modal: PropTypes.boolean,
  setModal: PropTypes.function,
  todoEditInput: PropTypes.string,
};

export default Edit;

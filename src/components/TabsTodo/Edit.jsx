import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodoList } from "../../redux/slices/TodoSlice";
import { IconsBackspace, IconsEdit } from "../Icons";
function Edit(props) {
  const dispatch = useDispatch();

  const handleEditTodoList = (id, title, isChecked) => {
    dispatch(editTodoList(id, title, isChecked));
  };
  const [inputEdit, setInputEdit] = useState(props.todoEditInput);

  return (
    <>
      <div className="fixed left-0 top-0 flex h-screen w-screen  justify-center gap-2 backdrop-blur">
        <div className="relative flex w-[800px] max-w-5xl items-center justify-center gap-4 p-10">
          <button
            className="absolute right-10 top-10 flex h-10 w-12 items-center justify-center rounded-lg bg-[#fafafa] px-2 transition-all hover:opacity-90 active:opacity-75"
            onClick={() => props.setModal(false)}
          >
            <IconsBackspace />
          </button>
          <input
            className="w-full rounded-lg border-[1px] border-gray-800 bg-transparent p-2 text-[#fafafa] ring-white focus:ring-2 "
            type="text"
            placeholder="What todo"
            value={inputEdit}
            onChange={(e) => setInputEdit(e.target.value)}
          />
          <button
            className="rounded-lg bg-[#fafafa] px-4 py-2 transition-all hover:opacity-90 active:opacity-75"
            onClick={() => {
              handleEditTodoList(props.todoID, inputEdit, props.todoComplete);
              props.setModal(false);
            }}
          >
            <IconsEdit />
          </button>
        </div>
      </div>
    </>
  );
}

Edit.propTypes = {
  modal: PropTypes.bool,
  setModal: PropTypes.func,
  todoEditInput: PropTypes.string,
  handleEditTodoList: PropTypes.func,
  todoID: PropTypes.string,
  todoComplete: PropTypes.bool,
};

export default Edit;

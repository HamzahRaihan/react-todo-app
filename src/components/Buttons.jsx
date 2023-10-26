import PropTypes from "prop-types";

function Buttons(props) {
  return (
    <>
      <button
        className={`rounded-lg border-[1px] border-gray-800 px-2 py-1 transition-all hover:bg-gray-800 active:bg-gray-900 ${
          props.tab === props.value &&
          "bg-[#fafafa] text-black hover:!bg-gray-200 active:!bg-gray-300"
        }`}
        onClick={() => props.setTab(props.value)}
        key={props.value}
      >
        {props.name}
      </button>
    </>
  );
}

Buttons.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  tab: PropTypes.string,
  setTab: PropTypes.func,
};

export default Buttons;

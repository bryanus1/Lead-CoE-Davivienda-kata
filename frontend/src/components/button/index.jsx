import PropTypes from "prop-types";

export default function Button({ title, handler }) {
  return (
    <button
      className="text-white bg-red-600 rounded-lg px-10 py-2"
      onClick={handler}
    >
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

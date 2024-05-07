import PropTypes from "prop-types";

export default function TextField({ placeholder, type, changeHandler }) {
  return (
    <input
      type={type ?? "text"}
      className="border border-gray-300 px-4 py-2 rounded-lg w-96 focus:outline-none focus:ring-1 focus:ring-black"
      placeholder={placeholder}
      onChange={(e) => changeHandler(e.target.value)}
    ></input>
  );
}

TextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  changeHandler: PropTypes.func,
};

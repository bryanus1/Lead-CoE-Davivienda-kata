import PropTypes from "prop-types";

export default function TextAreaField({ placeholder }) {
  return (
    <textarea
      className="border border-gray-300 px-4 py-2 rounded-lg w-96 focus:outline-none focus:ring-1 focus:ring-black"
      placeholder={placeholder}
    ></textarea>
  );
}

TextAreaField.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

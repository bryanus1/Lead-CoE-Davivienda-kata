import PropTypes from "prop-types";

export default function Header({ title }) {
  return (
    <div className="flex justify-center items-center text-white bg-red-600 w-96 h-32 m-10">
      <h1>{title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

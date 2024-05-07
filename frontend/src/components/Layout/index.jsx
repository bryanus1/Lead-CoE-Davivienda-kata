import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col gap-5 items-center mt-20">{children}</div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

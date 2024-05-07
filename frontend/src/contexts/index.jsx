import PropTypes from "prop-types";
import { createContext, useState, useMemo } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const value = useMemo(
    () => ({
      userId,
      setUserId,
    }),
    [userId, setUserId]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

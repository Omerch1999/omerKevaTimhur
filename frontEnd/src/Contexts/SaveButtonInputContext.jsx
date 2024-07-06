import { createContext } from "react";

const SaveButtonContext = createContext();

const SaveButtonProvider = ({ children }) => {
  const logForCheck = (e) => {
    console.log(e);
  };

  return (
    <SaveButtonContext.Provider value={{ logForCheck }}>
      {children}
    </SaveButtonContext.Provider>
  );
};

export { SaveButtonContext, SaveButtonProvider };

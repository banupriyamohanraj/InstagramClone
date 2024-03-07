import React, { useState } from "react";

let ModalContext = React.createContext();

export default ModalContext;

export const ModalProvider = ({ children }) => {
  let [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

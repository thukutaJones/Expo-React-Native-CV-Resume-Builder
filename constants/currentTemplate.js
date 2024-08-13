import { createContext, useState } from "react";

export const CurrentTemplate = createContext();

export default CurrentTemplateProvider = ({ children }) => {
  const [currentTemplate, setCurrentTemplate] = useState("template_1");
  const [cvIndex, setCvIndex] = useState(0);

  return (
    <CurrentTemplate.Provider
      value={{
        currentTemplate,
        setCurrentTemplate,
        cvIndex,
        setCvIndex,
      }}
    >
      {children}
    </CurrentTemplate.Provider>
  );
};

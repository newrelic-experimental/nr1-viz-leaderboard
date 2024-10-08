import React, { createContext, useContext } from "react";

const VizPropsContext = createContext(null);

export const VizPropsProvider = ({ children, ...props }) => {
  return (
    <VizPropsContext.Provider value={props}>
      {children}
    </VizPropsContext.Provider>
  );
};

export const useProps = () => {
  const context = useContext(VizPropsContext);
  if (context === undefined) {
    throw new Error("useProps must be used within a PropsProvider");
  }
  return context;
};

export default VizPropsContext;

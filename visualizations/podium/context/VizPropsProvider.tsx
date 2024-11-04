/* 
This context provided makes the visualiazation props provided by the user available to all components in the visualization easily.
*/

import React, { createContext, useContext } from "react";

// Create the context for the props with a default value of null
const VizPropsContext = createContext(null);

// Create a provider component that accepts props and children
export const VizPropsProvider = ({ children, ...props }) => {
  return (
    <VizPropsContext.Provider value={props}>
      {children}
    </VizPropsContext.Provider>
  );
};

// Create a custom hook to use the context
export const useProps = () => {
  const context = useContext(VizPropsContext);
  if (context === undefined) {
    throw new Error("useProps must be used within a PropsProvider");
  }
  return context;
};

// You can also export the PropsContext if you need direct access to the context itself
export default VizPropsContext;
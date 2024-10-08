import React from "react";
import { PlatformStateContext, NerdletStateContext } from "nr1";
import { VizPropsProvider } from "./context/VizPropsProvider";
import { App } from "./App";

const Visualisation = (props) => {
  return (
    <div style={{ height: "100%" }}>
      <PlatformStateContext.Consumer>
        {(platformContextState) => (
          <NerdletStateContext.Consumer>
            {(nerdletContextState) => (
              <VizPropsProvider {...props}>
                <App {...props} />
              </VizPropsProvider>
            )}
          </NerdletStateContext.Consumer>
        )}
      </PlatformStateContext.Consumer>
    </div>
  );
};

export default Visualisation;

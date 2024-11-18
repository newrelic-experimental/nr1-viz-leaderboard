import React from "react";
import { useProps } from "../../../shared/context/VizPropsProvider/VizPropsProvider"; 
import { useNerdGraphQuery } from "../../../shared/hooks/useNerdGraphQuery/useNerdGraphQuery";
import ThermometerGauge from './ThermometerGauge'

type AttributesListProps = {
  width: any;
  height: any;
};

const Thermometer = ({ width, height }: AttributesListProps) => {
  const vizProps = useProps();
  const {
    accountId,
    query,
    colorGradient,
    steps,
    stepFormat,
    valueFormat,
    sizeStyle,
    decimalPlaces,
    targetFormat,
    decorationColor,
    refreshInterval,
    ignorePicker,
    defaultSince,
  } = vizProps;
  const { data } = useNerdGraphQuery(
    accountId,
    query,
    ignorePicker,
    refreshInterval,
    defaultSince,
  );

  if(data && data.length > 0) {
    const currentData= data[0];
    return (
        <>
          <ThermometerGauge
                theme="light"
                value={currentData.value > currentData.target ? currentData.target : currentData.value}
                decimalPlaces={decimalPlaces}
                max={currentData.target}
                targetFormat={targetFormat}
                min={currentData.startValue}                
                gradient={colorGradient}
                steps={steps}
                stepFormat={stepFormat}
                valueFormat={valueFormat}
                size={sizeStyle}
                height={height-40}
                decorationColor={decorationColor}
              />
        </>

    );
  } else {
    return null
  }

 
};

export default Thermometer;

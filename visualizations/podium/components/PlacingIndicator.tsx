import React from "react";

type AttributesListProps = {
   placing: number;
   placingColor: any;
  };

const createSuffix = (placing: number) => {
    if (placing === 1) {
        return "st";
    } else if (placing === 2) {
        return "nd";
    } else if (placing === 3) {
        return "rd";
    } else {
        return "th";
    }
}
const PlacingIndicator = ({ placing, placingColor }: AttributesListProps) => {
  return (
    <div > 
        <div className="placingIndicator" style={{backgroundColor:placingColor, boxShadow: `0 0 0 6px ${placingColor}99`}}>
            <span className="placingNumber">{placing}</span>
            <span className="placingSuffix"><sup>{createSuffix(placing)}</sup></span>
        </div>
    </div>

  );
};

export default PlacingIndicator;
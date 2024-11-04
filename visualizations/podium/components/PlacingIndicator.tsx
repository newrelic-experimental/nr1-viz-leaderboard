import React from "react";
import { Position } from "../../leaderboard/components/Position";
import { useProps } from "../context/VizPropsProvider";

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

const vizProps = useProps();
const { hideRosette } = vizProps;

let placingIcon;
if (hideRosette!== true && placing > 0 && placing < 4 ) {
    placingIcon = <div className="placingIndicatorRosette">
                    <Position  position={placing} />
                </div>;
} else {
    placingIcon = <div className="placingIndicator" style={{backgroundColor:"#fff", boxShadow: `0 0 10px 5px ${placingColor}99`}}>
                    <span className="placingNumber">{placing}</span>
                    <span className="placingSuffix"><sup>{createSuffix(placing)}</sup></span>
                </div>;
}

  return (
    <div style={{paddingTop:"1em"}}> 
        {placingIcon}
    </div>

  );
};

export default PlacingIndicator;
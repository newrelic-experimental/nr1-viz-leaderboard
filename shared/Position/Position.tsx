import React from "react";

import goldMedalIcon from "../../assets/gold-medal.svg";
import silverMedalIcon from "../../assets/silver-medal.svg";
import bronzeMedalIcon from "../../assets/bronze-medal.svg";

export const Position: React.FC<{ position?: number }> = ({ position }) => {
  switch (position) {
    case 1:
      return (
        <img src={goldMedalIcon} alt="Gold Medal" className="medal-icon gold" />
      );
    case 2:
      return (
        <img
          src={silverMedalIcon}
          alt="Silver Medal"
          className="medal-icon silver"
        />
      );
    case 3:
      return (
        <img
          src={bronzeMedalIcon}
          alt="Bronze Medal"
          className="medal-icon bronze"
        />
      );
    default:
      return <span>{position}</span>;
  }
};

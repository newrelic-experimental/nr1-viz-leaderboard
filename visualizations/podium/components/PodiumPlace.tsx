import React from "react";
import { StackItem } from "nr1";
import PlacingIndicator from "./PlacingIndicator";
import { ImageWithFallback } from "../../../shared/ImageWithFallBack";

type AttributesListProps = {
  placing: any;
  caption: any;
  subCaption: any;
  link: any;
  circles: any;
  value: any;
  placingOffset: any;
  placingColor: any;
  decorationColor: any;
  captionColor: any;
  subCaptionColor: any;
  valueColor: any;
  imageUrl: any;
};

const PodiumPlace = ({
  placing,
  value,
  caption,
  subCaption,
  placingOffset,
  link,
  placingColor,
  decorationColor,
  captionColor,
  subCaptionColor,
  valueColor,
  imageUrl,
  circles,
}: AttributesListProps) => {
  const placingOffsetWidth = 0.8;

  let imageThumbnail, imageThumbnailCircle;
  if (imageUrl && imageUrl != "") {
    imageThumbnail = (
      <div className="imageThumb">
        <ImageWithFallback src={imageUrl} alt={name} />
      </div>
    );
    imageThumbnailCircle = (
      <div className="imageThumb">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="circle"
          style={{ borderColor: decorationColor }}
        />
      </div>
    );
  }

  const captionHexColor =
    captionColor && captionColor != "" ? captionColor : "#000000";
  const subCaptionHexColor =
    subCaptionColor && subCaptionColor != "" ? subCaptionColor : "#333333";
  const valueHexColor = valueColor && valueColor != "" ? valueColor : "#000000";

  let subCaptionBlock =
    subCaption && subCaption != "" ? (
      <div className="podiumSubName" style={{ color: subCaptionHexColor }}>
        {subCaption}
      </div>
    ) : null;
  let podiumPlace;

  const handleClick = () => {
    if (link && link !== "") {
      window.open(link, "_blank");
    }
  };

  if (circles === true) {
    //this doesnt work as a stack item for some reason, the width constrainst go awry.
    podiumPlace = (
      <div
        className={`podiumPlaceContainer ${
          link && link !== "" ? "cursorPointer" : ""
        }`}
        onClick={handleClick}
      >
        <PlacingIndicator placing={placing} placingColor={placingColor} />
        {imageThumbnailCircle}
        <div className="podiumContainer">
          <div className="podiumValue" style={{ color: valueHexColor }}>
            <span>{value}</span>
          </div>
          <div className="podiumName" style={{ color: captionHexColor }}>
            {caption}
          </div>
          {subCaptionBlock}
        </div>
      </div>
    );
  } else {
    podiumPlace = (
      <StackItem
        fullWidth
        fullHeight
        className={`podiumPlaceContainer ${
          link && link !== "" ? "cursorPointer" : ""
        }`}
        onClick={handleClick}
      >
        <div style={{ height: placingOffset * placingOffsetWidth + "em" }}>
          {" "}
        </div>
        <PlacingIndicator placing={placing} placingColor={placingColor} />
        {imageThumbnail}
        <div
          className="podiumBlock"
          style={{
            height: (3 - placingOffset) * placingOffsetWidth + "em",
            backgroundColor: decorationColor,
          }}
        >
          {" "}
        </div>
        <div
          className="podiumContainer"
          style={{ backgroundColor: decorationColor }}
        >
          <div className="podiumValue" style={{ color: valueHexColor }}>
            <span>{value}</span>
          </div>
          <div
            className="podiumName podiumNameBlock"
            style={{ color: captionHexColor }}
          >
            {caption}
          </div>
          {subCaptionBlock}
        </div>
      </StackItem>
    );
  }
  return <>{podiumPlace}</>;
};

export default PodiumPlace;

import React from "react";
import { StackItem } from 'nr1'
import PlacingIndicator from './PlacingIndicator';

type AttributesListProps = {
    placing: any;
    caption: any;
    circles: any;
    value: any;
    placingOffset: any;
    placingColor: any;
    decorationColor: any;
    captionColor: any;
    valueColor: any;
    imageUrl: any;
};

const PodiumPlace =  ({ placing, caption, value, placingOffset, placingColor, decorationColor, captionColor, valueColor, imageUrl, circles }: AttributesListProps) => {
  const placingOffsetWidth=0.8;

  let imageThumbnail, imageThumbnailCircle;
  if(imageUrl && imageUrl!="")  {
    imageThumbnail=<div className="imageThumb"><img src={imageUrl} alt="name"/></div>
    imageThumbnailCircle=<div className="imageThumb"><img className="circle" style={{borderColor: decorationColor}} src={imageUrl} alt="name"/></div>
  }

  const captionHexColor= captionColor && captionColor!="" ? captionColor : "#000000";
  const valueHexColor= valueColor && valueColor!="" ? valueColor : "#000000";

  let podiumPlace;
  if(circles===true) {
    podiumPlace=<div fullWidth fullHeight className="podiumPlaceContainer"  >
                 <PlacingIndicator placing={placing} placingColor={placingColor}/>
                  {imageThumbnailCircle}
                  <div className="podiumContainer">
                      <div className="podiumValue" style={{color: valueHexColor}}><span>{value}</span></div>
                      <div className="podiumName" style={{color: captionHexColor}}>{caption}</div>
                  </div>
              </div>;
  } else {
    podiumPlace= <StackItem fullWidth fullHeight className="podiumPlaceContainer"  >
                  <div style={{height: placingOffset*placingOffsetWidth +"em"}}> </div>
                  <PlacingIndicator placing={placing} placingColor={placingColor}/>
                  {imageThumbnail}
                  <div className="podiumBlock" style={{height: (3-placingOffset)*placingOffsetWidth +"em", backgroundColor:decorationColor}}> </div>
                  <div className="podiumContainer" style={{backgroundColor:decorationColor}}>
                      <div className="podiumValue" style={{color: valueHexColor}}><span>{value}</span></div>
                      <div className="podiumName podiumNameBlock" style={{color: captionHexColor}}>{caption}</div>
                  </div>

              </StackItem>;   
  }

  return (
      <>
       {podiumPlace}
      </>
  );
};

export default PodiumPlace;
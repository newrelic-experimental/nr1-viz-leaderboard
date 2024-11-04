import React from "react";
import { useProps } from "../context/VizPropsProvider";
import { useNerdGraphQuery } from "../hooks/useNerdGraphQuery";
import PodiumPlace from "./PodiumPlace";
import { Stack } from 'nr1';


type AttributesListProps = {
  width: any;
  height: any;
};


const Podium =  ({ width, height }: AttributesListProps) => {
  const vizProps = useProps();
  const { accountId, query, podiumOrder, podiumColors, circular,decorationColor, captionColor, subCaptionColor, valueColor, refreshInterval, ignorePicker, defaultSince  } = vizProps;
  const { data } = useNerdGraphQuery(accountId, query, ignorePicker, refreshInterval, defaultSince);
 

  const PodiumDisplay: JSX.Element[] = [];

  if(data && data.length > 0) {
    const podiumData = data.map((item,index) => {

      //set the placing order
      item.placing = index+1;
      if(podiumOrder===true) {
        item.placingOffset= index < 3 ? index : 3;
      } else {
        item.placingOffset = 3;
      }

      //set the placing colors gold, silver and bronze
      item.placingColor = "#e2e2e2";
      if(podiumColors === true) {
        if(index==0) {item.placingColor = "#FFD700";} //#ddd795
        if(index==1) {item.placingColor = "#d8d8d8";} //#c5c4bb
        if(index==2) {item.placingColor = "#cd7f32";} //#c09e7d
      }
      return item;
    });

    if(podiumOrder === true) {
      const firstPlace = podiumData[0];
      podiumData[0]=data[1];
      podiumData[1]=firstPlace;
    } 
    podiumData.forEach((item, index) => {
      PodiumDisplay.push(<PodiumPlace 
        placing={item.placing} 
        caption={item.caption} 
        subCaption={item.subCaption}
        link={item.link}
        value={item.valueDisplay ? item.valueDisplay : item.value} 
        placingOffset={item.placingOffset} 
        placingColor={item.placingColor} 
        decorationColor={decorationColor && decorationColor!="" ? decorationColor : item.placingColor}
        captionColor={captionColor && captionColor!="" ? captionColor : null}
        subCaptionColor={subCaptionColor && subCaptionColor!="" ? subCaptionColor : null}
        valueColor={valueColor && valueColor!="" ? valueColor : null}
        imageUrl={item.imageUrl} 
        circles={circular}/>);
    });
  }

  return (
        <>
        {/* <div>Account ID{accountId}, Results: {data? data.length : "Loading..."}</div> */}
        <Stack gapType={Stack.GAP_TYPE.MEDIUM}  horizontalType={Stack.HORIZONTAL_TYPE.FILL_EVENLY}>{PodiumDisplay}</Stack>
        </>
  );
};

export default Podium;
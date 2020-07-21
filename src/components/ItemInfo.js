import React  from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap'
import '../css/ItemInfo.css'


export default function ItemInfo(props) {

  const getContent = () => {

    let isMoreInfo = false;
 
    let tips = [];
    if (props.item.tips !== undefined) {
      for (let i = 0; i < props.item.tips.length; ++i) {
        tips[i] = <li key={i} dir={props.align === 'right' ? "RTL" : "LTR"}>{props.item.tips[i]}.</li>
      }
      isMoreInfo = true;
    }

    let buyingOptions = [];
    if (props.item.buying_options !== undefined) {
      for (let i = 0; i < props.item.buying_options.length; ++i) {
        buyingOptions[i] = <li key={i} dir={props.align === 'right' ? "RTL" : "LTR"}><a target="_blank" rel="noopener noreferrer" href={props.item.buying_options[i]}>{props.item.buying_options[i]}</a></li>
      }
      isMoreInfo = true;
    }
//padding-inline-start: 40px;
    return (
      <div>
        {tips.length > 0  ?
            <div>
              <h3>{props.align === 'right' ? ":טיפים" : "Tips:"}</h3>
              <ul id="ol" style={{paddingInlineStart: props.align === 'right' ? '40px' : false}}>
                {tips} 
              </ul>
            </div> : ""}
        {buyingOptions.length > 0  ?
            <div>
              <h3>{props.align === 'right' ? ":היכן מומלץ לקנות" : "Buying recommendation:"}</h3>
              <ul>
                {buyingOptions} 
              </ul>
            </div> : ""}
        {isMoreInfo ? false : (props.align === 'right' ? ".אין מידע נוסף" : "No further information.") }
      </div>
    )
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title style={{textAlign: props.align}} as="h2">{props.item.name}</Popover.Title>
      <Popover.Content style={{textAlign: props.align}}>
        {getContent()}
      </Popover.Content>
    </Popover>
  );

  return (
    <th style={{textAlign: props.align, width: '10vw'}}>
      <OverlayTrigger trigger={'click'} rootClose  placement={props.align === 'left' ? 'right' : 'left'} overlay={popover} >
        <button style={{textAlign: props.align, cursor: 'pointer'}} id="infoButton" variant="success">{props.item.name}</button>
      </OverlayTrigger>
    </th>
  )
}

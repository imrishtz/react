import React, {useState, useEffect}  from 'react';
import Table from 'react-bootstrap/Table'
import ItemInfo from './ItemInfo'
import viImage from "./images/vi.jpg";
import xImage from "./images/x.jpg";


const items = [];

export default function SimpleTable(props) {
  const [ fetched, setFetched ] = useState(0);
  const [ data, setData ] = useState();
  const [ equipement, setEquipement ] = useState();
  const [ events, setEvents ] = useState();
  const [ soloColumn, setSoloColumn ] = useState('none');

  useEffect( () =>  {
    fetch("./data.json")
      .then(response => response.json())
      .then(result => {
          setData(result)
          setFetched((prevFetch) => prevFetch + 1)
      });
    fetch("./equipement.json")
    .then(response => response.json())
    .then(result => {
        setEquipement(result)
        setFetched((prevFetch) => prevFetch + 2)
    });
    fetch("./events.json")
    .then(response => response.json())
    .then(result => {
        setEvents(result)
        setFetched((prevFetch) => prevFetch + 4)
    });
  }, []);

  const handleColumnHeadLinePressed = (key) => {
    //const d = event.elem;
    setSoloColumn((prevSoloColumn) => {
      if (prevSoloColumn === key) {
        return 'none';
      } else {
        return key;
      }
    });
  }

  const createColumnHeadlines = () => {
    let events_data = data.events_data;
    let ret = props.lang === 'heb' ? [] : [<th key={0} style={{cursor: 'auto'}} align="left"> </th>];
    for (let i = 0; i < events_data.length; ++i) {
      if (soloColumn !== 'none' && events_data[i].event_category !== soloColumn) {
        continue;
      }
      let columnIndex = i + 1;
      let colEventType = events.events_name.filter(obj => { return obj.id === events_data[i].event_category});
      let colLabel = colEventType[0][props.lang + '_name'];
      ret[columnIndex] = <th onClick={() => handleColumnHeadLinePressed(events_data[i].event_category)} key={events_data[i].event_category} align="center">{colLabel}</th>;
    }

    return ret ;
  }

  const createRows = () => {
    for (let i = 0; i < equipement.equipement_name.length; ++i) {
      let item = {"name":"","tips":[], "buying_options":[], "items":[]};
      item.name = equipement.equipement_name[i][props.lang + '_name'];
      item.tips = equipement.equipement_name[i][props.lang + '_tips'];
      item.buying_options = equipement.equipement_name[i]["buying_options"];
      // runing on each event and check if exists
      for (let j = 0; j < data.events_data.length; ++j) {
        if (soloColumn !== 'none' && data.events_data[j].event_category !== soloColumn) {
          continue;
        }
        const currEquipement = data.events_data[j].equipement;
        if (currEquipement.includes(equipement.equipement_name[i].id)) {
          item.items[soloColumn !== 'none' ? 0 : j] = "true";
        } else {
          item.items[soloColumn !== 'none' ? 0 : j] = "false";
        }
      }
      items[i] = item;
    }
    
    return <tbody>
      {items.map((item) => (
      props.lang === 'eng'?
        <tr key={item.name}>
          <ItemInfo align="left" item={item}/>
            {/* <th align="left">{item.name}</th> */}

          {getRows(item)}
        </tr>
      :
        <tr key={item.name}>
          {getRows(item)}
          <ItemInfo align="right" item={item}/>
        </tr>
    ))}</tbody>
  }

  const getRows = (item) => {
    let ret = [];
    for (let i = 0; i < item.items.length; ++i) {
      ret[i] = <td key={i} align="center"><img 
          className="tableMarks"
          alt={item.items[i] === "true" ?
              "Vi" :
              "X"}
          src={item.items[i] === "true" ?
              viImage :
              xImage}>
      </img></td>;
    }
    return ret;
  }

  return (
    <div id="outerTable">{fetched === 7 ?
      <div>
        <Table bordered>
          <thead className="tableHead">
            <tr>
              {createColumnHeadlines()}
            </tr>
          </thead>
          {createRows()}
        </Table>
        {props.lang === 'eng' ?
            <p>
              *{soloColumn === 'none' ?
                  'Click the column name for removing other columns' :
                  'Click the column name for returning other columns'}
              <br/>
              *Click the row name for more information
            </p>:
            <p style={{textAlign:'right'}}>
              {soloColumn === 'none' ? 
                  'לחץ על שם הטור כדי להסיר את יתר הטורים':
                  'לחץ על שם הטור כדי להחזיר את יתר הטורים'}*
                  <br/>
            לחץ על שם השורה לקבלת מידע נוסף*</p>}
      </div>
    : "Loading..."}</div>
  );
}

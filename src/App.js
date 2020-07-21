import React, { useState } from 'react';
import SimpleTable from './SimpleTable';
import './App.css'

const App = () => {
  const [ lang, setLang ] = useState('heb');
  const handleChange = (event) => {
    if (lang !== event.target.value) {
      setLang(event.target.value);
    }
  }

  return (
    <div className="centered">
      <h1>{lang === 'heb' ? 'רשימת ציוד' : 'Equipement list'}</h1>
      <div id="tableContainer">
        <SimpleTable lang={lang} />
      </div>
      <label className="input">
        <input 
          type="radio" 
          name="lang"
          value="eng"
          checked={lang === "eng"}
          onChange={handleChange}
        /> English
      </label>
      <br />
      <label className="input">
        <input 
          type="radio" 
          name="lang"
          value="heb"
          checked={lang === "heb"}
          onChange={handleChange}
        /> עברית
      </label>
    </div> 
  );
}

export default App;

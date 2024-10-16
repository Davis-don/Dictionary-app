import React, { useState } from 'react';
import './Dictionary.css';
import { FaBook, FaSearch } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import Workcard from './Workcard';

function Dictionaryhomepage() {
  const [componentSerch,setComponentSerch]=useState(<Workcard SearchTerm=''/>)
  const [term, setTerm] = useState({
    value: ''
  });

  const handleInput = (e) => {
    setTerm({
      ...term, [e.target.name]: e.target.value
    });
    console.log(term);
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent form from refreshing the page
    setComponentSerch(<Workcard SearchTerm={term}/>)
    console.log("Form submitted with term:", term);
  };

  return (
    <div className='overrall-dictionary-container'>
      <header>
        <div className="top-header">
          <div className="left-top-header">
            <FaBook className='book-icon' />
            <h2 className='dictionary-title'>Dictionary</h2>
          </div>
          <div className="right-top-header">
            <form onSubmit={handleSubmit}>
              <input
                onChange={handleInput}
                name='value'
                className='form-control fs-1'
                type='text'
                placeholder='Search'
              />
              <button type='submit' className='btn '>
                <FaSearch className='fs-1' />
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="content-section">
      {componentSerch}
      </div>
      <footer>
      </footer>
    </div>
  );
}

export default Dictionaryhomepage;


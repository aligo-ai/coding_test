import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import Page1 from './Page1';
import Page2 from './Page2';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const cursorPosition = inputRef.current.value.length;
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [inputValue]);

  // handler
  function pageChange(page) {
    setCurrentPage(page);
    setInputValue('');
    setResult('');
  }

  return (
    <div className="App">
      {currentPage === 1 ? (
        <Page1 pageChange={pageChange} />
      ) : (
        <Page2 pageChange={pageChange} />
      )}
    </div>
  );
}

export default App;
